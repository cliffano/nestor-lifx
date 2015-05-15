var bag         = require('bagofcli');
var Jenkins     = require('nestor');
var NestorLIFX  = require('./nestorlifx');
var querystring = require('querystring');

function _run(args) {

  var lifxOpts = {
    map: args.map ? querystring.parse(args.map, ',', '=') : undefined
  };

  var jenkinsOpts = {
    job     : args.job,
    view    : args.view,
    schedule: args.schedule
  };

  var nestorLifx = new NestorLIFX(lifxOpts);
  var jenkins    = new Jenkins(process.env.JENKINS_URL);

  jenkins.monitor(jenkinsOpts, function (err, result) {
    if (err) {
      console.error(err.message);
      process.exit(1);
    } else {
      nestorLifx.notify(result);
    }
  });
}

/**
 * Execute Nestor LIFX CLI.
 */
function exec() {

  var actions = {
    commands: {
      run: { action: _run }
    }
  };

  bag.command(__dirname, actions);
}

exports.exec = exec;
