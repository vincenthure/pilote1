setInterval(function()
    {
    $.get(  "http://localhost:8081/connected", function(data)  
        { 
        if(!data)    
            {
            console.log("deconnection")
            window.open("/",'_self')
            }
        } )
    },1000)
