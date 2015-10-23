var express = require("express");
var app = express();

var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);
app.set("view engine", "ejs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

app.use("/", express.static(__dirname +"/static/"));

app.get("/", function(req, res){
	res.render("index");
});

app.get("/short", function(req, res){
	res.render("short");
});


app.listen(3000);