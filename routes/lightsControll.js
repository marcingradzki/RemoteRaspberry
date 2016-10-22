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
        Relays.createRelaySchema(newSchema, function(err){
        if (err) console.log('insert err');
      });}
      else{
        console.log('nie tworze ' + home.freeRelaysNumber + ' ' + home.name + ' \n' + home);
        //przekazac obiekt home do widoku i tam drukowac ilosc okienek
      }
    } 
  });
 
  res.render('lightsControll', {title: 'Remote GPIO', Light : Light});
});
var state = false;

module.exports = router;