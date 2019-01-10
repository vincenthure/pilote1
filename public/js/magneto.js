
window.onload = function(e)
    {
    document.getElementById( "mxm" ).innerHTML  = 4
    document.getElementById( "mym" ).innerHTML  = 5
    document.getElementById( "mzm" ).innerHTML  = 6
    $.get   (
            "http://localhost:8081/calibration",
            function(json_data)
                {
                data= JSON.parse(json_data)

                document.getElementById( "mxo"  ).innerHTML  = data[3] 
                document.getElementById( "myo"  ).innerHTML  = data[4]
                document.getElementById( "mzo"  ).innerHTML  = data[5]  
                }
            )
                            
    setInterval(function()
        {
        $.get   (
                "http://localhost:8081/capteur",
                function(json_data)
                    {
                    data= JSON.parse(json_data)
                    document.getElementById( "mx"  ).innerHTML  = data[3]
                    document.getElementById( "my"  ).innerHTML  = data[4]
                    document.getElementById( "mz"  ).innerHTML  = data[5]              
                    }
                )
        },200)
    }
    
document.getElementById("save").addEventListener("click", function()  { $.get("http://localhost:8081/calibration", { value:"magneto" }) })

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, );
  });
