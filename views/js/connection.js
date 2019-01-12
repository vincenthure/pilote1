const URL   = "http://localhost:8081/"

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
