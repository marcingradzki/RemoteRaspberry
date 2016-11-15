var express = require('express');
var router = express.Router();
var Light = require('./lightsClass.js');
var SerialPort = require('serialport');
var process = require('child_process');
var light = new Light();

var statuses = [];
var port = new SerialPort('/dev/ttyUSB0',{parser: SerialPort.parsers.raw}, function(){
        port.write(['0xFF','0xA1','0x00'], cb(port));
      });

function cb(port){
 port.on('data',function(data){
  var buff = new Buffer(data);
  statuses = buff.toString('hex').slice(4);
  statuses = statuses.split('');
  for(let i = 0; i < 8; i++){
    statuses.splice(i,1);
  }  
 } );
};

router.post('/childProcess', function(req, res){
  //port.close();
  var ls = process.exec('node ../RemoteRaspberry/rpi.js', function (error, stdout, stderr) {
    if(error){
      console.log(error.code + error);
    }
    else{
      console.log('gitara');
    }
  });
});

router.post('/toggle', function(req, res){
  var p1 = new Promise(function(resolve, reject){
      /*var port = new SerialPort('/dev/ttyUSB0',{parser: SerialPort.parsers.raw}, function(){
        port.write(['0xFF','0xA1','0x00'], cb(port));
      });*/
      if(!port.isOpen()){
        port.open();
      }
      var ID = '0x0' + req.body.id;
      var STAT = '0x0' + req.body.status;
      port.write(['0xFF', ID , STAT]);
    resolve(statuses);
  });
  p1.then(function(s){
    //port.close();
    res.send(statuses);
  });
});

router.post('/', function(req, res){
  var p1 = new Promise(function(resolve, reject){
    /*var port = new SerialPort('/dev/ttyUSB0',{parser: SerialPort.parsers.raw}, function(){
      ;
    });*/
      if(!port.isOpen()){
        port.open();
      }
      port.write([0xFF,0xA1,0x00], cb(port));
    resolve(statuses);
  });
  p1.then(function(s){
    //port.close();
    res.send(statuses);
  });
});

module.exports = router;

