const db = require("../models");

exports.createMessage = async function(req, res, next){
           try{
               let message = await db.Message.create({
                   text: req.body.text,
                   user: req.params.id // 访问路径为/api/users/:id/messages 所以直接从链接中获取id参数 
               });
               let foundUser = await db.User.findById(req.params.id);
               foundUser.messages.push(message.id);
               await foundUser.save();
               //populate作用有点像外键 通过保存的userId去user表中查找user的所有信息 并存入该对象中，形式为{text:XXX, user:{username:XXX, profileImageUrl:XXX}}
               let foundMessage = await (await db.Message.findById(message._id)).populate("user",{
                   username:true,
                   profileImageUrl:true
               });
               // 通过返回含有具体信息的messag
               return res.status(200).json(foundMessage);
           }
           catch(err){
               return next(err);
           } 
}
// /api/users/:id/messages/:message_id
exports.getMessage = async function(req, res, next){
    try {
        let message = await db.Message.find(req.params.message_id);
        return res.status(200).json(message);
    }
    catch(e){
        return next(e);
    }
}

// /api/users/:id/messages/:message_id
exports.deleteMessage = async function(req, res, next){
    try {
        let foundMessage = await db.Message.findById(req.params.message_id);
        await foundMessage.remove(); //这里不能用findByIdAndRemove 因为remove之前有个钩子 pre("remove"), 如果用findByIdAndRemove的话 这个钩子就失效了
        return res.status(200).json(foundMessage)

    }
    catch(e){

    }
}