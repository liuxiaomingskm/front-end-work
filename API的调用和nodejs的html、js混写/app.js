var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function(req, res){
	res.render("home");
	// res.send("<h1>Welcome to the h1 home page!</h1><h2>This is only a test!</h2>");
});

app.get("/fallinlovewith/:thing", function(req,res){
	var thing = req.params.thing;
	res.render("love", {thingVar : thing});
});

app.get("/speak/:animal", function(req, res){
	var animal = req.params.animal;
	var sounds = {
		pig:"Oick",
		cow:"Mow",
		dog:"Wolf Wolf!",
		cat:"I hate you! Man!",
		goldfish:"..."
	};
	var sound = sounds[animal];
	res.send("The " + animal + " says " + sound);
});

app.get("/repeat/:word/:num", function(req, res){
	var word = req.params.word;
	var num = req.params.num;
	var str = "";
	for (var i = 0; i < Number(num); i++){
		str = str + word + " ";
	}
	res.send(str);
});

app.get("/posts", function(req, res){
	
	var posts = [{title:"Post 1",author:"Susy"},
				 {title:"My adorable pet bunny",author:"Charlie"},
				 {title:"Can you believe this pomsky?",author:"Colt"}
				];
	res.render("posts",{posts: posts});
	
		
});

app.get("*", function(req, res){
	res.send("Sorry, page not found... What are you doing with your life?");
});






app.listen(3000,() =>{
	console.log("Server is listening on 3000");
})