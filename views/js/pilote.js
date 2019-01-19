const URL   = document.location.origin+'/'

setInterval(function()
    {
    $.get(  URL+"connected", function(data)  
        { 
        if(!data)    document.getElementById( "connexion"  ).innerHTML  = "Connexion interrompue"
        else         document.getElementById( "connexion"  ).innerHTML  = ""
        } )
    },1000)
    
function commande(str)
    {
    $.get   ( 
            URL+"commande",
            { value : str }
            ) 
    }

document.addEventListener('DOMContentLoaded', function() 
    {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems);
    });
