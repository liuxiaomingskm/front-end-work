const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
        email:{
            type:String,
            required:true,
            unique:true
        },

        username: {
            type: String,
            required:true,
        },
        password: {
            type: String,
            required:true

        },
        profileImageUrl: {
            type:String
        },
        messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Message"
        }
    ]


});
userSchema.pre("save", async function(next){
    try {
        //this.isModified will only return true, if you are reset/change or set password at first time
        // for example, if you change username, this function will return false;
        if (!this.isModified("password")){
            return next();
        }

        let hashedPassword =await bcrypt.hash(this.password, 10); //bcrypt是异步程序，所以需要await
        this.password = hashedPassword;
        return next();
    } 
    
    catch(err){
        return next(err);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword, next){
    try {
        
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch(err){
        next(err);
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;