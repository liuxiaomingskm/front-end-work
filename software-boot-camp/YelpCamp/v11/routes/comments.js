

var express = require("express");
var router = express.Router({mergeParams:true});//这里merge的目的是因为在app.js里面 campgrounds/:id已经包含在app.use里面了，所有后面的comments的url不需要
// campgrounds/:id了 导致26行代码中无法找到req.params.id，所以需要把id传入router
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");


//Comments new
router.get("/new",middleware.isLoggedIn,function(req,res){
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
router.post("/",middleware.isLoggedIn,function(req, res){
	// lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else{
	
			Comment.create(req.body.comment, function(err, comment){
				if (err){
					req.flash("error", "Something went wrong!");
					console.log(err);
				} else{
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					req.flash("success","Successully added comment");
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
	
	
});

//Comments edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id,function(err, foundComment){
		if (err){
			res.redirect("back");
		} else {
			res.render("comments/edit",{campground_id:req.params.id, comment:foundComment});
		}
	});
});

// Comment Update
//campgrounds/:id/comments/:comment_id
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if (err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// Comment Destory Route
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	//findByIdAndRemove
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if (err){
			res.redirect("back");
		} else {
			req.flash("success","Comment deleted.");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});



module.exports = router;