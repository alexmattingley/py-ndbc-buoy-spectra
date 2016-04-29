var express = require('express');
var router = express.Router();
var path = require('path');
var exec = require('child_process').exec;


var pyArgs = {
  // make arguments that take no parameters (ie, --json) true or false
  "buoy": '',
  "datasource": 'http',
  "json": true,
  "datatype": "spectra",
  "units": 'ft'
};

//Generate flags for the python script call
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

var pythonData;

function run_script(){
  return new Promise(function(resolve, reject){
    var execstr = 'python ' + path.join('./', 'ndbc.py') + flagGen(pyArgs);
    exec(execstr, function(error, stdout, stderr) {
      if (error) {
        console.log(stderr)
      }
      else {
        pythonData = JSON.parse(stdout);
        return resolve(pythonData);
      }
    });
  });
}

function check_if_query_exists(req, queryVal){
  if(req.query[queryVal] != undefined){
    pyArgs[queryVal] = req.query[queryVal];
  }else{
    //console.log('user is not using' + queryVal);
  }
}

/* GET buoy page. */
router.get('/', function(req, res, next) {
  check_if_query_exists(req, 'buoy');
  check_if_query_exists(req, 'datasource');
  check_if_query_exists(req, 'json');
  check_if_query_exists(req, 'datatype');
  check_if_query_exists(req, 'units');
  run_script().then(function(data){
    res.send(pythonData);
  })
});


module.exports = router;
