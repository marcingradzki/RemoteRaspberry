function lightsClass(){
    this.name = '';
    this.relayId = '';
    this.status = false;
};

lightsClass.prototype.setName = function(name){
    this.name = name;
};

lightsClass.prototype.getName = function(){
    return this.name;
};

lightsClass.prototype.setRelayId = function(relayId){
    this.relayId = relayId;
};

lightsClass.prototype.getRelayId = function(){
    return this.relayId;
};
module.exports = lightsClass;