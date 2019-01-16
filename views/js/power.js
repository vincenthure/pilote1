

document.getElementById("eteindre").addEventListener(  "click", function()  { commande("shutdown") })
document.getElementById("redemarrer").addEventListener("click", function()  { commande("reboot")    })
document.getElementById("reload").addEventListener("click", function()      { reload()    })

function reload()
    {
    $.get( URL+"reload" )
    console.log("reload")
    }

