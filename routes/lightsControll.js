var express = require('express');
var router = express.Router();
var Light = require('./lightsClass.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Relays = require('../models/relaysModel');
var SerialPort = require('serialport');

var light = new Light();

var statuses = [];
/*
var port = new SerialPort('/dev/ttyUSB0',{parser: SerialPort.parsers.raw}, function(){
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
*/

router.get('/', function(req, res, next){
  res.render('index', {title: 'Remote GPIO', Light : Light, editMode : false, statuses: statuses});
});

router.post('/update', function(req, res){
  var lightObjects = [];
  lightObjects = req.body.newLights;
  lightObjects = JSON.parse(lightObjects);
  var len = lightObjects.length;
  var pr = new Promise(function(resolve, reject){
    Relays.findOne({name: 'Home'}).exec(function(err, list){
    if(err) console.log(err);
    else{
      list.lights = lightObjects;
      list.save();
      resolve('Updated');
    }});
  });
  pr.then(function(s){
    console.log(s);
    res.render('index', {
          title: 'Remote GPIO', statuses: statuses
        });
  });
});

router.post('/', function(req, res){
  
  //rendering calych stron dziala, trzeba tu wrzucic stronke do nawigacji, ktora podaje dalej :D
  var newSchema = new Relays({
    name : 'Home',
    freeRelaysNumber: 8,
    lights: []
  });
  Relays.findOne({name: 'Home'}, function(err, home){
    if(err) console.log(err);
    else{
      if(home == null){
        var p1 = new Promise(function(resolve, reject){
            Relays.createRelaySchema(newSchema, function(err){
            if (err) console.log('insert err');  
            else {
              Relays.findOne({name: 'Home'}, function(err, home){
                if(err) console.log(err);
                else{
                  resolve(home);
                }
              })  
            }});          
        });
        p1.then(function(r){
          console.log(r);
        res.render('lightsControll', {
          title: 'Remote GPIO',
          Light : Light,
          home: r, 
          editMode : false,
          statuses: statuses
        });
      });
    }
      else{
        res.render('lightsControll', {
          title: 'Remote GPIO',
          Light : Light,
          home: home, 
          editMode : req.body.editMode,
          statuses: statuses
        });
      }
    } 
  });
});
var state = false;

module.exports = router;