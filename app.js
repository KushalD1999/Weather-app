var express = require('express');
var app = express();
var request = require("request-promise");
var bodyParser = require("body-Parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/weather_app", { useNewUrlParser: true });

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

var citySchema = new mongoose.Schema({
    name: String
});

var city = mongoose.model("City", citySchema);
//
// city.create({name: "Toronto"});
// city.create({name: "Las Vegas"});
// city.create({name: "Sydney"});

async function weatherData (cities){
    var ret_data = []
    for(var cityObject of cities){
        var city = cityObject.name;
        var url = await request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=271d1234d3f497eed5b1d80a07b3fcd1`);
        var data = JSON.parse(url);
        var weather_data = {
            city : data.name,
            temperature : Math.round(data.main.temp),
            feels_like : Math.round(data.main.feels_like),
            description: data.weather[0].main,
            icon : data.weather[0].icon
        };
        ret_data.push(weather_data);
    }
    return ret_data;
}


// var city = "Toronto";
// var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=271d1234d3f497eed5b1d80a07b3fcd1`;

app.get("/", function (req,res) {
        city.find({}, function (err, cities) {
            if(err){
                console.log(err);
            }else{
                weatherData(cities).then(function (results) {
                    res.render("main", {data:results})
                });
            }

        });
    });


app.listen(3000, function () {
    console.log("Server Started");
});