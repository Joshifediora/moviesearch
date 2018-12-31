var express = require("express");
var app = express();
var request = require("request");


app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

app.get("/", function(req, res){
    res.render("search")
});

app.get("/result", function(req,res){
        var query= (req.query.searchitem);
        var url = "http://www.omdbapi.com/?s="+ query +"&apikey=thewdb"
        request(url, function(error, response, body){
        if(!error && response.statusCode ==200){
            var data = JSON.parse(body);
            //res.send(data["Search"][0]);
            res.render("results", {data: data});
        }
    })
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie server is up!!!")
})