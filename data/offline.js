function loadFile() {
      var input, file, fr;

      if (typeof window.FileReader !== 'function') {
          bodyAppend("p", "The file API isn't supported on this browser yet.");
          return;
      }

      input = document.getElementById('fileinput');
      if (!input) {
          bodyAppend("p", "Um, couldn't find the fileinput element.");
      }
      else if (!input.files) {
          bodyAppend("p", "This browser doesn't seem to support the `files` property of file inputs.");
      }
      else if (!input.files[0]) {
          bodyAppend("p", "Please select a file before clicking 'Load'");
      }
      else {
          file = input.files[0];
          fr = new FileReader();
          fr.onload = receivedText;
          fr.readAsText(file);
      }

      function receivedText() {
          showResult(fr, "Text");

          fr = new FileReader();
        }
        /*  fr.onload = receivedBinary;
          fr.readAsBinaryString(file);
      }

      function receivedBinary() {
          showResult(fr, "Binary");
      } */
  }

  function showResult(fr, label) {
      var markup, result, n, aByte, byteStr;

      markup = [];
      result = fr.result;
      startOfflineGame(fr.result);
      console.log(result);
  }

/*  function bodyAppend(tagName, innerHTML) {
      var elm;

      elm = document.createElement(tagName);
      elm.innerHTML = innerHTML;
      document.body.appendChild(elm);
  } */

  var questions, choices, answers, explanations;

  var playerAnswer = 0;
  var userScore = 0;

  function startOfflineGame(json) {
    json = JSON.parse(json);
    questions = [], choices = [], answers = [], explanations = [];
      for(line in json) {
          jsonObj = (json[line]);
          question = jsonObj["question"];
          choice = jsonObj["choices"];
          answer = jsonObj["answer"];
          explanation = jsonObj["explanations"];

          questions.push(question);
          choices.push(choice);
          answers.push(answer);
          explanations.push(explanation);
    }

    showQuestion(0);

}

function showAnswers(question) {
  $("#next").attr("onclick","showQuestion(" +  question+1 + ")")
  console.log("butts");

  var aNum = answers[question];

  var aelement = "#c"+ aNum;


  setTimeout(function() {console.log($("#c4").hasClass("correct"))},2000);
  //setTimeout(function() {showQuestion(question+1)}, 5000);

$(".tt").removeClass("visibility");

  if (playerAnswer == aNum) {
    $(aelement).removeClass("selectedAnswer").addClass("correct");
    userScore++;
    $("#score").text(userScore.toString());
  }
  else {
    $(".selectedAnswer").addClass("incorrect").remove("selectedAnswer");
    $(aelement).addClass("correct");
  }



  playerAnswer = 0;

    console.log(userScore.toString());
}

function clickAnswer(answer, element) {

  $(element).addClass("selectedAnswer");
  if(playerAnswer == 0) {

    playerAnswer = answer;

  }
}


function showQuestion(question) {

   if(question >= choices.length) {console.log("Done!");return};
    $(".offline-gameplay-card").addClass("visibility");
    $(".questions").removeClass("visibility");
    $("#qNum").text(question + 1);
    $("#qtext").text(questions[question]);
    $(".correct").removeClass("correct");
    $(".selectedAnswer").removeClass("selectedAnswer");
    $(".incorrect").removeClass("incorrect");
    $(".tt").addClass("visibility");


    for(var i = 1; i < 5; i++) {
        $("#c" + i).text((choices[question])[i-1]);
        $("#tt" + i).text((explanations[question])[i-1]);
    }

    jQuery(function ($) {
        var fiveSeconds = 4;
            display = $('#time');
        startTimer(fiveSeconds, display);
    });

    setTimeout(function() {showAnswers(question)}, 5000);
  }

  function waitForResponse() {

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
