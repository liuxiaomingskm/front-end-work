import React, {Component} from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import * as apiCalls from './api';



class TodoList extends Component {
    constructor(props){
      super(props);
      this.state = {
        todos:[]
      }
      this.addTodo = this.addTodo.bind(this);
    }
    
    componentWillMount(){
      this.loadTodos();
    }
    
   async loadTodos(){
      let todos = await apiCalls.getTodos();
    
   /* console.log("todos:", todos);//直接就是todos数组了 貌似then提取value出来 并以参数传进去 response的整个过程需要再查验 */
    this.setState({todos});
    }
    
    async addTodo(val){
     let newTodo = await apiCalls.createTodo(val);
    this.setState({todos: [...this.state.todos, newTodo]
      })
    }
    
    async deleteTodo(id){
      
      await apiCalls.removeTodo(id);
      const todos = this.state.todos.filter(todo => todo._id !== id);
      this.setState({todos:todos})
      }
    
    
    async toggleTodo(todo){
     let updateTodo = await apiCalls.updateTodo(todo);
      const todos = this.state.todos.map( t =>
        (t._id === updateTodo._id)? updateTodo: t
        );
        this.setState({todos:todos});
      
    }
    
    render(){
        const todos = this.state.todos.map((t) => (
          <TodoItem
          key={t._id}
          {...t}
          onDelete = {this.deleteTodo.bind(this, t._id)}// 这里不但需要绑定this 还需要传入每个todoItem的id来删除该todoItem 所以this后加额外参数， 该参数会放置于定义函数的所有参数前面
          onToggle = {this.toggleTodo.bind(this, t)}
          />
          ))
      return (
        <div>
        <h1> TodoList! </h1>
        <TodoForm addTodo = {this.addTodo}/>
        <ul>
        {todos}
      </ul>
        </div>
        )
          
            
    }
}

export default TodoList;