var lifx = require('lifx');

/**
 * class NestorLIFX
 *
 * @param {String} opts: optional
 * - map: status-hexcolour map, defaults to { OK: '00FF00', FAIL: 'FF0000', WARN: 'FFFF00' }
 */
function NestorLIFX(opts) {
  this.opts = opts;

  const MAP = {
    ok  : 0x53f0,
    fail: 0xffff,
    warn: 0x2f20
  };
  this.opts.map = this.opts.map || MAP;

  this.lifx = lifx.init();
}

/**
 * Notify build status as a colour on Ninja Blocks device LED.
 *
 * @param {String} status: build status
 */
NestorLIFX.prototype.notify = function (status) {
  const UNKNOWN      = 0xaaaa;
  const SATURATION   = 0xffff;
  const LUMINANCE    = 0x1000;
  const WHITE_COLOUR = 0;
  const FADE_TIME    = 0;

  var hue = this.opts.map[status] !== undefined ? this.opts.map[status] : UNKNOWN;

  console.log('Setting LIFX bulb hue to %s for status %s', hue, status);
  
  this.lifx.lightsOn();
  this.lifx.lightsColour(hue, SATURATION, LUMINANCE, WHITE_COLOUR, FADE_TIME);
};

module.exports = NestorLIFX;
