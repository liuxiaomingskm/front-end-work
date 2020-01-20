var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment =  require("./models/comment");

var data = [
	{name:"Clouds Rest", 
	 image:"https://pixabay.com/get/55e0d54b4d55a514f6da8c7dda793f7f1636dfe2564c704c72277edc944ec35f_340.jpg",
	description:"Hooray! It's snowing! It's time to make a snowman.James runs out. He makes a big pile of snow. He puts a big snowball on top. He adds a scarf and a hat. He adds an orange for the nose. He adds coal for the eyes and buttons.In the evening, James opens the door. What does he see? The snowman is moving! James invites him in. The snowman has never been inside a house. He says hello to the cat. He plays with paper towels.A moment later, the snowman takes James's hand and goes out.They go up, up, up into the air! They are flying! What a wonderful night!The next morning, James jumps out of bed. He runs to the door.He wants to thank the snowman. But he's gone."},
	
	{
		name:"Dessert", 
	 image:"https://pixabay.com/get/54e7d4424855a514f6da8c7dda793f7f1636dfe2564c704c72277edc974ccd5e_340.jpg",
	description:"Hooray! It's snowing! It's time to make a snowman.James runs out. He makes a big pile of snow. He puts a big snowball on top. He adds a scarf and a hat. He adds an orange for the nose. He adds coal for the eyes and buttons.In the evening, James opens the door. What does he see? The snowman is moving! James invites him in. The snowman has never been inside a house. He says hello to the cat. He plays with paper towels.A moment later, the snowman takes James's hand and goes out.They go up, up, up into the air! They are flying! What a wonderful night!The next morning, James jumps out of bed. He runs to the door.He wants to thank the snowman. But he's gone."
	},
	{
		name:"human tree", 
	 image:"https://pixabay.com/get/52e2d0424c56b108f5d084609620367d1c3ed9e04e50744e7d2979d09245c5_340.jpg",
	description:"Hooray! It's snowing! It's time to make a snowman.James runs out. He makes a big pile of snow. He puts a big snowball on top. He adds a scarf and a hat. He adds an orange for the nose. He adds coal for the eyes and buttons.In the evening, James opens the door. What does he see? The snowman is moving! James invites him in. The snowman has never been inside a house. He says hello to the cat. He plays with paper towels.A moment later, the snowman takes James's hand and goes out.They go up, up, up into the air! They are flying! What a wonderful night!The next morning, James jumps out of bed. He runs to the door.He wants to thank the snowman. But he's gone."
	}
	
]

function seedDB(){

Campground.remove({}, function(err){
	
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