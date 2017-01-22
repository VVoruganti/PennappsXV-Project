
window.WebSocket = window.WebSocket || window.MozWebSocket;

var id = 10;
var name = "bob";
var connection = new WebSocket('ws://127.0.0.1:1337');

connection.onopen = function () {
    connection.send(id); 
    console.log("opened");
};

function sendNext() {
    connection.send("NEXT");
}
