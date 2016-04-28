var express = require('express');
var router = express.Router();
var path = require('path');
var exec = require('child_process').exec;

var pyArgs = {
  // make arguments that take no parameters (ie, --json) true or false
  "buoy": '',
  "datasource": 'http',
  "json": true,
  "datatype": "",
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

var pythonData = 'pythonData not set';

function run_script(){
  var execstr = 'python ' + path.join('./', 'ndbc.py') + flagGen(pyArgs);
  exec(execstr, function(error, stdout, stderr) {
    if (error) {
      console.log(stderr)
    }
    else {
      pythonData = JSON.parse(stdout);
    
    }
  });
}

/* GET buoy page. */
router.get('/', function(req, res, next) {
  pyArgs.buoy = req.query.buoy_id;
  pyArgs.datatype = req.query.datatype;
  promise = run_script();
  promise.then(function(result){
    res.send(pythonData);
  });
});


module.exports = router;
