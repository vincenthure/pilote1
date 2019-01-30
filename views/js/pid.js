window.onload = function(e) { get_pid() }

document.getElementById("kp-").addEventListener("click", function()  { set_pid("kp-") })
document.getElementById("kp+").addEventListener("click", function()  { set_pid("kp+") })
document.getElementById("ki-").addEventListener("click", function()  { set_pid("ki-") })
document.getElementById("ki+").addEventListener("click", function()  { set_pid("ki+") })
document.getElementById("kd-").addEventListener("click", function()  { set_pid("kd-") })
document.getElementById("kd+").addEventListener("click", function()  { set_pid("kd+") })

setInterval(function() { get_data() },100)
    
function get_pid()
    {
    $.get   (
            URL+"pidGet",
            function(json_data)
                {
                data= JSON.parse(json_data)
                document.getElementById( "kp" ).innerHTML  = data[0]
                document.getElementById( "ki" ).innerHTML  = data[1]
                document.getElementById( "kd" ).innerHTML  = data[2]             
                }
            )       
    }
    
function set_pid( value )
    {
    $.get   (  
            URL+"commande",
            { value : value },
            function(json_data) {   get_pid() }
            ) 
    }

function slider(input,output)
    {
    const style = "' height='10' rx='5' fill='#42a5f5' />"
    
    input *= 10;
    x1 = (input<0) ? (220+input) : 220
    input = Math.abs(input)
 
    output *= 120
    x2 = (output<0) ? (220+output) : 220
    output = Math.abs(output)

    var svg = "<svg width='440' height='35'>"
        svg += "<rect x='"+x1+"' y='05' width='"+input+style
        svg += "<rect x='"+x2+"' y='25' width='"+output+style
        svg += "</svg>"
    document.getElementById("rectangle1").innerHTML  = svg
    }

function get_data()
    {
    $.get(  URL+"dataGet", 
            function(data) {
                            x = JSON.parse(data);
                            slider( x[0],x[1]*1.6 ) 
                            });
    }

