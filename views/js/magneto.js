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
    
document.getElementById("save").addEventListener("click", function()  { set_calibration_magneto() })

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
    
function set_calibration_magneto()
    {
    $.get(  URL+"calibrationSet", 
            { value:"magneto" }),
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
                }
            )
   }
