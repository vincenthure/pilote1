

document.getElementById("eteindre").addEventListener(  "click", function()    { commande("shutdown") })
document.getElementById("redemarrer").addEventListener("click", function()    { commande("reboot")   })
document.getElementById("reload").addEventListener("click", function()        { remote("service")    })
document.getElementById("remote_off").addEventListener("click", function()    { remote("shutdown")   })
document.getElementById("remote_reboot").addEventListener("click", function() { remote("reboot")     })
document.getElementById("terminal").addEventListener("click", function()      { remote("terminal")   })

function remote(str)
    {
    $.get( URL+"remote",
            { value : str })
    console.log("server "+str)
    }


