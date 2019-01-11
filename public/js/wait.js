
setInterval(function()
    {
    $.get(  "http://localhost:8081/connected", function(data)  
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
