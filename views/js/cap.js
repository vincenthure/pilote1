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
            function(json_data) {
                            data= JSON.parse(json_data)
                            var str = Math.round(data[0]).toString()
                            if( str=='NaN' )
                                {
                                setTimeout(function(){ get_cap() }, 1000);
                                document.getElementById("cap").innerHTML = "non disponible"
                                }
                            else
                                {
                                document.getElementById("cap").innerHTML = str+'°'
                                }
                            })
    }
