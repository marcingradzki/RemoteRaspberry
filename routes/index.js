var express = require('express');
var router = express.Router();
var gpio = require('rpi-gpio');

/* GET home page. */

router.post('/home', function(req, res, next){
  res.render('index', { title: 'Remote GPIO',
                        })
})

var state = false;

gpio.setup(13, gpio.DIR_OUT);

router.post('/onoff', function(req, res){
  //console.log("Button has been pressed!");
  if(state){
    gpio.write(13, state, function(err) {
        if (err) throw err;
      });
    console.log("ON");
    state = false;
  }
  else{
    gpio.write(13, state, function(err) {
        if (err) throw err;
      });
    console.log("OFF");
    state = true;
  }
});

module.exports = router;
