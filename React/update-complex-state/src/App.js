import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      instructors: [
        {
          name: 'Tim',
          hobbies: ['sailing', 'react']
        }, {
          name: 'Matt',
          hobbies: ['math', 'd3']
        }, {
          name: 'Colt',
          hobbies: ['css', 'hiking']
        }, {
          name: 'Elie',
          hobbies: ['music', 'es2015']
        }
      ]
    };

    setTimeout(() => {
      //确定随机位置
      const randInst = Math.floor(Math.random() * this.state.instructors.length);
      const hobbyIndex = Math.floor(
          Math.random() *
          this.state.instructors[randInst].length);
      //既要更改state的值 又不能在原来对象上更改 保证纯函数的性质
      const instructors = this.state.instructors.map((inst,i) => {
        if (i === randInst){
          const hobbies = inst.hobbies.slice();
          hobbies.splice(hobbyIndex,1); //去除hobbyIndex位置起的1个元素
          return {
            ...inst,
            hobbies
          }
        }

        return inst;
      });
//这里是新建对象再赋值的另外一种写法，比较复杂而且自己测试结果比较矛盾，slice按照定义是返回新的数组，原数组不受影响，但是我这里slice()之后，更改
      //新数组中某个元素 原数组的元素也收到影响 和war3School的测试结果矛盾~
      // instructors[randInst] = Object.assign({}, instructors[randInst]);
      // instructors[randInst].hobbies = instructors[randInst].hobbies.slice();
      // instructors[randInst].hobbies.splice(hobbyIndex,1);
      // console.log("this instructor", this.state.instructors);
      // console.log("modified instructors1", instructors);
      this.setState({instructors});
    }, 5000);
  }

  render() {

    const instructors = this.state.instructors.map((instructor, index) => (
      <li key={index}>
        <h3>{instructor.name}</h3>
        <h4>Hobbies: {instructor.hobbies.join(", ")}</h4>
      </li>
    ));
    return (
      <div className="App">
        <ul>
         {instructors}
        </ul>
      </div>
    );
  }
}

export default App;
