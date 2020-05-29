{"changed":true,"filter":false,"title":"todos.js","tooltip":"/todos_api/helpers/todos.js","value":"var db =  require(\"../models\");\n\n\nexports.getTodos = function(req,res){\n   db.Todo.find()\n   .then(function(todos){\n       res.json(todos);\n   })\n   .catch(function(err){\n       res.send(err);\n   })\n}\n\nexports.createTodo = function(req,res){\n    db.Todo.create(req.body)\n    .then(function(newTodo){\n        res.json(newTodo);\n    })\n    .catch(function(err){\n        res.send(err);\n    })\n    \n}\n\n exports.getTodo = function(req, res){\n    db.Todo.findById(req.params.todoId)\n    .then(function(foundTodo){\n        res.json(foundTodo) //这里必须返回json格式 方便在主页面上显示\n    })\n    .catch(function(err){\n        res.send(err);\n    })\n}\n\nexports.updateTodo = function(req,res){\n    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body,{new:true}) //这里返回更新好后的todo\n    .then(function(todo){\n        res.json(todo);\n    })\n    .catch(function(err){\n        res.send(err);\n    })\n}\n\nexports.deleteTodo = function(req,res){\n    db.Todo.remove({_id:req.params.todoId})\n    .then(function(){\n        res.send({messge: \"We deleted it!\"});\n    })\n    .catch(function(err){\n        res.send(err);\n    })\n}\n\nmodule.exports = exports;","undoManager":{"mark":67,"position":74,"stack":[[{"start":{"row":0,"column":0},"end":{"row":8,"column":1},"action":"insert","lines":["function(req,res){","   db.Todo.find()","   .then(function(todos){","       res.json(todos);","   })","   .catch(function(err){","       res.send(err);","   })","}"],"id":1}],[{"start":{"row":0,"column":0},"end":{"row":0,"column":1},"action":"insert","lines":["e"],"id":2},{"start":{"row":0,"column":1},"end":{"row":0,"column":2},"action":"insert","lines":["x"]},{"start":{"row":0,"column":2},"end":{"row":0,"column":3},"action":"insert","lines":["p"]},{"start":{"row":0,"column":3},"end":{"row":0,"column":4},"action":"insert","lines":["o"]},{"start":{"row":0,"column":4},"end":{"row":0,"column":5},"action":"insert","lines":["r"]},{"start":{"row":0,"column":5},"end":{"row":0,"column":6},"action":"insert","lines":["t"]}],[{"start":{"row":0,"column":0},"end":{"row":0,"column":6},"action":"remove","lines":["export"],"id":3},{"start":{"row":0,"column":0},"end":{"row":0,"column":7},"action":"insert","lines":["exports"]}],[{"start":{"row":0,"column":7},"end":{"row":0,"column":8},"action":"insert","lines":["."],"id":4},{"start":{"row":0,"column":8},"end":{"row":0,"column":9},"action":"insert","lines":["g"]},{"start":{"row":0,"column":9},"end":{"row":0,"column":10},"action":"insert","lines":["e"]},{"start":{"row":0,"column":10},"end":{"row":0,"column":11},"action":"insert","lines":["t"]},{"start":{"row":0,"column":11},"end":{"row":0,"column":12},"action":"insert","lines":["T"]},{"start":{"row":0,"column":12},"end":{"row":0,"column":13},"action":"insert","lines":["o"]},{"start":{"row":0,"column":13},"end":{"row":0,"column":14},"action":"insert","lines":["d"]},{"start":{"row":0,"column":14},"end":{"row":0,"column":15},"action":"insert","lines":["o"]}],[{"start":{"row":0,"column":15},"end":{"row":0,"column":16},"action":"insert","lines":["s"],"id":5}],[{"start":{"row":0,"column":16},"end":{"row":0,"column":17},"action":"insert","lines":[" "],"id":6},{"start":{"row":0,"column":17},"end":{"row":0,"column":18},"action":"insert","lines":["="]}],[{"start":{"row":0,"column":18},"end":{"row":0,"column":19},"action":"insert","lines":[" "],"id":7}],[{"start":{"row":0,"column":0},"end":{"row":1,"column":0},"action":"insert","lines":["",""],"id":8},{"start":{"row":1,"column":0},"end":{"row":2,"column":0},"action":"insert","lines":["",""]},{"start":{"row":2,"column":0},"end":{"row":3,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":0,"column":0},"end":{"row":0,"column":1},"action":"insert","lines":["v"],"id":9},{"start":{"row":0,"column":1},"end":{"row":0,"column":2},"action":"insert","lines":["a"]},{"start":{"row":0,"column":2},"end":{"row":0,"column":3},"action":"insert","lines":["r"]}],[{"start":{"row":0,"column":3},"end":{"row":0,"column":4},"action":"insert","lines":[" "],"id":10},{"start":{"row":0,"column":4},"end":{"row":0,"column":5},"action":"insert","lines":["d"]},{"start":{"row":0,"column":5},"end":{"row":0,"column":6},"action":"insert","lines":["b"]}],[{"start":{"row":0,"column":6},"end":{"row":0,"column":7},"action":"insert","lines":[" "],"id":11},{"start":{"row":0,"column":7},"end":{"row":0,"column":8},"action":"insert","lines":["="]}],[{"start":{"row":0,"column":8},"end":{"row":0,"column":9},"action":"insert","lines":[" "],"id":12},{"start":{"row":0,"column":9},"end":{"row":0,"column":10},"action":"insert","lines":[" "]},{"start":{"row":0,"column":10},"end":{"row":0,"column":11},"action":"insert","lines":["r"]},{"start":{"row":0,"column":11},"end":{"row":0,"column":12},"action":"insert","lines":["e"]},{"start":{"row":0,"column":12},"end":{"row":0,"column":13},"action":"insert","lines":["q"]},{"start":{"row":0,"column":13},"end":{"row":0,"column":14},"action":"insert","lines":["u"]}],[{"start":{"row":0,"column":10},"end":{"row":0,"column":14},"action":"remove","lines":["requ"],"id":13},{"start":{"row":0,"column":10},"end":{"row":0,"column":21},"action":"insert","lines":["require(\"\")"]}],[{"start":{"row":0,"column":19},"end":{"row":0,"column":20},"action":"insert","lines":["."],"id":14},{"start":{"row":0,"column":20},"end":{"row":0,"column":21},"action":"insert","lines":["."]},{"start":{"row":0,"column":21},"end":{"row":0,"column":22},"action":"insert","lines":["/"]},{"start":{"row":0,"column":22},"end":{"row":0,"column":23},"action":"insert","lines":["m"]}],[{"start":{"row":0,"column":23},"end":{"row":0,"column":24},"action":"insert","lines":["o"],"id":15},{"start":{"row":0,"column":24},"end":{"row":0,"column":25},"action":"insert","lines":["e"]}],[{"start":{"row":0,"column":24},"end":{"row":0,"column":25},"action":"remove","lines":["e"],"id":16}],[{"start":{"row":0,"column":24},"end":{"row":0,"column":25},"action":"insert","lines":["d"],"id":17},{"start":{"row":0,"column":25},"end":{"row":0,"column":26},"action":"insert","lines":["l"]},{"start":{"row":0,"column":26},"end":{"row":0,"column":27},"action":"insert","lines":["e"]},{"start":{"row":0,"column":27},"end":{"row":0,"column":28},"action":"insert","lines":["s"]}],[{"start":{"row":0,"column":27},"end":{"row":0,"column":28},"action":"remove","lines":["s"],"id":18},{"start":{"row":0,"column":26},"end":{"row":0,"column":27},"action":"remove","lines":["e"]},{"start":{"row":0,"column":25},"end":{"row":0,"column":26},"action":"remove","lines":["l"]}],[{"start":{"row":0,"column":25},"end":{"row":0,"column":26},"action":"insert","lines":["e"],"id":19},{"start":{"row":0,"column":26},"end":{"row":0,"column":27},"action":"insert","lines":["l"]},{"start":{"row":0,"column":27},"end":{"row":0,"column":28},"action":"insert","lines":["s"]}],[{"start":{"row":0,"column":30},"end":{"row":0,"column":31},"action":"insert","lines":[";"],"id":20}],[{"start":{"row":11,"column":1},"end":{"row":12,"column":0},"action":"insert","lines":["",""],"id":21},{"start":{"row":12,"column":0},"end":{"row":13,"column":0},"action":"insert","lines":["",""]},{"start":{"row":13,"column":0},"end":{"row":13,"column":1},"action":"insert","lines":["m"]},{"start":{"row":13,"column":1},"end":{"row":13,"column":2},"action":"insert","lines":["o"]},{"start":{"row":13,"column":2},"end":{"row":13,"column":3},"action":"insert","lines":["d"]},{"start":{"row":13,"column":3},"end":{"row":13,"column":4},"action":"insert","lines":["e"]},{"start":{"row":13,"column":4},"end":{"row":13,"column":5},"action":"insert","lines":["l"]}],[{"start":{"row":13,"column":4},"end":{"row":13,"column":5},"action":"remove","lines":["l"],"id":22},{"start":{"row":13,"column":3},"end":{"row":13,"column":4},"action":"remove","lines":["e"]},{"start":{"row":13,"column":2},"end":{"row":13,"column":3},"action":"remove","lines":["d"]}],[{"start":{"row":13,"column":2},"end":{"row":13,"column":3},"action":"insert","lines":["d"],"id":23},{"start":{"row":13,"column":3},"end":{"row":13,"column":4},"action":"insert","lines":["u"]},{"start":{"row":13,"column":4},"end":{"row":13,"column":5},"action":"insert","lines":["l"]},{"start":{"row":13,"column":5},"end":{"row":13,"column":6},"action":"insert","lines":["e"]},{"start":{"row":13,"column":6},"end":{"row":13,"column":7},"action":"insert","lines":["."]},{"start":{"row":13,"column":7},"end":{"row":13,"column":8},"action":"insert","lines":["e"]},{"start":{"row":13,"column":8},"end":{"row":13,"column":9},"action":"insert","lines":["x"]},{"start":{"row":13,"column":9},"end":{"row":13,"column":10},"action":"insert","lines":["p"]}],[{"start":{"row":13,"column":7},"end":{"row":13,"column":10},"action":"remove","lines":["exp"],"id":24},{"start":{"row":13,"column":7},"end":{"row":13,"column":14},"action":"insert","lines":["exports"]}],[{"start":{"row":13,"column":14},"end":{"row":13,"column":15},"action":"insert","lines":[" "],"id":25},{"start":{"row":13,"column":15},"end":{"row":13,"column":16},"action":"insert","lines":["="]}],[{"start":{"row":13,"column":16},"end":{"row":13,"column":17},"action":"insert","lines":[" "],"id":26},{"start":{"row":13,"column":17},"end":{"row":13,"column":18},"action":"insert","lines":["e"]},{"start":{"row":13,"column":18},"end":{"row":13,"column":19},"action":"insert","lines":["x"]},{"start":{"row":13,"column":19},"end":{"row":13,"column":20},"action":"insert","lines":["p"]},{"start":{"row":13,"column":20},"end":{"row":13,"column":21},"action":"insert","lines":["o"]},{"start":{"row":13,"column":21},"end":{"row":13,"column":22},"action":"insert","lines":["r"]},{"start":{"row":13,"column":22},"end":{"row":13,"column":23},"action":"insert","lines":["t"]},{"start":{"row":13,"column":23},"end":{"row":13,"column":24},"action":"insert","lines":["s"]}],[{"start":{"row":13,"column":24},"end":{"row":13,"column":25},"action":"insert","lines":[";"],"id":27}],[{"start":{"row":11,"column":1},"end":{"row":12,"column":0},"action":"insert","lines":["",""],"id":28},{"start":{"row":12,"column":0},"end":{"row":13,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":13,"column":0},"end":{"row":22,"column":1},"action":"insert","lines":["function(req,res){","    db.Todo.create(req.body)","    .then(function(newTodo){","        res.json(newTodo);","    })","    .catch(function(err){","        res.send(err);","    })","    ","}"],"id":29}],[{"start":{"row":13,"column":0},"end":{"row":13,"column":1},"action":"insert","lines":["e"],"id":30},{"start":{"row":13,"column":1},"end":{"row":13,"column":2},"action":"insert","lines":["x"]},{"start":{"row":13,"column":2},"end":{"row":13,"column":3},"action":"insert","lines":["p"]},{"start":{"row":13,"column":3},"end":{"row":13,"column":4},"action":"insert","lines":["o"]},{"start":{"row":13,"column":4},"end":{"row":13,"column":5},"action":"insert","lines":["r"]},{"start":{"row":13,"column":5},"end":{"row":13,"column":6},"action":"insert","lines":["t"]},{"start":{"row":13,"column":6},"end":{"row":13,"column":7},"action":"insert","lines":["s"]}],[{"start":{"row":13,"column":7},"end":{"row":13,"column":8},"action":"insert","lines":["."],"id":31},{"start":{"row":13,"column":8},"end":{"row":13,"column":9},"action":"insert","lines":["c"]},{"start":{"row":13,"column":9},"end":{"row":13,"column":10},"action":"insert","lines":["r"]},{"start":{"row":13,"column":10},"end":{"row":13,"column":11},"action":"insert","lines":["e"]},{"start":{"row":13,"column":11},"end":{"row":13,"column":12},"action":"insert","lines":["a"]},{"start":{"row":13,"column":12},"end":{"row":13,"column":13},"action":"insert","lines":["t"]},{"start":{"row":13,"column":13},"end":{"row":13,"column":14},"action":"insert","lines":["e"]}],[{"start":{"row":13,"column":14},"end":{"row":13,"column":15},"action":"insert","lines":["T"],"id":32},{"start":{"row":13,"column":15},"end":{"row":13,"column":16},"action":"insert","lines":["d"]},{"start":{"row":13,"column":16},"end":{"row":13,"column":17},"action":"insert","lines":["o"]}],[{"start":{"row":13,"column":16},"end":{"row":13,"column":17},"action":"remove","lines":["o"],"id":33},{"start":{"row":13,"column":15},"end":{"row":13,"column":16},"action":"remove","lines":["d"]}],[{"start":{"row":13,"column":15},"end":{"row":13,"column":16},"action":"insert","lines":["o"],"id":34},{"start":{"row":13,"column":16},"end":{"row":13,"column":17},"action":"insert","lines":["d"]},{"start":{"row":13,"column":17},"end":{"row":13,"column":18},"action":"insert","lines":["o"]}],[{"start":{"row":13,"column":18},"end":{"row":13,"column":19},"action":"insert","lines":[" "],"id":35},{"start":{"row":13,"column":19},"end":{"row":13,"column":20},"action":"insert","lines":["="]}],[{"start":{"row":13,"column":20},"end":{"row":13,"column":21},"action":"insert","lines":[" "],"id":36}],[{"start":{"row":22,"column":1},"end":{"row":23,"column":0},"action":"insert","lines":["",""],"id":37},{"start":{"row":23,"column":0},"end":{"row":24,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":24,"column":0},"end":{"row":32,"column":1},"action":"insert","lines":[" function(req, res){","    db.Todo.findById(req.params.todoId)","    .then(function(foundTodo){","        res.json(foundTodo)","    })","    .catch(function(err){","        res.send(err);","    })","}"],"id":38}],[{"start":{"row":24,"column":1},"end":{"row":24,"column":2},"action":"insert","lines":["e"],"id":39},{"start":{"row":24,"column":2},"end":{"row":24,"column":3},"action":"insert","lines":["x"]},{"start":{"row":24,"column":3},"end":{"row":24,"column":4},"action":"insert","lines":["p"]},{"start":{"row":24,"column":4},"end":{"row":24,"column":5},"action":"insert","lines":["o"]},{"start":{"row":24,"column":5},"end":{"row":24,"column":6},"action":"insert","lines":["r"]},{"start":{"row":24,"column":6},"end":{"row":24,"column":7},"action":"insert","lines":["t"]},{"start":{"row":24,"column":7},"end":{"row":24,"column":8},"action":"insert","lines":["s"]}],[{"start":{"row":24,"column":8},"end":{"row":24,"column":9},"action":"insert","lines":["."],"id":40},{"start":{"row":24,"column":9},"end":{"row":24,"column":10},"action":"insert","lines":["g"]},{"start":{"row":24,"column":10},"end":{"row":24,"column":11},"action":"insert","lines":["e"]},{"start":{"row":24,"column":11},"end":{"row":24,"column":12},"action":"insert","lines":["t"]},{"start":{"row":24,"column":12},"end":{"row":24,"column":13},"action":"insert","lines":["T"]}],[{"start":{"row":24,"column":13},"end":{"row":24,"column":14},"action":"insert","lines":["o"],"id":41},{"start":{"row":24,"column":14},"end":{"row":24,"column":15},"action":"insert","lines":["d"]},{"start":{"row":24,"column":15},"end":{"row":24,"column":16},"action":"insert","lines":["o"]}],[{"start":{"row":24,"column":16},"end":{"row":24,"column":17},"action":"insert","lines":[" "],"id":42},{"start":{"row":24,"column":17},"end":{"row":24,"column":18},"action":"insert","lines":["="]}],[{"start":{"row":24,"column":18},"end":{"row":24,"column":19},"action":"insert","lines":[" "],"id":43}],[{"start":{"row":32,"column":1},"end":{"row":33,"column":0},"action":"insert","lines":["",""],"id":44},{"start":{"row":33,"column":0},"end":{"row":34,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":34,"column":0},"end":{"row":42,"column":1},"action":"insert","lines":["function(req,res){","    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body,{new:true})","    .then(function(todo){","        res.json(todo);","    })","    .catch(function(err){","        res.send(err);","    })","}"],"id":45}],[{"start":{"row":34,"column":0},"end":{"row":34,"column":1},"action":"insert","lines":["e"],"id":46},{"start":{"row":34,"column":1},"end":{"row":34,"column":2},"action":"insert","lines":["x"]},{"start":{"row":34,"column":2},"end":{"row":34,"column":3},"action":"insert","lines":["p"]},{"start":{"row":34,"column":3},"end":{"row":34,"column":4},"action":"insert","lines":["o"]},{"start":{"row":34,"column":4},"end":{"row":34,"column":5},"action":"insert","lines":["r"]},{"start":{"row":34,"column":5},"end":{"row":34,"column":6},"action":"insert","lines":["t"]},{"start":{"row":34,"column":6},"end":{"row":34,"column":7},"action":"insert","lines":["s"]},{"start":{"row":34,"column":7},"end":{"row":34,"column":8},"action":"insert","lines":["."]}],[{"start":{"row":34,"column":8},"end":{"row":34,"column":9},"action":"insert","lines":["u"],"id":47},{"start":{"row":34,"column":9},"end":{"row":34,"column":10},"action":"insert","lines":["p"]},{"start":{"row":34,"column":10},"end":{"row":34,"column":11},"action":"insert","lines":["d"]},{"start":{"row":34,"column":11},"end":{"row":34,"column":12},"action":"insert","lines":["a"]},{"start":{"row":34,"column":12},"end":{"row":34,"column":13},"action":"insert","lines":["t"]},{"start":{"row":34,"column":13},"end":{"row":34,"column":14},"action":"insert","lines":["e"]},{"start":{"row":34,"column":14},"end":{"row":34,"column":15},"action":"insert","lines":["T"]},{"start":{"row":34,"column":15},"end":{"row":34,"column":16},"action":"insert","lines":["o"]},{"start":{"row":34,"column":16},"end":{"row":34,"column":17},"action":"insert","lines":["d"]},{"start":{"row":34,"column":17},"end":{"row":34,"column":18},"action":"insert","lines":["o"]}],[{"start":{"row":34,"column":18},"end":{"row":34,"column":19},"action":"insert","lines":[" "],"id":48},{"start":{"row":34,"column":19},"end":{"row":34,"column":20},"action":"insert","lines":["="]}],[{"start":{"row":34,"column":20},"end":{"row":34,"column":21},"action":"insert","lines":[" "],"id":49}],[{"start":{"row":42,"column":1},"end":{"row":43,"column":0},"action":"insert","lines":["",""],"id":50},{"start":{"row":43,"column":0},"end":{"row":44,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":44,"column":0},"end":{"row":52,"column":1},"action":"insert","lines":["function(req,res){","    db.Todo.remove({_id:req.params.todoId})","    .then(function(){","        res.send({messge: \"We deleted it!\"});","    })","    .catch(function(err){","        res.send(err);","    })","}"],"id":51}],[{"start":{"row":44,"column":0},"end":{"row":44,"column":1},"action":"insert","lines":["e"],"id":52},{"start":{"row":44,"column":1},"end":{"row":44,"column":2},"action":"insert","lines":["x"]},{"start":{"row":44,"column":2},"end":{"row":44,"column":3},"action":"insert","lines":["p"]},{"start":{"row":44,"column":3},"end":{"row":44,"column":4},"action":"insert","lines":["o"]},{"start":{"row":44,"column":4},"end":{"row":44,"column":5},"action":"insert","lines":["r"]},{"start":{"row":44,"column":5},"end":{"row":44,"column":6},"action":"insert","lines":["t"]},{"start":{"row":44,"column":6},"end":{"row":44,"column":7},"action":"insert","lines":["s"]}],[{"start":{"row":44,"column":7},"end":{"row":44,"column":8},"action":"insert","lines":["."],"id":53},{"start":{"row":44,"column":8},"end":{"row":44,"column":9},"action":"insert","lines":["d"]},{"start":{"row":44,"column":9},"end":{"row":44,"column":10},"action":"insert","lines":["e"]},{"start":{"row":44,"column":10},"end":{"row":44,"column":11},"action":"insert","lines":["l"]},{"start":{"row":44,"column":11},"end":{"row":44,"column":12},"action":"insert","lines":["e"]},{"start":{"row":44,"column":12},"end":{"row":44,"column":13},"action":"insert","lines":["t"]},{"start":{"row":44,"column":13},"end":{"row":44,"column":14},"action":"insert","lines":["e"]}],[{"start":{"row":44,"column":14},"end":{"row":44,"column":15},"action":"insert","lines":["T"],"id":54},{"start":{"row":44,"column":15},"end":{"row":44,"column":16},"action":"insert","lines":["o"]},{"start":{"row":44,"column":16},"end":{"row":44,"column":17},"action":"insert","lines":["d"]},{"start":{"row":44,"column":17},"end":{"row":44,"column":18},"action":"insert","lines":["o"]}],[{"start":{"row":44,"column":18},"end":{"row":44,"column":19},"action":"insert","lines":[" "],"id":55},{"start":{"row":44,"column":19},"end":{"row":44,"column":20},"action":"insert","lines":["="]}],[{"start":{"row":44,"column":20},"end":{"row":44,"column":21},"action":"insert","lines":[" "],"id":56}],[{"start":{"row":16,"column":7},"end":{"row":16,"column":8},"action":"insert","lines":["、"],"id":57},{"start":{"row":16,"column":8},"end":{"row":16,"column":9},"action":"insert","lines":["、"]}],[{"start":{"row":16,"column":8},"end":{"row":16,"column":9},"action":"remove","lines":["、"],"id":58},{"start":{"row":16,"column":7},"end":{"row":16,"column":8},"action":"remove","lines":["、"]}],[{"start":{"row":16,"column":7},"end":{"row":16,"column":8},"action":"insert","lines":["/"],"id":59},{"start":{"row":16,"column":8},"end":{"row":16,"column":9},"action":"insert","lines":["/"]}],[{"start":{"row":16,"column":7},"end":{"row":16,"column":9},"action":"remove","lines":["//"],"id":60}],[{"start":{"row":27,"column":27},"end":{"row":27,"column":28},"action":"insert","lines":[" "],"id":61},{"start":{"row":27,"column":28},"end":{"row":27,"column":29},"action":"insert","lines":["/"]},{"start":{"row":27,"column":29},"end":{"row":27,"column":30},"action":"insert","lines":["/"]}],[{"start":{"row":27,"column":30},"end":{"row":27,"column":32},"action":"insert","lines":["这里"],"id":62},{"start":{"row":27,"column":32},"end":{"row":27,"column":34},"action":"insert","lines":["必须"]},{"start":{"row":27,"column":34},"end":{"row":27,"column":36},"action":"insert","lines":["返回"]}],[{"start":{"row":27,"column":36},"end":{"row":27,"column":40},"action":"insert","lines":["json"],"id":63},{"start":{"row":27,"column":40},"end":{"row":27,"column":42},"action":"insert","lines":["格式"]}],[{"start":{"row":27,"column":42},"end":{"row":27,"column":43},"action":"insert","lines":[" "],"id":64},{"start":{"row":27,"column":43},"end":{"row":27,"column":45},"action":"insert","lines":["方便"]}],[{"start":{"row":27,"column":45},"end":{"row":27,"column":46},"action":"insert","lines":["再"],"id":65}],[{"start":{"row":27,"column":45},"end":{"row":27,"column":46},"action":"remove","lines":["再"],"id":66}],[{"start":{"row":27,"column":45},"end":{"row":27,"column":46},"action":"insert","lines":["在"],"id":67}],[{"start":{"row":27,"column":46},"end":{"row":27,"column":50},"action":"insert","lines":["主页面上"],"id":68},{"start":{"row":27,"column":50},"end":{"row":27,"column":52},"action":"insert","lines":["显示"]}],[{"start":{"row":35,"column":75},"end":{"row":35,"column":76},"action":"insert","lines":[" "],"id":81},{"start":{"row":35,"column":76},"end":{"row":35,"column":77},"action":"insert","lines":["、"]},{"start":{"row":35,"column":77},"end":{"row":35,"column":78},"action":"insert","lines":["、"]}],[{"start":{"row":35,"column":77},"end":{"row":35,"column":78},"action":"remove","lines":["、"],"id":82},{"start":{"row":35,"column":76},"end":{"row":35,"column":77},"action":"remove","lines":["、"]}],[{"start":{"row":35,"column":76},"end":{"row":35,"column":77},"action":"insert","lines":["/"],"id":83},{"start":{"row":35,"column":77},"end":{"row":35,"column":78},"action":"insert","lines":["/"]}],[{"start":{"row":35,"column":78},"end":{"row":35,"column":79},"action":"insert","lines":["这"],"id":84},{"start":{"row":35,"column":79},"end":{"row":35,"column":80},"action":"insert","lines":["里"]}],[{"start":{"row":35,"column":80},"end":{"row":35,"column":82},"action":"insert","lines":["返回"],"id":85},{"start":{"row":35,"column":82},"end":{"row":35,"column":85},"action":"insert","lines":["更新好"]}],[{"start":{"row":35,"column":85},"end":{"row":35,"column":86},"action":"insert","lines":["后"],"id":86},{"start":{"row":35,"column":86},"end":{"row":35,"column":87},"action":"insert","lines":["的"]}],[{"start":{"row":35,"column":87},"end":{"row":35,"column":91},"action":"insert","lines":["todo"],"id":87}]]},"ace":{"folds":[],"scrolltop":283.5,"scrollleft":0,"selection":{"start":{"row":38,"column":6},"end":{"row":38,"column":6},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1590716303333}