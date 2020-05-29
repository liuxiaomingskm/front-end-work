function createMap(width, height) {
  // set the basic values
  d3.select('#map')
        .attr("width", width)
        .attr("height", height)
      .append("text")
        .attr('x', width / 2)
        .attr('y', '1em')
        .attr("font-size", "1.5em")
        .style("text-anchor", "middle")
        .classed("map-title", true);
  
}
function drawMap(geoData, data, date, dataType){
    var map = d3.select("#map");
    //set projection scale and position
    //scale按比例放大或者缩小 原始尺寸是100
    var projection = d3.geoMercator()
                        .scale(110)
                        .translate([+map.attr("width") / 2, +map.attr("height") / 1.4]);

    var path = d3.geoPath()
                  .projection(projection);

    d3.select("#date-val").text(date);

    geoData.forEach( d=>{
      //返回id和row.countryCode一致的国家，因为data里面一个国家包含了多个年份的信息
      //所以同一个国家有多个data
      var countries = data.filter(row => row.countryCode === d.id);
      var name = "";
      if (countries.length > 0) name = countries[0].country;
      //geoData元素中原本空集合的properties 现在放入当年的object
      d.properties = countries.find(c => {
       
        //if (c.date.getTime() == date.getTime()){console.log("There is a match date")};
        return c.date.getTime() === date.getTime()}) ||{country:name};
      
    });
      var colors = {
        confirmed:["#787878","#f00000"],
        suspected:["#787878","#f00000"],
        death:["#ffe6e6","#000000" ],
        recovered:["#ffffff","#40ff00"]};
      var domains = {
        confirmed: [0,8e5 ],
        suspected: [0,7e4 ],
        death:[0,38664],
        recovered:[0,85400]
      };
      var mapColorScale = d3.scaleLinear()
                            .domain(domains[dataType])
                            .range(colors[dataType]);

      var update = map.selectAll(".country")
                      .data(geoData);

      update
        .enter()
        .append("path")
        .classed("country", true)
        .attr("d", path)
        .on("click", function(){
          var currentDataType =  d3.select("input:checked")
                                    .property("value");
          
          var country = d3.select(this);
          /*If a value is not specified, returns true if and only if the first (non-null) selected element has 
          the specified classes. This is generally useful only if you know the selection contains exactly one 
          element.
          */
         var isActive = country.classed("active");
         var countryName = isActive? "" : country.data()[0].properties.country;
         drawBar(data, currentDataType, countryName);
         highlightBars(d3.timeParse("%Y-%m-%d")(d3.select("#date").property("value")));
         d3.selectAll(".country").classed("active", false);
         country.classed("active", !isActive);

        })
      .merge(update)
        .transition()
        .duration(750)
        // fill：填充颜色
        .attr("fill", d => {
          //这里的d是geoData新添加properties内容后的d 还在geoData.forEach(d)范围内
          var val = d.properties[dataType];
          return val ? mapColorScale(val): "#ccc";
        });
        d3.select(".map-title")
            .text(graphTitle(dataType) + " Cases on " + date.toLocaleString().slice(0,9));
    }
    function graphTitle(str){
      //正则表达式 将所有的A-Z大大写字母变成小写
      return  str[0].toUpperCase() + str.slice(1);

    }
  
 























// function createMap(width, height) {
//   d3.select("#map")
//       .attr("width", width)
//       .attr("height", height)
//     .append("text")
//       .attr("x", width / 2)
//       .attr("y", "1em")
//       .attr("font-size", "1.5em")
//       .style("text-anchor", "middle")
//       .classed("map-title", true);
// }

// function drawMap(geoData, climateData, year, dataType) {
//   var map = d3.select("#map");

//   var projection = d3.geoMercator()
//                      .scale(110)
//                      .translate([
//                        +map.attr("width") / 2,
//                        +map.attr("height") / 1.4
//                      ]);

//   var path = d3.geoPath()
//                .projection(projection);

//   d3.select("#year-val").text(year);

//   geoData.forEach(d => {
//     var countries = climateData.filter(row => row.countryCode === d.id);
//     var name = '';
//     if (countries.length > 0) name = countries[0].country;
//     d.properties = countries.find(c => c.year === year) || { country: name };
//   });

//   var colors = ["#f1c40f", "#e67e22", "#e74c3c", "#c0392b"];

//   var domains = {
//     emissions: [0, 2.5e5, 1e6, 5e6],
//     emissionsPerCapita: [0, 0.5, 2, 10]
//   };

//   var mapColorScale = d3.scaleLinear()
//                         .domain(domains[dataType])
//                         .range(colors);

//   var update = map.selectAll(".country")
//                   .data(geoData);

//   update
//     .enter()
//     .append("path")
//       .classed("country", true)
//       .attr("d", path)
//     .merge(update)
//       .transition()
//       .duration(750)
//       .attr("fill", d => {
//         var val = d.properties[dataType];
//         return val ? mapColorScale(val) : "#ccc";
//       });

//   d3.select(".map-title")
//       .text("Carbon dioxide " + graphTitle(dataType) + ", " + year);
// }

// function graphTitle(str) {
//   return str.replace(/[A-Z]/g, c => " " + c.toLowerCase());
// }























