import React, { Component } from 'react';
import './App.css';
// 最小的component props可以换成{text}
const TodoItem = (props) => (
<li>{props.text}</li>
);

class App extends Component {
  constructor (props){
    super(props);
    //涉及改变的有两个元素 第一个是输入框 第二个是todo list
    this.state = {
      todos: [],
      newTodo:''
    }
    //绑定this 如果不绑定后面调用handleSubmit的对象不一样是App
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // e指event
  handleSubmit(e){
  // 取消默认行为
    e.preventDefault();
    //一旦点击了submit 添加新的todo选项 然后调用setState 并把newTodo变成空值
    const todos = [...this.state.todos, this.state.newTodo];
    this.setState({todos, newTodo:''});
  }

  render (){
    //提取newTodo
    const newTodo = this.state.newTodo;
    const todos = this.state.todos.map((t,i) => (
        <TodoItem key={i} text={t} />
    ));
    return (
        <div class= 'App'>
          <h1>Simple Todo App</h1>
          <form onSubmit = {this.handleSubmit}>
          <input
          className = "todo-input"
          autoComplete = "off"
          type = "text"
          name = "newTodo"
          placeholder = "What needs to be done?"
          value = {newTodo}
          // e.target.name指向form中的name属性 target代表一个DOM元素，e.target.value把value重新传回newTodo
          onChange = {(e) => this.setState({[e.target.name] : e.target.value})}
          />
          <button
          // 不用写onclike函数
            type = "submit"
            className = "save-button"
            >
              SAVE
          </button>
          </form>
          <div className="todo-content">
            <ol>
              {todos}
            </ol>
          </div>
        </div>
    );
  }
}
export default App;