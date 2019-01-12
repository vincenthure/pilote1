window.onload = function(e)
    {
    setInterval(function()
        {
        get_capteur_accel()
        }
        ,200)                   
    }
    
function get_capteur_accel()
    {
    $.get   (
            URL+"capteurGet",
            function(json_data)
                {
                data= JSON.parse(json_data)

                document.getElementById( "x"  ).innerHTML  = data[0].toFixed(2) 
                document.getElementById( "y"  ).innerHTML  = data[1].toFixed(2) 
                document.getElementById( "z"  ).innerHTML  = data[2].toFixed(2)              
                }
            )
   }
