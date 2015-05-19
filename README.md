<img align="right" src="https://raw.github.com/cliffano/nestor-lifx/master/avatar.jpg" alt="Avatar"/>

[![Build Status](https://img.shields.io/travis/cliffano/nestor-lifx.svg)](http://travis-ci.org/cliffano/nestor-lifx)
[![Dependencies Status](https://img.shields.io/david/cliffano/nestor-lifx.svg)](http://david-dm.org/cliffano/nestor-lifx)
[![Coverage Status](https://img.shields.io/coveralls/cliffano/nestor-lifx.svg)](https://coveralls.io/r/cliffano/nestor-lifx?branch=master)
[![Published Version](https://img.shields.io/npm/v/nestor-lifx.svg)](http://www.npmjs.com/package/nestor-lifx)
<br/>
[![npm Badge](https://nodei.co/npm/nestor-lifx.png)](http://npmjs.org/package/nestor-lifx)

Nestor LIFX
-----------

Nestor LIFX is CLI for Jenkins LIFX notifier.

This is handy for monitoring Jenkins build status on a [LIFX](http://www.lifx.com) bulb.

Installation
------------

    npm install -g nestor-lifx

Usage
-----

Monitor build status and notify LIFX bulb:

    nestor-lifx run

Monitor build status of a job:

    nestor-lifx run --job <job>

Monitor build status of a view:

    nestor-lifx run --view <view>

To customise status-hue map:

    nestor-lifx run --map FAIL=0x2f20,OK=0x53f0,WARN=0xffff

Colophon
--------

[Developer's Guide](http://cliffano.github.io/developers_guide.html#nodejs)

Related Projects:

* [nestor](http://github.com/cliffano/nestor) - Jenkins CLI and node.js client
* [nestor-buildlight](http://github.com/cliffano/nestor-buildlight) - CLI for Jenkins build light notifier
* [nestor-ninjablocks](http://github.com/cliffano/nestor-ninjablocks) - CLI for Jenkins Ninja Blocks notifier
