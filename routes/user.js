var express = require('express');
var router = express.Router();

var User = require('../models/model') 
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login'});
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register', errs: ''});
});

router.post('/register', function(req, res) {
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  req.checkBody('email', 'Please enter your email').notEmpty();
  req.checkBody('email', 'Please enter valid email').isEmail();
  req.checkBody('username', 'Please enter your username').notEmpty();
  req.checkBody('password', 'Please enter your password').notEmpty();
  req.checkBody('password2', 'Passwords do not match!').equals(req.body.password);

  var errs = req.validationErrors();

  if(errs){
    console.log(errs);
    res.render('register', {title: 'Register', errs: errs});
  }
  else{
    var newUser = new User({
      username: username,
      email: email,
      password: password
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
      console.log(user);
    })

    req.flash('success_msg', 'You are sucessfully registered, please log in');

    res.redirect('/');
  }

});




module.exports = router;
