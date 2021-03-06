var express = require('express');
var router = express.Router();
var Light = require('./lightsClass.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Relays = require('../models/relaysModel');
var SerialPort = require('serialport');
var process = require('child_process');

var light = new Light();

var statuses = [];

router.post('/update', function(req, res){
  var lightObjects = [];
  lightObjects = req.body.newLights;
  lightObjects = JSON.parse(lightObjects);
  var len = lightObjects.length;
  var pr = new Promise(function(resolve, reject){
    Relays.findOne({name: 'Home'}).exec(function(err, list){
    if(err) console.log(err);
    else{
      list.sensors = lightObjects;
      list.save();
      resolve('Updated');
    }});
  });
  pr.then(function(s){
    console.log(s);
    res.render('index', {
          title: 'Sensors Controll', statuses: statuses
        });
  });
});

router.post('/', function(req, res, next){
  var newSchema = new Relays({
    name : 'Home',
    freeRelaysNumber: 8,
    lights: [],
    sensors: []
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
        res.render('sensorsControll', {
          title: 'Sensors Controll',
          Light : Light,
          home: r, 
          editMode : false,
          statuses: statuses
        });
      });
    }
      else{
        res.render('sensorsControll', {
          title: 'Sensors Controll',
          Light : Light,
          home: home, 
          editMode : req.body.editMode,
          statuses: statuses
        });
      }
    } 
  });
});

module.exports = router;