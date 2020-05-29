var express  =  require("express"),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser =  require("body-parser");
    


    
    
var todoRoutes = require("./routes/todo");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.send("HELLO FROM THE ROOT ROUTE!");
    });
    
app.use('/api/todos', todoRoutes);
    

    
    app.listen(port, function(){
        console.log("APP is running on PORT" + process.env.PORT);
        
        
    })
    
    
    