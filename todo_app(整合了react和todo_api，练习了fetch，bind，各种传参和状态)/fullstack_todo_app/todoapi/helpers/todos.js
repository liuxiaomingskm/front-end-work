var db =  require("../models");


exports.getTodos = function(req,res){
   db.Todo.find()
   .then(function(todos){
       res.json(todos);
   })
   .catch(function(err){
       res.send(err);
   })
}

exports.createTodo = function(req,res){
    db.Todo.create(req.body)
    .then(function(newTodo){
        res.json(newTodo);
    })
    .catch(function(err){
        res.send(err);
    })
    
}

 exports.getTodo = function(req, res){
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo){
        res.json(foundTodo) //这里必须返回json格式 方便在主页面上显示
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.updateTodo = function(req,res){
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body,{new:true}) //这里返回更新好后的todo
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.deleteTodo = function(req,res){
    db.Todo.remove({_id:req.params.todoId})
    .then(function(){
        res.send({messge: "We deleted it!"});
    })
    .catch(function(err){
        res.send(err);
    })
}

module.exports = exports;