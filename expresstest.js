var express = require("express");
var app = express()
var bodyParser = require("body-parser")

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static('data'))


app.get("/hi", function(req, res) {
    if(req.query.wow)
        res.json({"query":req.query.wow});
    else 
        res.json({"Sorry" : "You need a wow parameter"})
})

app.listen(3000)
