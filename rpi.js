var gpio = require('rpi-gpio');
var SerialPort = require('serialport');
var exec = require('child_process').exec;
var statuses = [];
 var state = true;
gpio.setup(process.argv[3], gpio.DIR_IN, gpio.EDGE_BOTH);

gpio.on('change', function(channel, value) {
	console.log(channel);
    if(value === false && state === true){
		exec('./sensor.sh x0'+ process.argv[2] +' x01' , function (error, stdout, stderr) {
			if(error){
				console.log(error.code + error);
			}
			state = false;
		});

		setTimeout(function(){
			exec('./sensor.sh x0' + process.argv[2] +' x00' , function (error, stdout, stderr) {
				if(error){
					console.log(error.code + error);
				}
			});
			state = true;
		}, process.argv[4]);
}});
