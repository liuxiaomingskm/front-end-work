/* global $ */
$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)
    
    $('#todoInput').keypress(function(event){
        if (event.which == 13){
            //create todo
            createTodo();
        }
    })
});

$('.list').on('click','li', function(req,res){
    updateTodo($(this));
})

$('.list').on('click','span', function(e){//这里要注意监听器只能parent节点上 要不然点击事件对新创建的span无效
        e.stopPropagation();// 阻止事件向上传递 点击span 只会对span触发事件 而不会对包含span的li触发事件
        removeTodo($(this).parent());


})

function addTodos(todos){
    // add todos to page here
    todos.forEach(function(todo){ //这里用map也可以 foreach和map可以互换 除了返回结果不同
     addTodo(todo);
})}


function addTodo(todo){
       var newTodo = $('<li class="task">' + todo.name + '<span>X</span> </li>');
       newTodo.data('id', todo._id); //将id保存在newTodo中 方便后面删除调用
       newTodo.data('completed',todo.completed);
        if(todo.completed){
            newTodo.addClass("done");
        }
        $('.list').append(newTodo);
    
}
function createTodo(){
    //send request to create new todo
    var usrInput = $('#todoInput').val();
    $.post('/api/todos',{name: usrInput})
    .then(function(newTodo){
      
       addTodo(newTodo);
        $('#todoInput').val("");
    })
    .catch(function(err){
        console.log(err);
    })
    
}
function removeTodo(todo){
        var clickedId =  todo.data('id');
       var deleteUrl = '/api/todos/' + clickedId;
    
       $.ajax({
           method:'DELETE',
           url:deleteUrl
       })
       .then(function(data){
           todo.remove();
       })
       .catch(function(err){
           console.log(err);
       })
}

function updateTodo(todo){
  var clickedId = todo.data('id');
  var updateUrl = '/api/todos/' + clickedId;
  var isDone = !todo.data('completed');
  var updateData = {completed: isDone};
  $.ajax({
      method:'PUT',
      url:updateUrl,
      data:updateData
  })
  .then(function(updateTodo){
    todo.toggleClass('done'); //添加或者删除done类
    todo.data('completed', isDone); //这里可以用isDone也可以用updateTodo.completed~
      
  })
    
}