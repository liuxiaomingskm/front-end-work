var Campground = require("../models/campground");
var Comment = require("../models/comment");
//all the middleware goes here

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res,next){ //该中间函数主要用于验证用户是否登录或用户是否和当前campground作者一致
	if(req.isAuthenticated()){
		
		Campground.findById(req.params.id, function(err,foundCampground){
		if (err){
			req.flash("error", "Campground not found.");
			res.redirect("back");
		} else {
			//add this block to check if foundCampground is existed, if not existed, redirect to the back page~
			if(!foundCampground){
			   req.flash("error", "Item not found.");
				return res.redirect("back");
				
			   }
			//does the user own the campground?
			if(foundCampground.author.id.equals(req.user._id)){
			next();
		}
else {
		req.flash("error", "You don't have the permission to do that!");
		res.redirect("back");	}
		}
});
	}else{
		req.flash("error","You need to be logged in to do that.");
		res.redirect("back");
	
	};	
		

	
	
};
middlewareObj.checkCommentOwnership = function(req, res,next){ //该中间函数主要用于验证用户是否登录或用户是否和当前campground作者一致
	if(req.isAuthenticated()){
		
		Comment.findById(req.params.comment_id, function(err,foundComment){
		if (err){
			res.redirect("back");
		} else {
				if(!foundComment){
			   req.flash("error", "Item not found.");
				return res.redirect("back");
			   }
			//does the user own the comment?
			if(foundComment.author.id.equals(req.user._id)){
			next();
		}else {
			
		req.flash("error","You don't have the permission to do that.");
		res.redirect("back");	}
		}
});
	}else{
		
		req.flash("error","You need to be logged in to do that.");
		res.redirect("back");
	
	};		
};

middlewareObj.isLoggedIn = function(req,res,next){
	if (req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that.");
	res.redirect("/login");
};




module.exports = middlewareObj