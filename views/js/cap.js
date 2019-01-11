window.onload = function(e){ get_cap() }

document.getElementById("cap_m10").addEventListener("click", function()  { change_cap( -10 ) })
document.getElementById("cap_m1" ).addEventListener("click", function()  { change_cap(  -1 ) })
document.getElementById("cap_set").addEventListener("click", function()  { change_cap(   0 ) })
document.getElementById("cap_p1" ).addEventListener("click", function()  { change_cap(  +1 ) })
document.getElementById("cap_p10").addEventListener("click", function()  { change_cap( +10 ) })
    
function change_cap(x)
    {
    $.get(  "http://localhost:8081/cap", 
            { value:x },
            function(data) { document.getElementById("cap").innerHTML = Math.round(data).toString() });
    }

function get_cap()
    {
    $.get(  "http://localhost:8081/cap", 
            function(data) { document.getElementById("cap").innerHTML = Math.round(data).toString() });
    }
