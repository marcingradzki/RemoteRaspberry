var express = require('express');
var router = express.Router();
var Light = require('./lightsClass.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var light = new Light();

router.get('/', function(req, res, next){
  res.render('index', {title: 'Remote GPIO', Light : Light});
});

router.post('/', function(req, res, next){
  res.render('lightsControll', {title: 'Remote GPIO', Light : Light});
  //rendering calych stron dziala, trzeba tu wrzucic stronke do nawigacji, ktora podaje dalej :D
});
var state = false;

module.exports = router;