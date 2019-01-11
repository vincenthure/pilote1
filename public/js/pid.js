const style = "' height='20' rx='10' fill='#42a5f5' />"

window.onload = function(e)
    {
    $.get   (
            "http://localhost:8081/pid",
            function(json_data)
                {
                data= JSON.parse(json_data)
                document.getElementById( "kp" ).innerHTML  = data[0]
                document.getElementById( "ki" ).innerHTML  = data[1]
                document.getElementById( "kd" ).innerHTML  = data[2]             
                }
            )
    }

document.getElementById("save").addEventListener("click", function()  { $.get("http://localhost:8081/pid",{ value:"pidSave" }) })

document.getElementById("kp-").addEventListener("click", function()  { k_change("kp-") })
document.getElementById("kp+").addEventListener("click", function()  { k_change("kp+") })
document.getElementById("ki-").addEventListener("click", function()  { k_change("ki-") })
document.getElementById("ki+").addEventListener("click", function()  { k_change("ki+") })
document.getElementById("kd-").addEventListener("click", function()  { k_change("kd-") })
document.getElementById("kd+").addEventListener("click", function()  { k_change("kd+") })

setInterval(function()
    {
    get_data()
    },100)
    
function k_change( x )
    {
    $.get   (  
            "http://localhost:8081/pid",
            { value:x },
            function(json_data)
                {
                data= JSON.parse(json_data)
                document.getElementById( "kp" ).innerHTML  = data[0]
                document.getElementById( "ki" ).innerHTML  = data[1]
                document.getElementById( "kd" ).innerHTML  = data[2] 
                }
            ) 
    }

function slider(input,output)
    {
    input *= 10;
    x1 = (input<0) ? (160+input) : 160
    input = Math.abs(input)
 
    x2 = (output<0) ? (160+output) : 160
    output = Math.abs(output)

    var svg = "<svg width='330' height='60'>"
        svg += "<rect x='"+x1+"' y='05' width='"+input+style
        svg += "<rect x='"+x2+"' y='35' width='"+output+style
        svg += "</svg>"
    document.getElementById("rectangle1").innerHTML  = svg
    }

function get_data()
    {
    $.get(  "http://localhost:8081/data", 
            function(data) {
                            x = JSON.parse(data);
                            slider( x[0],x[1]*1.6 ) 
                            });
    }

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
