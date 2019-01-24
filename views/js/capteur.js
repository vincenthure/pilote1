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

                document.getElementById( "ax"  ).innerHTML  = data[0].toFixed(2) 
                document.getElementById( "ay"  ).innerHTML  = data[1].toFixed(2) 
                document.getElementById( "az"  ).innerHTML  = data[2].toFixed(2)
                document.getElementById( "mx"  ).innerHTML  = data[3].toFixed(0) 
                document.getElementById( "my"  ).innerHTML  = data[4].toFixed(0) 
                document.getElementById( "mz"  ).innerHTML  = data[5].toFixed(0)      
                document.getElementById( "gx"  ).innerHTML  = data[6].toFixed(2) 
                document.getElementById( "gy"  ).innerHTML  = data[7].toFixed(2) 
                document.getElementById( "gz"  ).innerHTML  = data[8].toFixed(2)              
                }
            )
   }
