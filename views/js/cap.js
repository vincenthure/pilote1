window.onload = function(e){ get_cap() }

document.getElementById("-10").addEventListener("click", function()  { change_cap( 'cap--'  ) })
document.getElementById("-1" ).addEventListener("click", function()  { change_cap( 'cap-'   ) })
document.getElementById("set").addEventListener("click", function()  { change_cap( 'capset' ) })
document.getElementById("+1" ).addEventListener("click", function()  { change_cap( 'cap+'   ) })
document.getElementById("+10").addEventListener("click", function()  { change_cap( 'cap++'  ) })
    
function change_cap(x)
    {
    $.get(  URL+"commande", 
            { value:x },
            function(data) { get_cap() });
    }

function get_cap()
    {
    $.get(  URL+"capGet", 
            function(data) { document.getElementById("cap").innerHTML = Math.round(data).toString() });
    }
