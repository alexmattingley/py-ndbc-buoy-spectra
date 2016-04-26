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

// pyArgs.datatype = '9band';

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
  return buoyData;
}

/* GET buoy page. */
router.get('/', function(req, res, next) {
  pyArgs.buoy = req.query.buoy_id;
  //pyArgs.datatype = req.query.datatype;
  console.log(pyArgs);
  var buoyData = 'hello';
  buoyData = run_script();
  res.send(buoyData);
});


module.exports = router;
