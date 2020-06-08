const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/warbler", {
    keepAlive:true,
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useMongoClient: true //得到一些警示信息 mongoose的最新技术
});

module.exports.User = require("./user"); //还可以加很多模块  方便在主index界面中直接引用
module.exports.Message = require("./message");