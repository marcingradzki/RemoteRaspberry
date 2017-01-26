var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var User = require('../models/model') 
/* GET home page. */

router.get('/', function(req, res, next) {
  	
	User.findOne({username: 'Admin'}).exec(function(err, obj){
		if(err) console.log(err);
		if(obj === null){
      console.log('Admin creation...');
			var newUsr = new User({
				username: 'Admin',
				email: 'admin@admin.com',
				password: 'admin',
				adminRole: true
			});
			User.createUser(newUsr, function(err){
				if(err) console.log(err);
				else{
          console.log('Admin user created!');
        } 
			});
		}
    else{
      res.render('login', { title: 'Login'});
    }
	});
	
  
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
      password: password,
      adminRole: false
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
      console.log('New user: ' + user.username + ' admin privileges: ' + user.adminRole);
      req.flash('success_msg', 'You are sucessfully registered, please log in');
      res.redirect('/');
    })   
  }
});

  passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Invalid user!'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password!'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/index', failureRedirect:'/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/index');
  });

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success_msg', 'Logged out!');
  res.redirect('/login');
});

router.get('/manage', function(req, res){
  res.render('manage', {title: 'Manage account'});
});

router.post('/change', function(req, res, next){
  var newpass = req.body.new;
  var newpassconfirm = req.body.new2;
  if (newpass !== newpassconfirm) {
        throw new Error('Password and confirm password do not match');
     }

     var user = req.user;
     user.password = newpass;

     user.save(function(err){
         if (err) { next(err) }
         else {
             req.logout();
             req.flash('success_msg', 'Password changed! Use new password to log in');
             res.redirect('/login');
         }
     })
});

router.post('/grant', function(req, res, next){
	var name = req.body.userName;
	User.findOne({username: name}).exec(function(err, obj){
		if(err) req.flash('error_msg', 'No such a user!');
		else{
			var role = obj.adminRole;
			if(role){
				obj.adminRole = false;
			}
			else{
				obj.adminRole = true;
			}
			obj.save();
			req.flash('success_msg', 'Privileges changed!');
      res.redirect('/manage');
		}
	});
});

module.exports = router;
