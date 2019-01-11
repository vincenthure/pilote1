window.onload = function(e)
    {
    $.get   (
            "http://localhost:8081/calibration",
            function(json_data)
                {
                data= JSON.parse(json_data)

                document.getElementById( "xo"  ).innerHTML  = data[0]
                document.getElementById( "yo"  ).innerHTML  = data[1]
                document.getElementById( "zo"  ).innerHTML  = data[2]        
                }
            )
    
    setInterval(function()
        {
        $.get   (
                "http://localhost:8081/capteur",
                function(json_data)
                    {
                    data= JSON.parse(json_data)

                    document.getElementById( "x"  ).innerHTML  = data[6].toFixed(2) 
                    document.getElementById( "y"  ).innerHTML  = data[7].toFixed(2) 
                    document.getElementById( "z"  ).innerHTML  = data[8].toFixed(2)              
                    }
                )
        },200)  
    }
    
document.getElementById("save").addEventListener("click", function()  { $.get("http://localhost:8081/calibration", { value:"gyro" })})

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, );
  });

setInterval(function()
    {
    $.get(  "http://localhost:8081/connected", function(data)  
        { 
        if(!data)    
            {
            console.log("deconnection")
            window.open("/",'_self')
            }
        } )
    },1000)
