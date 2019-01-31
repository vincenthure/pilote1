

document.getElementById("pilote_off").addEventListener(  "click", function()     { commande("shutdown") })
document.getElementById("pilote_reboot").addEventListener("click", function()    { commande("reboot")   })
document.getElementById("pilote_reload").addEventListener("click", function()    { commande("service")  })
document.getElementById("remote_off").addEventListener("click", function()       { remote("shutdown")   })
document.getElementById("remote_reboot").addEventListener("click", function()    { remote("reboot")     })
document.getElementById("remote_reload").addEventListener("click", function()    { remote("service")    })

function remote(str)
    {
    $.get( URL+"remote",
            { value : str })
    console.log("server "+str)
    }


