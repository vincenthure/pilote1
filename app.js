//****************** express **********************************************

const express = require('express')
const exeCute = require('exe')
const app = express()
var   characteristicPilote

app.use(express.static('views'))
app.set('view engine', 'ejs');

app.get('/connected', function ( req,res )
	{
	if( connection ) res.send(true)  
	else             res.send(false) 
	})

app.get('/reload', function (req, res) 		
	{
	console.log("reload")
	exeCute("sudo systemctl restart pilote.service")
	})

app.get('/remote', function (req, res)
	{
	console.log("remote "+req.query.value)
	switch(req.query.value)
		{
		case 'service'  :	exeCute("sudo systemctl restart pilote.service")
							break

		case 'shutdown' :	exeCute("sudo shutdown now")
							break

		case 'reboot'   :	exeCute("sudo reboot")
							break

		case 'desktop' :	exeCute("rm /home/pi/.xinitrc ; sudo reboot")
							break
		}
	res.send(true)
	})

app.get('/capGet', function (req, res) 
	{
	console.log("capGet")
	get_data_from_pilote( CAP, res )
	})

app.get('/dataGet', function (req, res) 
	{
	get_data_from_pilote( DATA, res )
	})
				
app.get('/pidGet', function (req, res) 		
	{
	console.log("pidGet")
	get_data_from_pilote( PID, res )
	})

app.get('/capteurGet', function (req, res) 
	{
	get_data_from_pilote( CAPTEUR, res )
	})
				
app.get('/calibrationGet', function (req, res)
	{
	console.log("calibrationGet")
	get_data_from_pilote( CALIBRATION, res )
	})
				
app.get('/commande', function (req, res) 
	{
	console.log("commande : "+req.query.value)
	send_commande_to_pilote( req.query.value, res )
	})	

app.get('/magnetoSave', function (req, res) 
	{
	if(connection)
		{
		const buf = Buffer.allocUnsafe(12)
        buf.writeFloatBE(req.query.xo, 0)
        buf.writeFloatBE(req.query.yo, 4)
        buf.writeFloatBE(req.query.zo, 8)
					
		characteristicPilote[CALIBRATION].write(buf, false, function(error)
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
		}
	else
		{
		res.send(false)
		}	
	})		

app.get('/',               function (req, res) { res.render("pages/cap",    {titre:"Auto Pilote"})    })
app.get('/gyroscope',      function (req, res) { res.render("pages/gyro",   {titre:"Gyroscope"})      })
app.get('/accelerometre',  function (req, res) { res.render("pages/accel",  {titre:"Accéléromètre"})  })
app.get('/asservissement', function (req, res) { res.render("pages/pid",    {titre:"Asservissement"}) })
app.get('/magnetometre',   function (req, res) { res.render("pages/magneto",{titre:"Magnetomètre"})   })
app.get('/power',          function (req, res) { res.render("pages/power",  {titre:"Power"})          })
						
var server = app.listen(8081, function () 
	{  
    console.log("connetez vous à http://localhost:%s", server.address().port)
	})

function get_data_from_pilote( item, res )
	{
	if(connection)
		{
		characteristicPilote[item].read( function(error,data) 
			{ 
			if(!error)
				{
				const buf = Buffer.from(data);
				var length = buf.length/4
				var array = []
				for( var i=0; i<length; i++)
					{
					var j= i*4;
					array[i] = buf.readFloatBE(j )
					}
				res.end(JSON.stringify(	array ))
				}
			else
				{
				console.log(error)
				res.send(false)
				}				
			});
		}
	else
		{
		res.send(false)
		}			
	}

function send_commande_to_pilote( cmd, res )
	{
	if(connection)
		{
		characteristicPilote[COMMANDE].write(new Buffer(cmd), false, function(error)
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
		}
	else
		{
		res.send(false)
		}
	}
	
//***************** Noble ***********************************************

const SERVICE_UUID     = 'ff10'
const CAP_UUID         = 'ff17'
const DATA_UUID        = 'ff18'
const PID_UUID         = 'ff19'
const CAPTEUR_UUID     = 'ff20'
const CALIBRATION_UUID = 'ff21'
const COMMANDE_UUID    = 'ff22'
const CAP              = 0
const DATA             = 1
const PID              = 2
const CAPTEUR          = 3
const CALIBRATION      = 4
const COMMANDE         = 5

var noble = require('noble');

var connection = false

//************** Start Scanning

function initBluetooth()
	{
	noble.on('stateChange',
	function(state)
		{
		console.log("state Change")
		if( state === 'poweredOn')
			{
			console.log("start scanning")
			noble.startScanning([SERVICE_UUID],false)
			}
		else
			{
			console.log("stop scanning")
			noble.stopScanning()
			}
		});

	}

setInterval( initBluetooth, 5000 )

//************* On Discover ****************************************

noble.on('discover',function(peripheral)
		{
		console.log("Discover");
		noble.stopScanning();
					
		peripheral.once('disconnect', function() 
			{
			console.log('Deconnection');
			connection = false
			exeCute("sudo systemctl restart pilote.service")
			//noble.startScanning([SERVICE_UUID],false);
			});

		peripheral.connect( function() 
			{
			console.log('Connection');
			
			peripheral.discoverSomeServicesAndCharacteristics(
				[SERVICE_UUID], 	
				[CAP_UUID,DATA_UUID,PID_UUID,CAPTEUR_UUID,CALIBRATION_UUID,COMMANDE_UUID], 
				function(error, services, characteristics) 
					{
					console.log('Services decouvert')
					connection = true 
				    characteristicPilote = characteristics
					})
			})	
		});

