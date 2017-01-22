
    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;
     console.log("wow");

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
        console.log(message.data);
        try{
            jsonObj = JSON.parse(message.data); //we now have the question (theoretically)
            if(jsonObj["name"]) {connection.send(name); return;}
            if(jsonObj["POINTS"]) {alert("You now have " + jsonObj["POINTS"]) + " points!"; return;}
            else {setAttributes(jsonObj["question"], jsonObj["choices"]);}

        } catch(e) {console.log(e.toString());}
    };

    connection.onclose = function () {
        console.log("the connection was closed :(");
    }

    function submitMessage(choice) {
        connection.send(choice);
    }
     var question ;
var answers = [];
var userInput ;

console.log("wow");

function getData(data){

question = data.question;
answers = data.choices;
console.log(question);
console.log(answers);

}

function setAttributes(question,choices) {
    console.log("here");
  $(qtext).text(question);

  for(var i = 0; i <= choices.length; i++) {

    $("#c" + i).text(choices[i-1]);

  }

  jQuery(function ($) {
      var fiveSeconds = 9;
          display = $('#time');
      startTimer(fiveSeconds, display);
  });

  setTimeout(function() {submitMessage(userInput)}, 10000);
}

function clickAnswer(int,element) {

    userInput = int;

    $(this).addClass("selectedAnswer");

}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = 0;
        }
    }, 1000);
}
