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