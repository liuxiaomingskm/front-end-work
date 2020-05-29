var mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todo');

mongoose.Promise = Promise; // 这样操作之后 就不用在db.todo.find(function(){})放回调函数 而是直接跟then.call等函数

module.exports.Todo = require("./todo");