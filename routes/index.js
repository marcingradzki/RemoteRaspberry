var express = require('express');
var router = express.Router();
var gpio = require('rpi-gpio');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Remote GPIO' });
});

var state = false;

gpio.setup(13, gpio.DIR_OUT);

router.post('/onoff', function(req, res){
  console.log("Button has been pressed!");
  if(state){
    gpio.write(13, state);
    state = false;
  }
  else{
    gpio.write(13, state);
    state = true;
  }
});

module.exports = router;
