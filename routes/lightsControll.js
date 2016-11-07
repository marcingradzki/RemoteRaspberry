var express = require('express');
var router = express.Router();
var Light = require('./lightsClass.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Relays = require('../models/relaysModel');

var light = new Light();

router.get('/', function(req, res, next){
  res.render('index', {title: 'Remote GPIO', Light : Light});
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
          title: 'Remote GPIO'
        });
  });
/*
  var pr2 = new Promise(function(resolve, reject){
        Relays.findOne({name: 'Home'}).exec(function(err, h){
        if(err) console.log(err);
        else{
          console.log(h);
          resolve(h);
        }
    })
  });

  pr2.then(function(r){
    console.log(r);
    res.render('lightsControll', {
          title: 'Remote GPIO',
          Light : Light,
          home: r
        });
  });
  */
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
          home: r
        });
      });
    }
      else{
        res.render('lightsControll', {
          title: 'Remote GPIO',
          Light : Light,
          home: home
        });
      }
    } 
  });
});
var state = false;

module.exports = router;