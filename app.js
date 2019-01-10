const express = require('express')
const app = express()

app.use(express.static('public'))

PUBLIC = __dirname + "/public/"

app.get('/',               function (req, res) { res.sendFile( "cap.html",       { root : PUBLIC } ); })
app.get('/gyroscope',      function (req, res) { res.sendFile( "gyro.html",      { root : PUBLIC } ); })
app.get('/accelerometre',  function (req, res) { res.sendFile( "accel.html",     { root : PUBLIC } ); })
app.get('/asservissement', function (req, res) { res.sendFile( "pid.html",       { root : PUBLIC } ); })
app.get('/magnetometre',   function (req, res) { res.sendFile( "magneto.html",   { root : PUBLIC } ); })

var server = app.listen(8081, function () 
	{  
    console.log("listening at http://localhost:%s", server.address().port)
	})

const SERVICE_UUID     = 'ff10'
const CAP_UUID         = 'ff17'
const DATA_UUID        = 'ff18'
const PID_UUID         = 'ff19'
const CAPTEUR_UUID     = 'ff20'
const CALIBRATION_UUID = 'ff21'
const CAP              = 0
const DATA             = 1
const PID              = 2
const CAPTEUR          = 3
const CALIBRATION      = 4

var noble    = require('noble');

var timerID;

//************** Start Scanning

noble.on('stateChange',
	function(state)
		{
		console.log("state Change");
		if( state === 'poweredOn')
			{
			console.log("start scanning");
			noble.startScanning([SERVICE_UUID],false);
			}
		else
			{
			noble.stopScanning();
			}
		});

//************* On Discover ****************************************

noble.on('discover',function(peripheral)
		{
		console.log("Discover");
		noble.stopScanning();
		peripheral.connect();
					
		peripheral.once('disconnect', function() 
			{
			console.log('on -> disconnect');
			noble.startScanning([SERVICE_UUID],false);
			});

		peripheral.once('connect', function() 
			{
			console.log('connection');
			peripheral.discoverSomeServicesAndCharacteristics(
				[
				SERVICE_UUID
				], 	
				[
				CAP_UUID,
				DATA_UUID,
				PID_UUID,
				CAPTEUR_UUID,
				CALIBRATION_UUID
				], 
				function(error, services, characteristics) 
				{
				console.log('services                   : ' + services[0].uuid);
				console.log('characteristics CAP        : ' + characteristics[CAP].uuid);
				console.log('characteristics DATA       : ' + characteristics[DATA].uuid);
				console.log('characteristics PID        : ' + characteristics[PID].uuid);
				console.log('characteristics CAPTEUR    : ' + characteristics[CAPTEUR].uuid);
				console.log('characteristics CALIBRATION: ' + characteristics[CALIBRATION].uuid);
				
				app.get('/cap', function (req, res) 
						{
						console.log("cap")
						if(req.query.value)
							{
							console.log("change "+req.query.value);
							characteristics[CAP].write(new Buffer([req.query.value]), false, function(error){})
							}
						characteristics[CAP].read( function(error,data) 
							{ 
							const buf = Buffer.from(data);
							res.end(JSON.stringify(buf.readFloatBE(0)));
							console.log('cap: '+Math.round(buf.readFloatBE(0))) 
							});
						})

				app.get('/data', function (req, res) 
						{
						characteristics[DATA].read( function(error,data) 
							{ 
							const buf = Buffer.from(data);
							res.end(JSON.stringify([buf.readFloatBE(0),buf.readFloatBE(4)]));
							});
						})
													
				app.get('/pid', function (req, res) 
						{
						console.log("pid")
						if(req.query.value)
							{
							console.log("write : "+req.query.value)
							characteristics[PID].write(new Buffer(req.query.value), false, function(error){})
							}
						characteristics[PID].read( function(error,data) 
							{ 
							const buf = Buffer.from(data);
							res.end(JSON.stringify(	[
													buf.readFloatBE(0),
													buf.readFloatBE(4),
													buf.readFloatBE(8)
													]))
							});
						})

				app.get('/capteur', function (req, res) 
						{
						characteristics[CAPTEUR].read( function(error,data) 
							{ 
							const buf = Buffer.from(data);
							res.end(JSON.stringify(	[
													buf.readFloatBE(0),
													buf.readFloatBE(4),
													buf.readFloatBE(8),
													buf.readFloatBE(12),
													buf.readFloatBE(16),
													buf.readFloatBE(20),
													buf.readFloatBE(24),
													buf.readFloatBE(28),
													buf.readFloatBE(32)
													]))
							});
						})
						
				app.get('/calibration', function (req, res) 
						{
						console.log("calibration")
						if(req.query.value)
							{
							console.log("calibration save "+req.query.value);
							characteristics[CALIBRATION].write(new Buffer(req.query.value), false, function(error){})
							}
						characteristics[CALIBRATION].read( function(error,data)
							{
							const buf = Buffer.from(data);
							res.send(JSON.stringify([
													buf.readFloatBE(0),
													buf.readFloatBE(4),
													buf.readFloatBE(8),
													buf.readFloatBE(12),
													buf.readFloatBE(16),
													buf.readFloatBE(20)
													]
													))
							})
						})
				})
			})	
		});

