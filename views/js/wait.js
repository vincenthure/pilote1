const URL   = "http://localhost:8081/"

setInterval(function()
    {
    $.get(  URL+"connected", function(data)  
        { 
        if(data)    
            {
            console.log("connection")
            window.open("/",'_self')
            }
        else{
            console.log("waiting")
            }
        } )
    },1000)
