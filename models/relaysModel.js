var mongoose = require('mongoose');

var RelaysSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    freeRelaysNumber: {
        type: Number,
        default: 0
    },
    lights: [{
        roomName: String,
        relayId: Number
    }],
    sensors: [{
        sensorPin: String,
        relayId: Number,
        delay: Number
    }],
    temperature: [{
        name: String,
        gpio: Number,
        relayId: Number,
        treshold: Number,
        range: String
    }]
});

var Relays = module.exports = mongoose.model('Relays', RelaysSchema);

module.exports.getNumberOfFreeRelays = function(){
    return 0;
}

module.exports.createRelaySchema = function(newRelSchema, cb){
    newRelSchema.save(cb);
}

module.exports.find = function(name, cb){
    var querry = {name: name};
    return User.findOne(querry, cb);
}