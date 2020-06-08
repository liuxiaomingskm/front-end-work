const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 160
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, //引用数据中的User类，这里存储的是Id值
        ref:"User" //User必须和User model里的"User"完全一致
    }
},
{
        timestamps:true // 创建时间和更新时间  方便后面更新 注意这个属性是Schema的参数 不在上面对象内
    });
messageSchema.pre('remove', async function(next){
// find a user and remove the id of the message from their messages list
// save that user and return next
try {
    let user = await User.findById(this.user); //userId如何和Schema的user对应起来的 有点奇怪
    user.messages.remove(this.id);// 这里是synchronous程序 所以不用await
    await user.save();
    //return next
    return next();
}
catch (err){
    return next(err);
}


})

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;