/*
transition.duration([value]) : new duration for the transition, value can be a constant
or a callback to be invoked on each element

transition.ease([value]) : control the tarnsition speed

transition.delay([value]): new delay for the transition

transition.on(typenames[,ilstener])
*/


var minYear = d3.min(birthData, function(d){
  return d.year;
});
var maxYear = d3.max(birthData, function(d){
  return d.year;
});


var width = 600;
var height = 600;
var barPadding = 10;
var numBars = 12;
var barWidth = width / numBars - barPadding;
var maxBirths = d3.max(birthData, function(d){
  return d.births;
})
var yScale = d3.scaleLinear()
              .domain([0, maxBirths])
              .range([height, 0]);


d3.select("input")
    .property("min", minYear)
    .property("max", maxYear)
    .property("value", minYear);

d3.select("svg")
    .attr("width", width)
    .attr("height", height)
  .selectAll("rect")
  .data(birthData.filter(function(d) {
    return d.year === minYear;
  }))
  .enter()
  .append("rect")
    .attr("width", barWidth)
    .attr("height", function(d) {
      return height - yScale(d.births);
    })
    .attr("y", function(d) {
      return yScale(d.births);
    })
    .attr("x", function(d,i) {
      return (barWidth + barPadding) * i;
    })
    .attr("fill", "purple");

d3.select("svg")
    .append("text")
    .classed('title', true)
    .text("Birth Data in  " + minYear)
    .attr('x', width / 2)
    .attr('y', 30)
    .style("text-anchor", "middle")
    .style("font-size", '2em');

d3.select("input")
    .on("input", function() {
      var year = +d3.event.target.value;
      d3.selectAll("rect")
        .data(birthData.filter(function(d) {
          return d.year === year;
        }))
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .delay((d,i) => i*250)
        .on('start', function(d,i){
          if (i === 0){ 
             d3.select('.title')
            .text('Update to '+ year + ' data...');}
        
        })
        .on('end', function(d, i, nodes){
          if (i === nodes.length - 1){ 
            d3.select('.title')
            .text("Birth Data in " +  year);}
         
        })
        .on('interrupt', function(){
          console.log("Interrupt! no longer update to " + year + " data...");
        })
          .attr("height", function(d) {
            return height - yScale(d.births);
          })
          .attr("y", function(d) {
            return yScale(d.births);
          });
    });