var express = require('express');
var router = express.Router();
var Light = require('./lightsClass.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Relays = require('../models/relaysModel');
var SerialPort = require('serialport');
var process = require('child_process');
var sensor = require('node-dht-sensor');

var light = new Light();

var statuses = [];

router.post('/update', function(req, res){
  var lightObjects = [];
  lightObjects = req.body.newLights;
  console.log(lightObjects);
  lightObjects = JSON.parse(lightObjects);
  var len = lightObjects.length;
  var pr = new Promise(function(resolve, reject){
    Relays.findOne({name: 'Home'}).exec(function(err, list){
    if(err) console.log(err);
    else{
      list.temperature = lightObjects;
      list.save();
      resolve('Updated');
    }});
  });
  pr.then(function(s){
    console.log(s);
    res.render('index', {
          title: 'Temperature Controll', statuses: statuses
        });
  });
});

router.post('/', function(req, res, next){
  var currentTemperature;
  sensor.read(11, 4, function(err, temperature, humidity) {
      if (!err) {
        currentTemperature = temperature;
        console.log(currentTemperature);
      }
      else{
    console.log(err);
      }
  });
  var newSchema = new Relays({
    name : 'Home',
    freeRelaysNumber: 8,
    lights: [],
    sensors: [],
    temperature: []
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
        res.render('temperatureControll', {
          title: 'Temperature Controll',
          Light : Light,
          home: r, 
          editMode : false,
          statuses: statuses,
          currentTemperature: currentTemperature
        });
      });
    }
      else{
        console.log('--> ' + currentTemperature);
        res.render('temperatureControll', {
          title: 'Temperature Controll',
          Light : Light,
          home: home, 
          editMode : req.body.editMode,
          statuses: statuses,
          currentTemperature: currentTemperature
        });
      }
    } 
  });
});

module.exports = router;