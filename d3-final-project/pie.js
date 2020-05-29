function createPie(width, height){
  var pie = d3.select("#pie")
                .attr("width", width)
                .attr("height", height);

      pie.append("g")
          .attr("transform","translate(" + width / 2 +", " +(height / 2 + 10) + ")")
          .classed("chart", true);

      pie.append("text")
          .attr("x", width / 2)
          .attr("y", "1em")
          .attr("font-size", "1.5em")
          .style("text-anchor","middle")
          .classed("pie-title", true);
}


function drawPie(data, currentDate){
  var pie = d3.select("#pie");
  var currentDataType =  d3.select("input:checked")
                                    .property("value");
  var arcs = d3.pie()
  
  // 根据continent排序 划分饼图大小
              .sort((a,b) =>{
                if (a.continent < b.continent)  return -1;
                if (a.continent > b.continent) return 1;
                
                return a[currentDataType] - b[currentDataType];
              })
              .value( d=> d[currentDataType]);

  var path = d3.arc()
                .outerRadius(+pie.attr("height") / 2 - 50)
                .innerRadius(0);

  var dateData = data.filter(d => d.date.getTime() === currentDate.getTime());

  var continents = [];
  for (var i = 0; i < dateData.length;i++){
    var continent = dateData[i].continent;
    if (!continents.includes(continent)){
      continents.push(continent);
    }
  }
  var colorScale = d3.scaleOrdinal()
                      .domain(continents)
                      .range(["#ab47bc","#7e57c2","#26a69a","#42a5f5","#78909c"]);

  var update = pie
                  .select(".chart")
                  .selectAll(".arc")
                  .data(arcs(dateData));//为什么捆绑yeardata要放在arcs函数里面
      update 
       .exit()
       .remove();

      update
        .enter()
        .append("path")
        .classed("arc", true)
        .attr("stroke", "#dff1ff")
        .attr("stroke-width", "0.25px")
      .merge(update)
        .attr("fill", d => colorScale(d.data.continent))
        .attr("d", path);
      

    pie.select(".pie-title")
      .text("Total "+ currentDataType + " cases on " + currentDate.toLocaleString().slice(0,9));
      
                  
}


























