var express = require('express');
var router = express.Router();
var Light = require('./lightsClass.js');
var SerialPort = require('serialport');
var process = require('child_process');
var light = new Light();
var t = [12,18];
var statuses = [];
/*var port = new SerialPort('/dev/ttyUSB0',{parser: SerialPort.parsers.raw}, function(){
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
  var sensorObj = [];
  sensorObj = req.body.newLights;
  console.log(sensorObj);
  sensorObj = JSON.parse(sensorObj);
  var len = sensorObj.length;
  for(var i = 0; i < len; i++){
    (function(i){
      //rpi.js 1 2 3 => [1:relay , 2:gpioPIN , 3:delay in ms]
      setTimeout(function(){
        console.log('node ../RemoteRaspberry/rpi.js ' + sensorObj[i].relayId + ' ' + 
          sensorObj[i].sensorPin + ' ' + sensorObj[i].delay);
        var ls = process.exec('node ../RemoteRaspberry/rpi.js ' + sensorObj[i].relayId + ' ' + 
          sensorObj[i].sensorPin + ' ' + sensorObj[i].delay,
        function (error, stdout, stderr) {
          if(error){
            console.log(error.code + error);
           }
       });  
      },2000);
    }(i))
  }
});

router.post('/temperature', function(req, res){
  //port.close();
  var sensorObj = [];
  sensorObj = req.body.newLights;
  console.log(sensorObj);
  sensorObj = JSON.parse(sensorObj);
  var len = sensorObj.length;
  console.log('====>' + sensorObj);
  for(var i = 0; i < len; i++){
    (function(i){
      //tem.js 1 2 3 4 5 => [1:gpio , 2:relayId , 3:more/less , 4:treshold]
      setTimeout(function(){
        console.log('node ../RemoteRaspberry/tem.js ' + sensorObj[i].gpio + ' ' + 
          sensorObj[i].relayId + ' ' + sensorObj[i].range + ' ' + sensorObj[i].treshold);
        var ls = process.exec('node ../RemoteRaspberry/tem.js ' + sensorObj[i].gpio + ' ' + 
          sensorObj[i].relayId + ' ' + sensorObj[i].range + ' ' + sensorObj[i].treshold,
        function (error, stdout, stderr) {
          if(error){
            console.log(error.code + error);
           }
       });  
      },2000);
    }(i))
  }
});

router.post('/toggle', function(req, res){
  var p1 = new Promise(function(resolve, reject){
      /*var port = new SerialPort('/dev/ttyUSB0',{parser: SerialPort.parsers.raw}, function(){
        port.write(['0xFF','0xA1','0x00'], cb(port));
      });*//*
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
*/
router.post('/', function(req, res){/*
  var p1 = new Promise(function(resolve, reject){
      if(!port.isOpen()){
        port.open();
      }
      port.write([0xFF,0xA1,0x00], cb(port));
    resolve(statuses);
  });
  p1.then(function(s){
    //port.close();
    res.send(statuses);
  });*/
  res.send([1,1,1,1,1,1,1,1]);
});

module.exports = router;

