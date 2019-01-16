const URL   = document.location.origin+'/'

setInterval(function()
    {
    $.get(  URL+"connected", function(data)  
        { 
        if(!data)    
            {
            console.log("deconnection")
            window.open("/",'_self')
            }
        } )
    },1000)
    
function commande(str)
    {
    $.get   ( 
            URL+"commande",
            { value : str }
            ) 
    }
