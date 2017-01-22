$(function () {
    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    var id = 10;
    var name = "bob";
    var connection = new WebSocket('ws://127.0.0.1:1337');

    
    connection.onopen = function () {
        connection.send(id); 
    };

    connection.onerror = function (error) {
        // an error occurred when sending/receiving data
    };

    connection.onmessage = function (message) {
        if(message.data = "name") {connection.send(name);}
        try{ 
            jsonObj = JSON.parse(message.data); //we now have the question (theoretically)
            showQuestionFromJSON(jsonObj);
        } catch(e) {}
    };
    
    connection.onclose = function () {
        console.log("the connection was closed :(");
    }
    
    
    function showQuestionFromJSON(json) {
        question = json["question"];
        choices = json["choices"];
        answer = json["answer"];
        
        //do stuff to the layout here.
    }
});

