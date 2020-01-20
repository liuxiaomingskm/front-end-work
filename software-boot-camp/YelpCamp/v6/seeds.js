var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment =  require("./models/comment");

var data = [
	{name:"Clouds Rest", 
	 image:"https://pixabay.com/get/57e8d34b4c50a814f6da8c7dda793f7f1636dfe2564c704c722778d79345c459_340.jpg",
	description:"Hooray! It's snowing! It's time to make a snowman.James runs out. He makes a big pile of snow. He puts a big snowball on top. He adds a scarf and a hat. He adds an orange for the nose. He adds coal for the eyes and buttons.In the evening, James opens the door. What does he see? The snowman is moving! James invites him in. The snowman has never been inside a house. He says hello to the cat. He plays with paper towels.A moment later, the snowman takes James's hand and goes out.They go up, up, up into the air! They are flying! What a wonderful night!The next morning, James jumps out of bed. He runs to the door.He wants to thank the snowman. But he's gone."},
	
	{
		name:"Dessert", 
	 image:"https://pixabay.com/get/52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c722778d79345c459_340.jpg",
	description:"Hooray! It's snowing! It's time to make a snowman.James runs out. He makes a big pile of snow. He puts a big snowball on top. He adds a scarf and a hat. He adds an orange for the nose. He adds coal for the eyes and buttons.In the evening, James opens the door. What does he see? The snowman is moving! James invites him in. The snowman has never been inside a house. He says hello to the cat. He plays with paper towels.A moment later, the snowman takes James's hand and goes out.They go up, up, up into the air! They are flying! What a wonderful night!The next morning, James jumps out of bed. He runs to the door.He wants to thank the snowman. But he's gone."
	},
	{
		name:"human tree", 
	 image:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744e7d2c78d09f4cc4_340.jpg",
	description:"Hooray! It's snowing! It's time to make a snowman.James runs out. He makes a big pile of snow. He puts a big snowball on top. He adds a scarf and a hat. He adds an orange for the nose. He adds coal for the eyes and buttons.In the evening, James opens the door. What does he see? The snowman is moving! James invites him in. The snowman has never been inside a house. He says hello to the cat. He plays with paper towels.A moment later, the snowman takes James's hand and goes out.They go up, up, up into the air! They are flying! What a wonderful night!The next morning, James jumps out of bed. He runs to the door.He wants to thank the snowman. But he's gone."
	}
	
]

function seedDB(){

Campground.remove({}, function(err){
	//remove all campgrounds
	if (err){
		console.log(err);
	} else {console.log("remove campgrounds!");
			// add a few comments
data.forEach(function(seed){
	Campground.create(seed, function(err, campground){
		if(err){
			console.log(err);
		} else {
			console.log("added a campground!");
			//create a comment
			Comment.create({
				text:"This place is great, but I wish there is an Internet",
				author:"Homer"}, function(err, comment){
										   if (err){
												console.log(err);
			} else {
						   campground.comments.push(comment);
							campground.save();
							console.log("Created a new comment");
									} 
										   });
		}
	});
});}
	
});
}


module.exports = seedDB;