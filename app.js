//****************** express **********************************************

const express = require('express')
const app = express()

app.use(express.static('views'))
app.set('view engine', 'ejs');


function page(res, file, titre )
	{
	if(connection) { res.render( "pages/"+file, { titre : titre } )  }
	else           { res.render( "pages/wait"  )  }
	}

app.get('/',               function (req, res) { page(res, "cap",     "Auto Pilote")    })
app.get('/gyroscope',      function (req, res) { page(res, "gyro",    "Gyroscope")      })
app.get('/accelerometre',  function (req, res) { page(res, "accel",   "Accéléromètre")  })
app.get('/asservissement', function (req, res) { page(res, "pid",     "Asservissement") })
app.get('/magnetometre',   function (req, res) { page(res, "magneto", "Magnetomètre")   })
app.get('/power',          function (req, res) { page(res, "power",   "Power")          })

app.get('/connected', function ( req,res )
	{
	if( connection ) { res.send(true)  }
	else             { res.send(false) }
	})

var server = app.listen(8081, function () 
	{  
    console.log("connetez vous à http://localhost:%s", server.address().port)
	})

//***************** Noble ***********************************************

const SERVICE_UUID     = 'ff10'
const CAP_UUID         = 'ff17'
const DATA_UUID        = 'ff18'
const PID_UUID         = 'ff19'
const CAPTEUR_UUID     = 'ff20'
const CALIBRATION_UUID = 'ff21'
const COMMANDE_UUID       = 'ff22'
const CAP              = 0
const DATA             = 1
const PID              = 2
const CAPTEUR          = 3
const CALIBRATION      = 4
const COMMANDE            = 5

var noble = require('noble');

var connection = false

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
					
		peripheral.once('disconnect', function() 
			{
			console.log('Deconnection');
			connection = false
			noble.startScanning([SERVICE_UUID],false);
			});

		peripheral.connect( function() 
			{
			console.log('Connection');
			connection = true 
			peripheral.discoverSomeServicesAndCharacteristics(
				[
				SERVICE_UUID
				], 	
				[
				CAP_UUID,
				DATA_UUID,
				PID_UUID,
				CAPTEUR_UUID,
				CALIBRATION_UUID,
				COMMANDE_UUID
				], 
				function(error, services, characteristics) 
				{
				console.log('services                   : ' + services[0].uuid);
				console.log('characteristics CAP        : ' + characteristics[CAP].uuid);
				console.log('characteristics DATA       : ' + characteristics[DATA].uuid);
				console.log('characteristics PID        : ' + characteristics[PID].uuid);
				console.log('characteristics CAPTEUR    : ' + characteristics[CAPTEUR].uuid);
				console.log('characteristics CALIBRATION: ' + characteristics[CALIBRATION].uuid);
				console.log('characteristics COMMANDE   : ' + characteristics[COMMANDE].uuid);
						
				app.get('/capGet', function (req, res) 		
						{
						console.log("capGet")
						characteristics[CAP].read( function(error,data) 
							{ 
							if(!error)
								{
								const buf = Buffer.from(data);
								res.end(JSON.stringify(buf.readFloatBE(0)));
								}
							else
								{
								console.log(error)
								res.send(false)
								}
							});
						})

				app.get('/dataGet', function (req, res) 
						{
						characteristics[DATA].read( function(error,data) 
							{ 
							if(!error)
								{
								const buf = Buffer.from(data);
								res.end(JSON.stringify([buf.readFloatBE(0),buf.readFloatBE(4)]));
								}
							else
								{
								console.log(error)
								res.send(false)
								}
							
							});
						})
				
				app.get('/pidGet', function (req, res) 		
						{
						console.log("pidGet")
						characteristics[PID].read( function(error,data) 
							{ 
							if(!error)
								{
								const buf = Buffer.from(data);
								res.end(JSON.stringify(	[
														buf.readFloatBE(0),
														buf.readFloatBE(4),
														buf.readFloatBE(8)
														]))
								}
							else
								{
								console.log(error)
								res.send(false)
								}
							
							});
						})

				app.get('/capteurGet', function (req, res) 
						{
						characteristics[CAPTEUR].read( function(error,data) 
							{ 
							if(!error)
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
								}
							else
								{
								console.log(error)
								res.send(false)
								}
							});
						})
				
				app.get('/calibrationGet', function (req, res)
						{
						characteristics[CALIBRATION].read( function(error,data)
							{
							if(!error)
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
								}
							else
								{
								console.log(error)
								res.send(false)
								}
							
							})
						})
				
				app.get('/commande', function (req, res) 
						{
						console.log("commande : "+req.query.value)
						characteristics[COMMANDE].write(new Buffer(req.query.value), false, function(error)
							{
							if(!error)
								{
								res.send(true)
								}
							else
								{
								console.log(error)
								res.send(false)
								}
							})
						})
				})
			})	
		});

