# 🎰 tokenify

> Interactive command line tool to easily get refresh tokens for Spotify API

[![Version][version-svg]][package-url] [![Build Status][travis-svg]][travis-url] [![License][license-image]][license-url] [![Downloads][downloads-image]][downloads-url]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Why?](#why)
- [Installation](#installation)
- [Usage](#usage)
- [Release](#release)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Why?

While building applications with the Spotify API, [the authorization guide](https://beta.developer.spotify.com/documentation/general/guides/authorization-guide/) is a good but very long ressource to grasp. It took me some time to understand that, for my usecase (automating the creation of playlists), I needed to obtain refresh tokens to then be able to ask for tokens on the Spotify API at any time.

Default tokens on the Spotify API have an expiration time, to be able to get new tokens, you need a refresh token.

But to obtain a refresh token, the process is a bit tedious, so if as me you just want to obtain one and then save it somewhere in and environement variable, use `tokenify`!

## Installation

```sh
npm install -g tokenify
# yarn global add tokenify
```

## Usage

```sh
tokenify
```

## Release

```sh
yarn release
```

[travis-svg]: https://img.shields.io/travis/vvo/tokenify/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/vvo/tokenify
[license-image]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/tokenify.svg?style=flat-square
[downloads-url]: http://npm-stat.com/charts.html?package=tokenify
[version-svg]: https://img.shields.io/npm/v/tokenify.svg?style=flat-square
[package-url]: https://yarnpkg.com/en/package/tokenify
