

document.getElementById("eteindre").addEventListener(  "click", function()  { power_off() })
document.getElementById("redemarrer").addEventListener("click", function()  { reboot()    })



function power_off()
    {
    $.get   ( 
            URL+"commande",
            { value : "shutdown" }
            ) 
    }

function reboot()
    {
    $.get   ( 
            URL+"commande",
            { value : "reboot" }
            ) 
    }

