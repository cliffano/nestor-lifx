var buster     = require('buster-node');
var fs         = require('fs');
var lifx       = require('lifx');
var NestorLIFX = require('../lib/nestorlifx');
var referee    = require('referee');
var assert     = referee.assert;

buster.testCase('nestorlifx - nestorlifx', {
  setUp: function () {
    this.mockLifx = this.mock(lifx);
  },
  'should set opts to default when there is no customisation': function () {
    this.mockLifx.expects('init').once().withExactArgs().returns({});
    var nestor = new NestorLIFX({});
    assert.equals(nestor.opts.map, { ok: 0x53f0, fail: 0xffff, warn: 0x2f20 });
    assert.defined(nestor.lifx);
  },
  'should override status hue map if provided in opts': function () {
    this.mockLifx.expects('init').once().withExactArgs().returns({});
    var nestor = new NestorLIFX({ map: { ok: 0x1, fail: 0x2, warn: 0x3 } });
    assert.equals(nestor.opts.map, { ok: 0x1, fail: 0x2, warn: 0x3 });
    assert.defined(nestor.lifx);
  }
});

buster.testCase('nestorlifx - notify', {
  setUp: function () {
    this.mockConsole = this.mock(console);
    this.mockLifx = this.mock(lifx);
  },
  'should use mapped hue for known status': function (done) {
    var mockLifx = {
      lightsOn: function () { return; },
      lightsColour: function (hue, saturation, luminance, whiteColour, fadeTime) {
        assert.equals(hue, 0x53f0);
        assert.equals(saturation, 0xffff);
        assert.equals(luminance, 0x1000);
        assert.equals(whiteColour, 0);
        assert.equals(fadeTime, 0);
        done();
      }
    };
    this.mockLifx.expects('init').once().withExactArgs().returns(mockLifx);
    this.mockConsole.expects('log').once().withExactArgs('Setting LIFX bulb hue to %s for status %s', 0x53f0, 'ok');
    var nestor = new NestorLIFX({});
    nestor.notify('ok');
  },
  'should use predefined hue for unknown status': function (done) {
    var mockLifx = {
      lightsOn: function () { return; },
      lightsColour: function (hue, saturation, luminance, whiteColour, fadeTime) {
        assert.equals(hue, 0xaaaa);
        assert.equals(saturation, 0xffff);
        assert.equals(luminance, 0x1000);
        assert.equals(whiteColour, 0);
        assert.equals(fadeTime, 0);
        done();
      }
    };
    this.mockLifx.expects('init').once().withExactArgs().returns(mockLifx);
    this.mockConsole.expects('log').once().withExactArgs('Setting LIFX bulb hue to %s for status %s', 0xaaaa, 'inexistingstatus');
    var nestor = new NestorLIFX({});
    nestor.notify('inexistingstatus');
  }
});
