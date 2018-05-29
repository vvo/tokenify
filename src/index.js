#!/usr/bin/env node
/* eslint-disable no-console */
const url = require('url');
const http = require('http');
const fetch = require('node-fetch');
const open = require('open');
const Enquirer = require('enquirer');
const terminalLink = require('terminal-link');
const enquirer = new Enquirer();
const localServerPort = 52071;
const redirectURI = `http://localhost:${localServerPort}/callback`;

enquirer.register('confirm', require('prompt-confirm'));
enquirer.register('password', require('prompt-password'));

const getCode = new Promise(resolve => {
  const server = http.createServer((req, res) => {
    res.setHeader('content-type', 'text/html; charset=utf-8');
    res.write(
      '<h1>🎰 tokenify: SUCCESS!</h1><h2>Close this and go back to terminal.</h2>'
    );
    res.end();
    const {
      query: { code },
    } = url.parse(req.url, true);
    res.once('finish', () => {
      server.close();
    });
    resolve(code);
  });
  server.listen(localServerPort);
});

async function run() {
  console.log(`🎰  tokenify:
---
Welcome! This cli tool will help you get a refresh token from Spotify.
So you can build your Spotify app without having to spend days trying to figure
out how to do it.

The steps are clickable links when feasible, hold ⌘ or CTRL and click them.`);

  console.log();
  console.log(
    `${terminalLink(
      'Create a Spotify account',
      'https://www.spotify.com/signup/'
    )}. If you already have one and want to use it, continue.`
  );

  await enquirer.prompt({ type: 'confirm', name: 'step', message: 'Continue' });
  console.log();

  console.log(
    terminalLink(
      'Login to the developer portal',
      'https://beta.developer.spotify.com/dashboard/'
    )
  );

  await enquirer.prompt({ type: 'confirm', name: 'step', message: 'Continue' });
  console.log();

  console.log(
    terminalLink(
      'From the dashboard, create an app. The app represents what you are trying to build on top of the Spotify API'
    )
  );

  await enquirer.prompt({ type: 'confirm', name: 'step', message: 'Continue' });
  console.log();

  console.log(
    `Edit the settings of your app and add ${redirectURI} to the list of redirect URIs.`
  );

  await enquirer.prompt({ type: 'confirm', name: 'step', message: 'Continue' });
  console.log();

  console.log(
    'Once created and configured, on your app page, you can access your API credentials named `Client ID` and `Client Secret`. tokenify needs them to continue.'
  );
  const { clientId } = await enquirer.prompt({
    name: 'clientId',
    message: 'What is your Client ID?',
  });
  const { clientSecret } = await enquirer.prompt({
    name: 'clientSecret',
    message: 'What is your Client Secret?',
    type: 'password',
  });

  await enquirer.prompt({ type: 'confirm', name: 'step', message: 'Continue' });
  console.log();

  console.log(
    'The next step will open a browser window, just confirm it, close the window and come back here.'
  );

  await enquirer.prompt({ type: 'confirm', name: 'step', message: 'Continue' });

  open(
    `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectURI
    )}&scope=playlist-read-private`
  );

  const code = await getCode;
  const { refresh_token: refreshToken } = await fetch(
    'https://accounts.spotify.com/api/token',
    {
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectURI}&client_id=${clientId}&client_secret=${clientSecret}`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      method: 'POST',
      mode: 'no-cors',
    }
  ).then(res => {
    return res.json();
  });

  console.log();
  console.log(`SUCCESS! You refresh_token is: ${refreshToken}`);
  process.exit(0); // eslint-disable-line no-process-exit
}

run();
