var express = require('express');
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));


app.get("/", function (req,res) {
   res.render("main")

});


app.listen(3000, function () {
    console.log("Server Started");
});