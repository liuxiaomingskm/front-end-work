

var express = require("express");
var router = express.Router({mergeParams:true});//这里merge的目的是因为在app.js里面 campgrounds/:id已经包含在app.use里面了，所有后面的comments的url不需要
// campgrounds/:id了 导致26行代码中无法找到req.params.id，所以需要把id传入router
var Campground = require("../models/campground");
var Comment = require("../models/comment");


//Comments new
router.get("/new",isLoggedIn,function(req,res){
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if (err){
			console.log(err);
		}else {
	
				res.render("comments/new",{campground:campground});
		}
	})

});

//Comments Create
router.post("/",isLoggedIn,function(req, res){
	// lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else{
	
			Comment.create(req.body.comment, function(err, comment){
				if (err){
					console.log(err);
				} else{
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
	
	
});
//middleware
function isLoggedIn(req,res,next){
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};

module.exports = router;