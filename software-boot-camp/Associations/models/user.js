var mongoose = require("mongoose");
//USER
var userSchema =  new mongoose.Schema({
	email:String,
	name:String,
	posts:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Post"
	}] // it should be name of schema rather than Post
});


module.exports = mongoose.model("User", userSchema);