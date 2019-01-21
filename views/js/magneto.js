var xmin=0,
    ymin=0,
    zmin=0,
    xmax=0,
    ymax=0,
    zmax=0,
    xo,
    yo,
    zo;
        
window.onload = function(e)
    {
    document.getElementById( "mxm" ).innerHTML  = 4
    document.getElementById( "mym" ).innerHTML  = 5
    document.getElementById( "mzm" ).innerHTML  = 6
    
    get_calibration_magneto()

                            
    setInterval(function()
        {
        get_capteur_magneto()
        }
        ,200)
    }
    
document.getElementById("save").addEventListener("click", function()  { save_calibration_magneto() })

function get_calibration_magneto()
    {
     $.get   (
            URL+"calibrationGet",
            function(json_data)
                {
                data= JSON.parse(json_data)

                document.getElementById( "mxo"  ).innerHTML  = data[3]
                document.getElementById( "myo"  ).innerHTML  = data[5]
                document.getElementById( "mzo"  ).innerHTML  = data[5]        
                }
            )
    }
    
function save_calibration_magneto()
    {
    $.get(  URL+"magnetoSave", 
            { 
            xo:xo,
            yo:yo,
            zo,zo
            }),
            function() { get_calibration_magneto() }
    }
    
function get_capteur_magneto()
    {
    $.get   (
            URL+"capteurGet",
            function(json_data)
                {
                data= JSON.parse(json_data)

                document.getElementById( "mx"  ).innerHTML  = data[3]
                document.getElementById( "my"  ).innerHTML  = data[4]
                document.getElementById( "mz"  ).innerHTML  = data[5]
                xmin = Math.min(xmin, data[3])
                xmax = Math.max(xmax, data[3])             
                ymin = Math.min(ymin, data[4])
                ymax = Math.max(ymax, data[4])             
                zmin = Math.min(zmin, data[5])
                zmax = Math.max(zmax, data[5])
                xo = (xmin+xmax)/2 
                yo = (ymin+ymax)/2
                zo = (zmin+zmax)/2
                document.getElementById( "mxm"  ).innerHTML  = xo
                document.getElementById( "mym"  ).innerHTML  = yo
                document.getElementById( "mzm"  ).innerHTML  = zo            
                }
            )
   }
