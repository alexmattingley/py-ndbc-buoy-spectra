var express = require('express');
var router = express.Router();
var path = require('path');
var exec = require('child_process').exec;

var pyArgs = {
  // make arguments that take no parameters (ie, --json) true or false
  "buoy": '46232',
  "datasource": 'http',
  "json": true,
  "datatype": "spectra",
  "units": 'ft'
};

pyArgs.datatype = '9band';

function flagGen(args) {
  var flags = '';
  for (var a in args) {
    if (args.hasOwnProperty(a)) {
      if (typeof(pyArgs[a]) == 'string'){
        flags += " --" + a + ' ' + pyArgs[a];
      }
      else {
        if (pyArgs[a] == true)
          flags += ' --' + a;
      }
    }
  }
  return flags;
}

function check_script_complete(output){
}

var buoyData = ''

function run_script(){
  var execstr = 'python ' + path.join('./', 'ndbc.py') + flagGen(pyArgs);
  exec(execstr, function(error, stdout, stderr) {
    console.log(typeof stdout);
    if (error) {
      console.log(stderr)
    }
    else {
      buoyData = JSON.parse(stdout);
      //console.log(buoyData);
    }
  });
  console.log(buoyData);
  return buoyData;
}

run_script();
var buoyData = "buoydata hasnt been set";

/* GET buoy page. */
router.get('/', function(req, res, next) {
  var buoy_id = req.query.buoy_id;
  buoyData = run_script();
	next();
}, function(req, res, next){
  console.log(buoyData);
  res.send(buoyData);
});


module.exports = router;
