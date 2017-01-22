/* $(function () {
    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    var id = 10;
    var name = "bob";
    var connection = new WebSocket('ws://127.0.0.1:1337');

    console.log(connection);
    connection.onopen = function () {
        connection.send(id); 
        console.log("opened");
    };

    connection.onerror = function (error) {
        // an error occurred when sending/receiving data
    };

    connection.onmessage = function (message) {
        console.log("wow " + message.data);
        try{ 
            jsonObj = JSON.parse(message.data); //we now have the question (theoretically)
            if(jsonObj["name"]) {connection.send(name); return;}
            else {setAttributes(jsonObj);}
            
        } catch(e) {console.log(e.toString());}
    };
    
    connection.onclose = function () {
        console.log("the connection was closed :(");
    }
    
    function submitMessage(choice) {
        connection.send(choice);
    }
}); */




