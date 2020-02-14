// write your code here!
var width = 800;
var height = 800;
var padding = 50;
var barPadding = 1;
var ageData = regionData.filter(d => d.medianAge !== null);

//定义各种变量
var xScale = d3.scaleLinear()
                .domain(d3.extent(ageData,  d => d.medianAge))
                .rangeRound([padding, width - padding]);

var histogram = d3.histogram()
                    .domain(xScale.domain())
                    .thresholds(xScale.ticks())
                    .value(d => d.medianAge);

var bins = histogram(ageData);

var yScale = d3.scaleLinear()
                .domain([0, d3.max(bins, d => d.length)])
                .range([height - padding, padding]);

var svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height);

            //调整input bar之后，histogram进行相应调整
d3.select("input")
        .property("value", bins.length)
        .on("input", function(){
            var binCount = +d3.event.target.value;
            histogram.thresholds(xScale.ticks(binCount));
            bins = histogram(ageData);
            yScale.domain([0, d3.max(bins, d => d.length)]);
            //重新定义y轴
            d3.select(".y-axis")
                .call(d3.axisLeft(yScale));
            // x轴上的bar-width也跟着改变
            d3.select('.x-axis')
                .call(d3.axisBottom(xScale)
                        .ticks(binCount))
                .selectAll("text")
                .attr("y", -3) //这里的y，x是可能含义是相对于原来的位置，向旋转90度后的y轴移动-3
                .attr("x", 10)//向旋转90度后的x轴移动10
                .attr("transform", "rotate(90)")
                .style("text-anchor", "start"); //选择旋转中心

            var rect = svg
                        .selectAll("rect")
                        .data(bins);
            
            rect
                .exit()
                .remove();
            rect
                .enter()
                .append("rect")
                .merge(rect)
                .attr("x", d => xScale(d.x0))
                .attr("y", d => yScale(d.length)) // yScale会通过yScale的range公式自动转换
                .attr("height", d => height - padding - yScale(d.length))
                .attr("width",  d => xScale(d.x1) - xScale(d.x0) - barPadding)
                .attr("fill", "blue");


            d3.select(".bin-count")
                .text("Number of bins: " + bins.length);
        })

svg.append("g")
    .attr("transform", "translate(0," + (height -  padding) + ")")
    .classed("x-axis", true)
    .call(d3.axisBottom(xScale));

svg.append("g")
    .attr("transform", "translate(" + padding + ", 0)")
    .classed("y-axis", true)
    .call(d3.axisLeft(yScale));

svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 10)
    .style("text-anchor", "middle")
    .text("Median Age");

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", - height / 2)
    .attr("y", 15)
    .style("text-anchor", "middle")
    .text("Frequency");

    //默认最开始的histogram的定义
svg.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length)) // yScale会通过yScale的range公式自动转换
        .attr("height", d => height - padding - yScale(d.length))
        .attr("width",  d => xScale(d.x1) - xScale(d.x0) - barPadding)
        .attr("fill", "blue");


  