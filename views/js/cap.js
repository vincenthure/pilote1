window.onload = function(e){ get_cap() }

document.getElementById("-10").addEventListener("click", function()  { change_cap( -10 ) })
document.getElementById("-1" ).addEventListener("click", function()  { change_cap(  -1 ) })
document.getElementById("set").addEventListener("click", function()  { change_cap(   0 ) })
document.getElementById("+1" ).addEventListener("click", function()  { change_cap(  +1 ) })
document.getElementById("+10").addEventListener("click", function()  { change_cap( +10 ) })
    
function change_cap(x)
    {
    $.get(  URL+"capSet", 
            { value:x },
            function(data) { get_cap() });
    }

function get_cap()
    {
    $.get(  URL+"capGet", 
            function(data) { document.getElementById("cap").innerHTML = Math.round(data).toString() });
    }
