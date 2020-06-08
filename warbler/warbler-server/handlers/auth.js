const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next){
        //find a user,chekcing if their password mathes what was sent to the server
        //if it all matches, log them in
        try{ 
   
            let user =await db.User.findOne({
            email: req.body.email
        });
        
        let {id, username, profileImageUrl} = user;
      
        
        let isMatch = await user.comparePassword(req.body.password);
        console.log("isMatch", isMatch);
       
    
        if (isMatch){
            let token = jwt.sign({
                id,
                username,
                profileImageUrl
            },
            process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return next(
                {
                    status: 400,
                    message: "Invalid Email/Password."
                }
            );
        }
}
        catch(e){
            return next({status: 400, message: "Invalid Email/Password."});
        }
        

}

exports.signup = async function(req, res, next){
    try{
        //create a user
        //create a token(signing a token)
        //process.env.SECRET_KEY

        let user = await db.User.create(req.body);
        let {id, username, profileImageUrl} = user;
        let token = jwt.sign(
            {
            id,
            username,
            profileImageUrl
        },
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
    }
    catch(err) {
        //see what kind of err,if it is a certain error,respond with userame/email already taken
        //otherwise just send back a generic 400
        // validation fail有个专门的错误码 11000
        if (err.code === 11000){
            err.message = "Sorry, the username and/or email is taken";
        }
        return next({
            status: 400,
            message: err.message
        })

    }
}