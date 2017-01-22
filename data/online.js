$(document).ready(function() {


});

var question ;
var answers = [];
var userInput ;

function getData(data){

question = data.question;
answers = data.choices;
console.log(question);
console.log(answers);

}

function setAttributes(question,choices) {

  $(qtext).text(question);

  for(var i = 0; i < choices.length; i++) {

    $("#c" + i).text(choices[i]);

  }

  jQuery(function ($) {
      var fiveSeconds = 4;
          display = $('#time');
      startTimer(fiveSeconds, display);
  });

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
