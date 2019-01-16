const URL   = document.location.origin+'/'

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
