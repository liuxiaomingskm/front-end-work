var width = 600;
var height = 600;

var nodes = [
  { color: "red", size: 5, },
  { color: "orange", size: 10 },
  { color: "yellow", size: 15 },
  { color: "green", size: 20 },
  { color: "blue", size: 25 },
  { color: "purple", size: 30 }
];

var links = [     
          {source:"red", target:"orange"},
          {source:"orange", target:"yellow"},
          {source:"yellow", target:"green"},
          {source:"green", target:"blue"},
          {source:"blue", target:"purple"},
          {source:"purple", target:"red"},
          {source:"green", target:"red"}
];

var svg = d3.select("svg")
              .attr("width", width)
              .attr("height", height);
// show the link segments
var linkSelection = svg
                        .selectAll('line')
                        .data(links)
                        .enter()
                        .append('line')
                          .attr("stroke", "black")
                          .attr("stroke-width", 1);


var nodeSelection = svg
                      .selectAll("circle")
                      .data(nodes)
                      .enter()
                      .append("circle")
                        .attr("r", d => d.size)
                        .attr("fill", d => d.color)
                        .call(d3.drag()
                          .on("start", dragStart)
                          .on("drag", drag)
                          .on("end", dragEnd));
// 运行forceSimulation后 d3.select("circle").data()多出vy，vx属性
//这几个属性和force-directed有关
var simulation = d3.forceSimulation(nodes);

simulation
//添加力的名称和力的描述
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('nodes', d3.forceManyBody())
        .force("links", d3.forceLink(links)
                            .id(d =>d.color)
                            .distance(d =>5 * (d.source.size + d.target.size)))
        .on('tick',ticked);
        
        
function ticked(){
  console.log(simulation.alpha());

          nodeSelection
              .attr('cx', d => d.x) //d.x, d.y is assigned by the simulation.
              .attr('cy', d => d.y);

linkSelection
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);}

/*
# simulation.alphaMin([min]) <>

If min is specified, sets the minimum alpha to the specified number in the range [0,1] and 
returns this simulation. If min is not specified, returns the current minimum alpha value, 
which defaults to 0.001. The simulation’s internal timer stops when the current alpha is less 
than the minimum alpha. The default alpha decay rate of ~0.0228 corresponds to 300 iterations.

# simulation.alpha([alpha]) <>

If alpha is specified, sets the current alpha to the specified number in the range [0,1] and 
returns this simulation. If alpha is not specified, returns the current alpha value, which defaults
 to 1.

 simulation.alphaTarget([target]) <>

If target is specified, sets the current target alpha to the specified number in the range [0,1] and 
returns this simulation. If target is not specified, returns the current target alpha value, which 
defaults to 0.

# simulation.restart() <>

Restarts the simulation’s internal timer and returns the simulation. In conjunction with simulation.alphaTarget
 or simulation.alpha, this method can be used to “reheat” the simulation during interaction, such as when dragging
  a node, or to resume the simulation after temporarily pausing it with simulation.stop.
*/
function dragStart(d){
  console.log("starting to drag!");
  //如果alpha小于0.5 alpha逐渐增加 如果alpha > 0.5 alpha逐渐减小
  simulation.alphaTarget(0.5).restart();
  d.fx = d.x;
  d.fy = d.y;

};
function drag(d){
simulation.alpha(0.5).restart();
  d.fx = d3.event.x;
  d.fy = d3.event.y;

};
function dragEnd(d){
  //alpha下降到0 最后停止simuliation， 只要target > alpha最小值
  //simulation就永远不会听停下
simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;

};