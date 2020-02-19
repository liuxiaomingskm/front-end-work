// 1. get data into JS
// 2. make map
// 3. make pie chart
// 4. make bar chart
// 5. tooltip!

d3.queue()
  .defer(d3.json, "//unpkg.com/world-atlas@1.1.4/world/50m.json")
  .defer(d3.csv, "./data/all_data.csv", function (row){
            return {
              continent: row.Continent,
              country: row.Country,
              countryCode: row["Country Code"],
              emissions: +row["Emissions"],
              emissionsPerCapita: + row["Emissions Per Capita"],
              region: row.Region,
              year: + row.Year
            }
  })
  .await(function(error, mapData, data){
    console.log("mapData", mapData);
    if (error) throw error;

    var extremeYears = d3.extent(data, d => d.year);
    var currentYear = extremeYears[0];
    //很奇怪的选择radio的方式
    var currentDataType = d3.select('input[name="data-type"]:checked')
                              .attr("value");
    console.log("topojson.feature(....)", topojson.feature(mapData, mapData.objects.countries));
    /*
    topojson.feature(....) 返回对象 {type: "FeatureCollection", features: Array(241)}
    */
    var geoData = topojson.feature(mapData, mapData.objects.countries).features;
          
    console.log("geoData",geoData);
    var width = +d3.select(".chart-container")
                    .node().offsetWidth; //node()返回第一个符合条件的对象，offsetWidth：宽度（包含border和padding）
    // pie's height
    var height = 300;

    createMap(width, width * 4 / 5);
    createPie(width, height);
    createBar(width, height);
    drawMap(geoData, data,currentYear, currentDataType);
    drawPie(data, currentYear);
    drawBar(data, currentDataType,"");

    d3.select("#year")
        .property("min", currentYear)
        .property("max", extremeYears[1])
        .property("value", currentYear)
        .on("input", () =>{
          currentYear = +d3.event.target.value;
          drawMap(geoData, data,currentYear, currentDataType);
          drawPie(data, currentYear);
          highlightBars(currentYear);
        });

    d3.selectAll('input[name="data-type"]')
            .on("change", () =>{
              //查看是否有active country，针对柱状图 稍有疑问，待后续解决~ /已解决
              console.log("d3.select(.active)", d3.select(".active").data());
              // data()返回的是捆绑的data的数组， active是一个对象
              var active = d3.select(".active").data()[0];
              console.log("active", active);
              var country = active ? active.properties.country : "";
              currentDataType = d3.event.target.value;
              drawMap(geoData,data,currentYear, currentDataType);
              drawBar(data, currentDataType, country);
            });


//Tooltip function
    d3.selectAll("svg")
              .on("mousemove touchmove", updateTooltip);

    function updateTooltip(){
      var tooltip = d3.select(".tooltip");
      var tgt =  d3.select(d3.event.target);
      var isCountry = tgt.classed("country");
      var isBar = tgt.classed("bar");
      var isArc = tgt.classed("arc");
      var dataType = d3.select("input:checked")
                        .property("value");
      var units = dataType === "emissions" ? "thousand metric tons" : "metric tons per capita"; 
      var data;
      var percentage = "";
      //If data is not specified, data() method returns the array of data for the selected elements.
      if (isCountry) data = tgt.data()[0].properties;
      if (isArc) {
        data = tgt.data()[0].data;
        //给拼图增加百分比选项
        percentage = `<p>Percentage of total: ${getPercentage(tgt.data()[0])}</p>`;
        }
      if (isBar) data = tgt.data()[0];
      tooltip
        .style("opacity", +(isCountry || isArc || isBar))
        .style("left", (d3.event.pageX - tooltip.node().offsetWidth / 2) + "px")
        .style("top", (d3.event.pageY - tooltip.node().offsetHeight - 10) + "px");
        if (data){
          var dataValue = data[dataType] ?
            data[dataType].toLocaleString() + " " + units :
            "Data not Available";
          tooltip
            .html(`
              <p>Country: ${data.country}</p>
            <p>${formatDataType(dataType)}: ${dataValue}</p>
            <p>Year: ${data.year || d3.select("#year").property("value")} </p>
            ${percentage}
            `)

        }
    }

  });
  //将emission的首字母变成大写
  function formatDataType(key){
    return key[0].toUpperCase() + key.slice(1).replace(/[A-Z]/g, c => " " + c);
  }

// 计算arc的百分比
function getPercentage(d){
  var angle = d.endAngle - d.startAngle;
  var fraction = 100 * angle /(Math.PI * 2);
  return fraction.toFixed(2) + "%";
}




  // d3.queue()
  // .defer(d3.json, "//unpkg.com/world-atlas@1.1.4/world/50m.json")
  // .defer(d3.csv, "./data/all_data.csv", function(row) {
  //   return {
  //     continent: row.Continent,
  //     country: row.Country,
  //     countryCode: row["Country Code"],
  //     emissions: +row["Emissions"],
  //     emissionsPerCapita: +row["Emissions Per Capita"],
  //     region: row.Region,
  //     year: +row.Year
  //   }
  // })
  // .await(function(error, mapData, data) {
  //   if (error) throw error;

  //   var extremeYears = d3.extent(data, d => d.year);
  //   var currentYear = extremeYears[0];
  //   var currentDataType = d3.select('input[name="data-type"]:checked')
  //                           .attr("value");
  //   var geoData = topojson.feature(mapData, mapData.objects.countries).features;

  //   var width = +d3.select(".chart-container")
  //                  .node().offsetWidth;
  //   var height = 300;

  //   createMap(width, width * 4 / 5);
  //   createPie(width, height);
  //   drawMap(geoData, data, currentYear, currentDataType);
  //   drawPie(data, currentYear);

  //   d3.select("#year")
  //       .property("min", currentYear)
  //       .property("max", extremeYears[1])
  //       .property("value", currentYear)
  //       .on("input", () => {
  //         currentYear = +d3.event.target.value;
  //         drawMap(geoData, data, currentYear, currentDataType);
  //         drawPie(data, currentYear);
  //       });

  //   d3.selectAll('input[name="data-type"]')
  //       .on("change", () => {
  //         currentDataType = d3.event.target.value;
  //         drawMap(geoData, data, currentYear, currentDataType);
  //       });
  // });





















