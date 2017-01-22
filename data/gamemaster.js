/* this code needs to run on the "admin" computer */

var trusteds = {};
var names = {};
var points = {};
var connections = [];

var currentCorrectAnswer = 0;
var currentQuestion = 1;

var path = require("path");
var fs = require('fs');

fs.readFile(path.join(__dirname, 'tests/3.json'),'utf-8',function(err,data) {
    console.log(err);
    beginGame(data);
});

var splits = [];
var jsons;

function beginGame(json) {
    json = JSON.parse(json);
    console.log(json);
    jsons = [];
    for(line in json) {
        jsons.push(json[line]);
    }
    for(js in jsons) {
        splits.push(splitJSONIntoPrevPost(jsons[js]));
    }
    console.log(jsons);
}

function initWebSocketAdmin(id) {
    var WebSocketServer = require('websocket').server;
    var http = require('http');

    var server = http.createServer(function(request, response) {
        // process HTTP request. Since we're writing just WebSockets server
        // we don't have to implement anything.
    });

    server.listen(1337, function() {console.log("Listening!")});

    // create the server
    wsServer = new WebSocketServer({
        httpServer: server
    });

    // WebSocket server
    wsServer.on('request', function(request) {
        console.log("requested connection from " + request.origin);
        var connection = request.accept(null, request.origin);
        
        var name = false;

        // This is the most important callback for us, we'll handle
        // all messages from users here.
        connection.on('message', function(message) {  /* This is in setup mode where it accepts participants.*/ 
            if (message.type === 'utf8') {
                if(!trusteds[connection] && message.utf8Data == id) {
                    console.log("Connection is now trusted!");
                    trusteds[connection] = true;
                    points[connection] = 0;
                    connections.push(connection);
                    connection.sendUTF(JSON.stringify({"name" : "What's your name?"}));
                    trusted = true;
                } else if(trusteds[connection] && !names[connection]) { //trusted but no name. The first message from an accepted websocket must be their name.
            
                  names[connection] =  message.utf8Data;
                  console.log(names);
                  sendDataToConnections({});
                    
                } else if (!trusteds[connection]) {
                    
                    console.log("This connection is untrusted :("); 
                    connection.close();
                    
                } else if(message.utf8Data === "NEXT") {
                    sendDataToConnections(splits[currentQuestion - 1]["pre"]);
                    currentCorrectAnswer = jsons[currentQuestion - 1]["answer"];
                    currentQuestion++;
                    if(currentQuestion-1 >= splits.length) {sendDataToConnections({"THEGAME":"ISOVER"}); currentQuestion--;}
                    console.log("nexted");
                } else {
                    console.log("The given answer " + message.utf8Data);
                    console.log(currentCorrectAnswer);
                    if(message.utf8Data == currentCorrectAnswer) {
                        points[connection]++;
                        connection.send(JSON.stringify({"POINTS" : points[connection]}));
                        //console.log(points[connection]);
                    }
                }
            }
        });

        connection.on('close', function(connection) {
            trusted[connection] = false;
            name[connection] = ""; 
            points[connection] = 0; //data about the connection only persists for the connection.
        });
    });

    return wsServer;
}


var mywss = initWebSocketAdmin(10);

function splitJSONIntoPrevPost(json) {
    var prepost = {};
    var preobj = {}, postobj = {};
    preobj["question"] = json["question"];
    preobj["choices"] = json["choices"];

    postobj["answer"] = json["answer"];
    postobj["explanations"] = json["explanations"];
    
    prepost["pre"]  = preobj;
    prepost["post"] = postobj;
    return prepost;
}

function sendDataToConnections(questionJSON) {
    mywss.broadcastUTF(JSON.stringify(questionJSON));
}
