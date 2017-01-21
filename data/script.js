<<<<<<< HEAD
=======
function startOfflineGame(json) {
    for(line in json) {
        jsonObj = (json[line]);
        question = jsonObj["question"];
        choices = jsonObj["choices"];
        showQuestion(question, choices);
        waitForResponse();
    }
}

function showQuestion(question, choices) {
    
}
>>>>>>> 200e7d6e0c15c6597864417a814688c5f6391b70
