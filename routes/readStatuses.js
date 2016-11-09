var express = require('express');
var router = express.Router();
var Light = require('./lightsClass.js');
var SerialPort = require('serialport');

var light = new Light();

var statuses = [];
var port = new SerialPort('/dev/ttyUSB0',{parser: SerialPort.parsers.raw}, function(){
  port.write(['0xFF','0xA1','0x00'], cb());
});


function cb(){
 port.on('data',function(data){
  var buff = new Buffer(data);
  console.log('Data ' + buff.toString('hex'));
  statuses = buff.toString('hex').slice(4);
  statuses = statuses.split('');
  console.log('before ' + statuses);
  for(let i = 0; i < 8; i++){
    statuses.splice(i,1);
  }  
  console.log('after ' + statuses);
 } );
};

router.post('/toggle', function(req, res){
  var p1 = new Promise(function(resolve, reject){
      if(!port.isOpen()){
        port.open();
      }
      var ID = '0x0' + req.body.id;
      var STAT = '0x0' + req.body.status;
      console.log(ID + " -- " + STAT);
      port.write(['0xFF', ID , STAT]);
    resolve(statuses);
  });
  p1.then(function(s){
    res.send(statuses);
  });
});

router.post('/', function(req, res){
  var p1 = new Promise(function(resolve, reject){
      if(!port.isOpen()){
        port.open();
      }
      port.write([0xFF,0xA1,0x00], cb());
    resolve(statuses);
  });
  p1.then(function(s){
    res.send(statuses);
  });
});

module.exports = router;

