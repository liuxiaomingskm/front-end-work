require("dotenv").load;
const jwt = require("jsonwebtoken");

//make sure the user is logged in - Authentication
exports.loginRequired =  function(req, res, next){
    //即使这不是异步程序 但是因为会有人authorization不存在的情况下访问 会产生 token=undefined.split(" ") 会报错  所以还是需要try catch模块
    try {
        const token = req.headers.authorization.split(" ")[1]; // autorization以 Bearer "token"的形式出现 所以取后半串字符串
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){ //这里decoded其实就是payload 
                if (decoded){
                    return next();
                } else {
                    return next({ //token无法解析或者token被篡改
                        status:401,
                        message:"Please log in first!"
                    });
                }

        })
    }
    catch(e){
        return next({
            status: 400,
            message: "Please log in first!"
        })
    }
}


//make sure we get the correct user - Authorization
exports.ensureCorrectUser = function(req, res, next){

    try { // 访问路径是 /api/users/:id/messages 该模块的意义是保证登录的用户名id和访问路径中的id一致
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if (decoded && decoded.id === req.params.id){
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Unauthorized"
                })
            }
        })
    }
    catch(e){
        return next({
            status: 401,
            message: "Unauthorized"
        })
    }
}