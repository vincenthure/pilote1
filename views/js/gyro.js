window.onload = function(e)
    {
    get_calibration_gyro()
    setInterval(function() { get_capteur_gyro() },200)  
    }
    
document.getElementById("save").addEventListener("click", function()  { save_calibration_gyro() })

function get_calibration_gyro()
    {
     $.get   (
            URL+"calibrationGet",
            function(json_data)
                {
                data= JSON.parse(json_data)

                document.getElementById( "xo"  ).innerHTML  = data[0]
                document.getElementById( "yo"  ).innerHTML  = data[1]
                document.getElementById( "zo"  ).innerHTML  = data[2]        
                }
            )
    }
    
function save_calibration_gyro()
    {
    $.get(  URL+"commande", 
            { value:"gyroSave" },
            function(jsondata)  { 
                                get_calibration_gyro() 
                                console.log("get gyro") 
                                }
                                )
    }
    
function get_capteur_gyro()
    {
    $.get   (
            URL+"capteurGet",
            function(json_data)
                {
                data= JSON.parse(json_data)

                document.getElementById( "x"  ).innerHTML  = data[6].toFixed(2) 
                document.getElementById( "y"  ).innerHTML  = data[7].toFixed(2) 
                document.getElementById( "z"  ).innerHTML  = data[8].toFixed(2)              
                }
            )
   }
