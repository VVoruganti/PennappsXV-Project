var express = require("express");
var app = express()
var bodyParser = require("body-parser")

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var user = "lucar";

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
    var allTextLines = data.split(/\r\n|\n/);
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
    var outText = JSON.stringify(quizObj);
    var newnum =parseInt(fs.readFileSync('C://Users/' + user + '/Desktop/PennApps2017w/data/next.txt.txt', 'utf-8'));
    console.log("new num " + newnum)
    fs.writeFile('C://Users/' + user + '/Desktop/PennApps2017w/data/next.txt.txt', newnum+1, function(err){});
    fs.writeFile("C://Users/' + user + '/Desktop/PennApps2017w/data/tests/" + newnum + ".json", outText, function(err) { //TODO make this write to distinct files every time and return the id.
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    }); 

    return newnum;
}

var busboy = require("connect-busboy");
app.use(busboy());
var fs = require('fs');


app.post("/csv", function(req, res) {
    console.log("request received!");
   // console.log(req.body);
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);

        fstream = fs.createWriteStream('C://Users/' + user + '/Desktop/PennApps2017w/data/tests/temp.csv');
                console.log(file.read());
        file.pipe(fstream);
        fstream.on('close', function () {    
            console.log("Upload Finished of " + filename);             
            fs.readFile('C://Users/' + user + '/Desktop/PennApps2017w/data/tests/temp.csv','utf-8',function(err,data) {
                var id = process(data);
                res.status(200);
                res.json({"response" :"successfully received data, your id for future use is " + id});

            });
        });
    });

})

app.use(express.static('data'))

app.listen(3000)

