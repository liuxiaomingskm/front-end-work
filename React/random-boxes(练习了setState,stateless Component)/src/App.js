import React, { Component } from 'react';
import './App.css';

const NUM_BOXES = 32;

const Box = ({color}) => {
  const style = {
    width: '180px',
    height: '180px',
    display:'inline-block',
    backgroundColor: color
  }
  return <div style = {style} />
}
class App extends Component {
  
constructor(props){
  super(props);
  // 下面之所以要以this作为第二个参数，不同对象调用this.getRandomColor 会改变this指引的对象，所以需要绑定this = App Component
  // Fill(): fill all the array elements with a static value , 此处getRandomColor是一个没有参数的函数，可以作为map的参数
  const boxes = Array(NUM_BOXES).fill().map(this.getRandomColor, this);
  this.state = {boxes}; //对象缩写
  
  setInterval(() => {
    const boxes = this.state.boxes.slice();
    const randIndex = Math.floor(Math.random() * boxes.length);
    boxes[randIndex] = this.getRandomColor();
    this.setState({boxes});

  },300);

}

  getRandomColor(){
    let colorIndex = Math.floor(Math.random() * this.props.allColors.length);
    return  this.props.allColors[colorIndex];
  }
  render() {
    const boxes = this.state.boxes.map((color, index) =>(
      <Box key={index} color={color} />
    ));
    console.log("boxes",boxes);
    return (
      <div className="App">
        {boxes}
      </div>
    );
  }
}

App.defaultProps = {
  allColors: ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond",
              "Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate",
              "Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod",
              "DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange",
              "DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey",
              "DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue",
              "FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod",
              "Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki",
              "Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan",
              "LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon",
              "LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow",
              "Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid",
              "MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise",
              "MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy",
              "OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen",
              "PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue",
              "Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen",
              "SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen",
              "SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke",
              "Yellow","YellowGreen"]
};

export default App;
