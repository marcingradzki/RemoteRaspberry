var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Remote GPIO' });
});

router.post('/', function(req, res){
  console.log("Button has been pressed!");
});

module.exports = router;
