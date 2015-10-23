var express = require("express");
var app = express();
var Hashids = require("hashids");
hashids = new Hashids("this is my salt");
var ejsLayouts = require("express-ejs-layouts");
var db = require('./models');
app.use(ejsLayouts);
app.set("view engine", "ejs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

app.use("/", express.static(__dirname +"/static/"));

app.get("/", function(req, res){
	res.render("index");
});

app.get("/links", function(req, res){
	res.render("links");
});
app.post("/", function(req, res){
	var urlName= req.body.new_url;
	db.links.findOrCreate({
		where: {url:urlName}
	}).then(function(data) {
	var id = data[0].id;
	console.log('**********',data)
	var hashId = hashids.encode(id);
	data[0].updateAttributes({hash:hashId}).then(function(){
	 		res.redirect("/links/"+id);
	 	});
	});
});


app.get("/links/:id", function(req, res){
	var id = req.params.id;
	db.links.findById(id).then(function(data) {	
		res.render("links", {data:data});
	});
});

app.get("/:hash", function(req,res){
	console.log('****HASH',req.params.hash)
	var id = hashids.decode(req.params.hash);
	id = id[0];
	console.log("ID",id)
	db.links.findById(id).then(function(data){
		console.log('***',data.dataAttributes);
		var count = data.count;
		count++;
		data.updateAttributes({count: count}).then(function(data){
			res.redirect('http://'+data.url);	
		});
	});
});



app.listen(3000);