require("dotenv").config(); //读取所有在.env中的环境变量
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error"); //这里一定要指明相对路径，如果不指明 exprss就会去node_modules里面找
const authRoutes = require("./routes/auth");
const messagesRoutes =  require("./routes/messages");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const db = require("./models");

const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json()); //因为只是创建API 所以不用之前的URLencode的形式

app.use("/api/auth", authRoutes);
app.use("/api/users/:id/messages",loginRequired,ensureCorrectUser, messagesRoutes);

app.get("/api/messages", loginRequired, async function(req,res, next){
 try {
        let messages =  await db.Message.find()
        .sort({createdAt: "desc"})
        .populate("user",{
            username:true,
            profileImageUrl: true
        });
        return res.status(200).json(messages);

 }
 catch(err){

 }



})

// all my routes here - they will come later!

app.use(function(req,res,next){
    let err = new Error("Not Found");
    err.status = 404;
    next(err);

});
app.use(errorHandler); //承接上面代码 任何错误都返回成json格式 看上去更漂亮一点

app.listen(PORT, function(){
    console.log(`Server is starting on port ${PORT}`);
})