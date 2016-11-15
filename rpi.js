var gpio = require('rpi-gpio');
var SerialPort = require('serialport');
var exec = require('child_process').exec;
var statuses = [];
 var state = true;
gpio.on('change', function(channel, value) {

    if(value === false){
		if(state){
			try{
				exec('./sensor.sh \\x01 \\x00' , function (error, stdout, stderr) {
			if(error){
			console.log(error.code + error);
			}
			else{
				console.log(stdout);
			}
 			 });
			  gpio.write(11, false, function(err) {
					if (err) throw err;
				});
			}
			catch(e){

			}
			
			  state = false;
		}
		else{
			try{
				exec('./sensor.sh \\x01 \\x01', function (error, stdout, stderr) {
			if(error){
			console.log(error.code + error);
			}
			else{
				console.log(stdout);
			}
 			 });
			  gpio.write(11, true, function(err) {
					if (err) throw err;
				});
			}
			catch(e){

			}
			  state = true;
		}
		/*var p1 = new Promise(function(resolve, reject){
			var port = new SerialPort('/dev/ttyUSB0',{parser: SerialPort.parsers.raw}, function(){
			});	
			gpio.write(11, true, function(err) {
					if (err) throw err;
				});
			port.open();
			
			console.log('toggle');
			port.write(['0xFF', '0x01' , '0x01']);
			resolve(statuses);
		});
		p1.then(function(s){
			if(!port.isOpen()){
				
				gpio.write(11, true, function(err) {
					if (err) throw err;
				});
				port.open();
			}
			gpio.write(11, false, function(err) {
					if (err) throw err;
				});
			port.write(['0xFF', '0x01' , '0x01']);
		}).then(function(q){
			
			gpio.write(11, true, function(err) {
					if (err) throw err;
				});
			
		}).then(function(z){
			//port.close();
		});
		
	}
});
gpio.setup(12, gpio.DIR_IN, gpio.EDGE_BOTH);
gpio.setup(11, gpio.DIR_OUT);

/*
var state = false;
gpio.on('change', function(channel, value) {
    if(value === false){
		if(state){
			gpio.write(11, false, function(err) {
			if (err) throw err;
				console.log('Written to pin');
			});
			state = false;
		}
		else{
			gpio.write(11, true, function(err) {
			if (err) throw err;
				console.log('Written to pin');
			});
			state = true;
		}*/
	}
});
gpio.setup(12, gpio.DIR_IN, gpio.EDGE_BOTH);
gpio.setup(11, gpio.DIR_OUT);
