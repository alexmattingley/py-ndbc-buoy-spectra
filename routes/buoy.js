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
  //check if output exists
  //wait a second
  //check again
  //call function as middlewear in child variable?
}

function run_script(){
  var buoyData = ''
  var execstr = 'python ' + path.join('./', 'ndbc.py') + flagGen(pyArgs);
  var child = exec(execstr, function(error, stdout, stderr) {
    console.log('working');
    if (error) {
      console.log(stderr)
    }
    else {
      buoyData= JSON.parse(stdout);
    }
  });
  return buoyData;
}



/* GET buoy page. */
router.get('/', function(req, res, next) {
  var buoy_id = req.query.buoy_id;
	res.send(set_flags.run_script());
});


module.exports = router;
