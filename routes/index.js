var express = require('express');
var router = express.Router();
var Light = require('./lightsClass.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var light = new Light();

/* GET home page. */

router.get('/', function(req, res, next){
  res.render('index', {title: 'Remote GPIO', Light : Light});
});

router.post('/home', function(req, res, next){
  res.render('index', { title: 'Remote GPIO', light : light});
});
var state = false;

module.exports = router;
