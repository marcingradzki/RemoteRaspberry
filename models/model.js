var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    adminRole: {
        type: Boolean, default: false
    }
});

UserSchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('password')) {
       return next()
    }
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
    next()
})


var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, cb){
    newUser.save(cb);
}

module.exports.getUserByUsername = function(username, cb){
    var querry = {username: username};
    User.findOne(querry, cb);
}

module.exports.getUserById = function(id, cb){
    User.findById(id, cb);
}

module.exports.comparePassword = function(candidatePassword, hash, cb){
    bcrypt.compare(candidatePassword, hash, function(err, matches){
        if(err) throw err;
        cb(null, matches);
    })
}
