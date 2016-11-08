var express = require('express');
var router = express.Router();
var Light = require('./lightsClass.js');
var SerialPort = require('serialport');

var light = new Light();

var port = new SerialPort('/dev/ttyUSB0',{parser: SerialPort.parsers.raw} ,function(){
  port.write([0xFF,0xA1,0x00], cb);
});

var statuses = [];

function cb(){
 port.on('data',function(data){
  var buff = new Buffer(data);
  console.log('Data ' + buff.toString('hex'));
  statuses = buff.toString('hex');  
 } );
};

router.get('/', function(req, res, next){
  res.send(statuses);
});

