/*$('#myForm').ajaxForm({
        url : '/handleCSV', // or whatever
        dataType : 'text',
        success : function (response) {
            alert("The server says: " + response);
        }
    })
;*/


var choicemap = {
    "A" : "1",
    "a" : "1",
    "1" : "1",
    "B" : "2",
    "b" : "2",
    "2" : "2",
    "C" : "3",
    "c" : "3",
    "3" : "3",
    "D" : "4",
    "d" : "4",
    "4" : "4",
};

var frqmap = {
    "true" : "true",
    "yes" : "true",
    "True" : "true",
    "Yes" : "true"
};

function process(data) {
    var allTextLines = data.split(/\r\n|\n/); //credit so
    var quizObj=[];
    for(line in allTextLines) {
        var question = {};
        var entries = allTextLines[line].split(",");
        console.log(entries[0]);
        if(entries[0] === "Question") continue; //They're using the template in this case.
        else {
            if(!entries[0] || !entries[1] || !entries[2] || !entries[3] || !entries[4] || !entries[5]) {continue;} //broken data
            question["question"] = entries[0]; 
            var choices = [entries[1], entries[2], entries[3], entries[4]];
            question["choices"] = choices;
            if(choicemap[entries[5]])
                question["answer"] = choicemap[entries[5]];
            else continue;
            var explanations = [];
            for(var i = 6; i < 10; i++) {
                if(entries[i]) explanations.push(entries[i])
            }
            if(explanations) question["explanations"] = explanations;
            question["frq"] = frqmap[entries[10]];
            quizObj.push(question);
        }
    }
    console.log(quizObj);
}