//jshint esversion: 6


const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const port = 3005;

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.post("/", function(req, res){
  var userCoin = req.body.crypto;

  var userFiat = req.body.fiat;

  var userAmount =  req.body.amount;

  var baseURL = "https://apiv2.bitcoinaverage.com/convert/global";

  var options = {
    url: baseURL,
    method: "GET",
    qs: {
      from: userCoin,
      to: userFiat,
      amount: userAmount
    }
  };

  request(options, function(error, response, body){

    var data = JSON.parse(body);
    var price = data.price;
    var currentDate = data.time;
    console.log(price);

    res.write("<p>the current date is :" + currentDate + "</p><br>");
    res.write("<h1>the amount of " + userAmount+ " of " + userCoin + " is: " + price + " in " + userFiat + "</h1>");
    res.send();

  });

});

app.listen(port, () => console.log(`Example app is listening to ${port}!`));
