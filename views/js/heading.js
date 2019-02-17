setInterval(function() { get_data() },100)    

function get_data()
    {
    $.get(  URL+"dataGet", 
            function(data) {
                            x = JSON.parse(data);
                            document.getElementById("heading").innerHTML = Math.round(x[2])+"°"
                            });
    }
