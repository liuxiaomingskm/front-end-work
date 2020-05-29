function createBar(width, height){
    var bar = d3.select("#bar")
                .attr("width", width)
                .attr("height", height);

   /* The <g> SVG element is a container used to group other SVG elements.
Transformations applied to the <g> element are performed on its child elements, 
and its attributes are inherited by its children. It can also group multiple elements 
to be referenced later with the <use> element.  
   */
                bar.append("g")
            .classed("x-axis", true);
    bar.append("g")
            .classed("y-axis", true);
    //y轴标题
    bar.append("text")
        .attr("transform", "rotate(-90)")
    //根据理解 应该是逆时针旋转90度后 X Y轴互换 所以才有x向下一半高度  但是为什么是负一半不太明白~
        .attr("x", -height / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size","1em")
        .classed("y-axis-label", true);

    //bar表的titile
    bar.append("text")
        .attr("x", width / 2)
        .attr("y","1em")
        .attr("font-size", "1.5em")
        .style("text-anchor","middle")
        .classed("bar-title", true);

}
//相同日期的bar高亮显示
function highlightBars(date){
    d3.select("#bar")
        .selectAll("rect")
            .attr("fill",  d=> d.date.getTime() === date.getTime() ? "#16a085":"#1abc9c");
}

function drawBar(data, dataType, country){

    var bar = d3.select("#bar");
    var padding = {
        top: 30,
        right: 30,
        bottom: 30,
        left: 110
    };
    var barPadding = 1;
    var width = +bar.attr("width");
    var height = +bar.attr("height");
    var countryData = data.filter(d =>d.country === country)
                        .sort((a,b) => a.date.getTime() - b.date.getTime());

    //console.log("extent", d3.extent(data, d => d.date));
    var xScale = d3.scaleTime()
                    .domain(d3.extent(data, d => d.date))
                    .range([padding.left, width - padding.right]);

    var yScale = d3.scaleLinear()
                        .domain([0, d3.max(countryData, d => d[dataType])])
                        .range([height - padding.bottom, padding.top]);
    // 稍有疑问
    //因为年份是递增的 所以宽度相同 domain()返回数组[1990,2011], 所以barwidth是 1991年的xScale - 1990年的xScale
    //
    var dateFormat = d3.timeParse("%Y-%m-%d");
    var barWidth = xScale(dateFormat("2020-1-23")) - xScale.range()[0];
    console.log("xScale.domain()",xScale.domain());
    console.log("xScale.range()", xScale.range());
    console.log("barWidth", barWidth);

    var xAxis = d3.axisBottom(xScale)
                    //.tickFormat(d3.format(".0f"));// 看看去除后效果如何
//设置X轴并且调整刻度和文字倾斜度
    d3.select(".x-axis")
        .attr("transform", "translate(0, " + (height - padding.bottom) + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y",15)
        .attr("x",-10)
        .attr("dy", ".35em")
        .attr("transform", "rotate(-15)")
        .style("text-anchor", "center");

    var yAxis = d3.axisLeft(yScale);

    d3.select(".y-axis")
            .attr("transform", "translate(" + (padding.left - barWidth / 2) + ",0)")
            .transition()
            .duration(800)
            .call(yAxis);
    // 需要修改
    var axisLabel = "Daily Cases";

    var barTitle =  country ? "Daily Trend of " + country : "Click on a country to see daily trends.";
    
    d3.select(".y-axis-label")
            .text(axisLabel);

    d3.select(".bar-title")
        .text(barTitle);

    var t = d3.transition()
                .duration(800)
                .ease(d3.easeBounceOut);

    var update = bar
                    .selectAll('.bar')
                    .data(countryData);
    update
        .exit()
        .transition(t)
        
        .delay((d,i, nodes) => (nodes.length - i - 1) * 50)
        .attr("y", height - padding.bottom)
        .attr("height", 0)
        .remove();

    
    update
        .enter()
        .append("rect")
            .classed("bar", true)
            .attr("y", height - padding.bottom)
            .attr("height", 0)
        .merge(update)
            .attr("x", d => (xScale(d.date) + xScale(d.date -1)) / 2)
            .attr("width", barWidth -  barPadding)
            .transition(t)
            .delay((d,i) => i * 50)
                .attr("y", d => yScale(d[dataType]))
                .attr("height", d => height - padding.bottom - yScale(d[dataType]));
}
