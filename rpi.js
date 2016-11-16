var gpio = require('rpi-gpio');
var SerialPort = require('serialport');
var exec = require('child_process').exec;
var statuses = [];
 var state = true;
gpio.on('change', function(channel, value) {
	console.log(channel);
    if(value === false && state === true){
		exec('./sensor.sh x0'+ process.argv[2] +' x01' , function (error, stdout, stderr) {
			if(error){
				console.log(error.code + error);
			}
			gpio.write(11, true, function(err) {
				if (err) throw err;
			});
			state = false;
		});

		setTimeout(function(){
			exec('./sensor.sh x0' + process.argv[2] +' x00' , function (error, stdout, stderr) {
				if(error){
					console.log(error.code + error);
				}
			gpio.write(11, false, function(err) {
				if (err) throw err;
			});
			});
			state = true;
		}, process.argv[4]);
}});
gpio.setup(process.argv[3], gpio.DIR_IN, gpio.EDGE_BOTH);
gpio.setup(11, gpio.DIR_OUT);
