var SerialPort = require('serialport');
var sensor = require('node-dht-sensor');
var exec = require('child_process').exec;
var statuses = [];
var state = true;
var num = 1;

var gpio = process.argv[2];
var relay = process.argv[3];
var sign = process.argv[4];
var treshold = process.argv[5];

setInterval(function(){
    sensor.read(11, gpio, function(err, temperature, humidity) {
    if (!err) {
        console.log('temp: ' + temperature + '°C '
        );
        if(temperature >= treshold){
            exec('./sensor.sh x0' + relay +' x0' + (sign === 'More'?1:0) , function (error, stdout, stderr) {
				if(error){
					console.log(error.code + error + './sensor.sh x0' + relay +' x0' + (sign === 'More'?1:0));
				}
			});
			state = true;
        }
        else{
            exec('./sensor.sh x0' + relay +' x0' + (sign === 'More'?0:1) , function (error, stdout, stderr) {
				if(error){
					console.log(error.code + error + './sensor.sh x0' + relay +' x0' + (sign === 'More'?0:1));
				}
			});
			state = false;
        }
    }
    else{
	console.log(err);
    }
});
}, 5000);//180000