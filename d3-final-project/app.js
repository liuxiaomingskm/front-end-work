// 1. get data into JS
// 2. make map
// 3. make pie chart
// 4. make bar chart
// 5. tooltip!

d3.queue()
  .defer(d3.json, "//unpkg.com/world-atlas@1.1.4/world/50m.json")
  .defer(d3.csv, "./data/world_COVID19_data.csv", function (row){
            return {
              continent: row.Continent,
              country: row.Country,
              countryCode: row["Country Code"],
              date:  row["Date"].slice(0,4) + "-" + row["Date"].slice(4,6) + "-" + row["Date"].slice(6,8),
              confirmed: + row["Confirmed"],
              region: row.Region,
              suspected: + row.Suspected,
              death: + row.Death,
              recovered: + row.Recovered
            }
  })
  .await(function(error, mapData, dataSet){
    var data = dataSet;
    var dateFormat = d3.timeParse("%Y-%m-%d");
    data.forEach(function(d){
      d.date = dateFormat(d.date);
    });

    console.log("data", data);
    console.log("data",data[0].continent);
    if (error) throw error;
    var extremeDates = d3.extent(data, d => d.date);
    var currentDate = extremeDates[0];
    //console.log("extremeDates", extremeDates);
    //很奇怪的选择radio的方式
    var currentDataType = d3.select('input[name="data-type"]:checked')
                              .attr("value");
    console.log("mapData", mapData);
    console.log("topojson.feature(....)", topojson.feature(mapData, mapData.objects.countries));
    
    /*
    topojson.feature(....) 返回对象 {type: "FeatureCollection", features: Array(241)}
    When you call the topojson.feature() function you’re inputting the 2 counties data sets into the function 
    and creating a topojson object, which has a method called .features that you use as your D3 dataset. 
    topojson itself never sends any info into d3, nor does it attach paths to the svg. 
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
    drawMap(geoData, data,currentDate, currentDataType);
    drawPie(data, currentDate);
    drawBar(data, currentDataType,"");

    d3.select("#date")
     
        .on("input", () =>{
          currentDate = d3.event.target.value;
          console.log("input currentDate", currentDate);
          console.log("currentDate类型",typeof(currentDate));
          currentDate = dateFormat(currentDate);
          drawMap(geoData, data,currentDate, currentDataType);
          drawPie(data, currentDate);
          highlightBars(currentDate);
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
              drawMap(geoData,data,currentDate, currentDataType);
              drawBar(data, currentDataType, country);
              drawPie(data, currentDate);
            });


//Tooltip function
    d3.selectAll("svg")
              .on("mousemove touchmove", updateTooltip);

    function updateTooltip(){
      var tooltip = d3.select(".tooltip");
      var tgt =  d3.select(d3.event.target);
      //console.log("target", tgt);
      var isCountry = tgt.classed("country");
      var isBar = tgt.classed("bar");
      var isArc = tgt.classed("arc");
      var dataType = d3.select("input:checked")
                        .property("value");
      
      var data;
      var percentage = "";
      //If data is not specified, data() method returns the array of data for the selected elements.
      //data()返回target的捆绑的所有数据 默认是数组，Country、饼图、柱状图捆绑的数据格式是不一样的 所以要逐个考虑
      if (isCountry) {
        //console.log("Country Data", tgt.data());
        data = tgt.data()[0].properties;
      }
      
      if (isArc) {
        //console.log("Arc data", tgt.data());
        data = tgt.data()[0].data;
        //给拼图增加百分比选项
        percentage = `<p>Percentage of total: ${getPercentage(tgt.data()[0])}</p>`;
        };

      if (isBar) {
        //console.log("Bar data", tgt.data());
        data = tgt.data()[0];
      };
    
      tooltip
        .style("opacity", +(isCountry || isArc || isBar))
        .style("left", (d3.event.pageX - tooltip.node().offsetWidth / 2) + "px")
        .style("top", (d3.event.pageY - tooltip.node().offsetHeight - 10) + "px");
        if (data){
          var dataValue = data[dataType] ?
          //javascript toLocaleString转换number => 字符串
            data[dataType].toLocaleString() + " " + "Cases" :
            "Data not Available";
          tooltip
            .html(`
              <p>Country: ${data.country}</p>
            <p>${formatDataType(dataType)}: ${dataValue}</p>
            <p>Date: ${data.date.toLocaleString().slice(0,9) || d3.select("#date").property("value")} </p>
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




  

















