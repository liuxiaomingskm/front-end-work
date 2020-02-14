var width = 600;
var height = 600;
var padding = 50;

var data = regionData.filter(mustHaveKeys);

var xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.adultLiteracyRate))
    .range([padding, width - padding]);

var yScale = d3.scaleLinear()
    .domain(d3.extent(data, d=> d.subscribersPer100))
    .range([height - padding, padding]);

var rScale = d3.scaleLinear()
    .domain(d3.extent(data, d=> d.medianAge))
    .range([5,30]);

var fScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.urbanPopulationRate))
    .range(["green","blue"]);

var xAxis = d3.axisBottom(xScale)
            .tickSize(-height + 2 * padding)
            .tickSizeOuter(0);

var yAxis = d3.axisLeft(yScale)
            .tickSize(-width + 2 * padding)
            .tickSizeOuter(0);


var svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);

//create the x axis
svg.append("g")
    .attr("transform", "translate(0," + (height - padding) + ")") //x轴的起始点是左下点
    .call(xAxis);

//create the y axis
svg.append("g")
    .attr("transform", "translate(" + padding + ",0)") // y轴的起始点是左上点
    .call(yAxis);

//lable on x Axis
svg.append("text")
    .attr("x", width / 2)
    .attr("y", (height - padding))
    .attr("dy", padding / 2)
    .style("text-anchor", "middle")
    .text("Literacy Rate, Anged 15 and up");

//lable on y Axis
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("dy", padding / 2)
    .style("text-anchor", "middle")
    .text("Cellular subscribers per 100 People");

//scatterplot title
svg.append("text")
    .attr("x", width / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-size", "2em")
    .text("Cellular Subscriptions vs. Literacy Rate");


svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx", d => xScale(d.adultLiteracyRate))
        .attr("cy", d => yScale(d.subscribersPer100))
        .attr("r", d => rScale(d.medianAge))
        .attr("fill", d => fScale(d.urbanPopulationRate))
        .attr("stroke", "#fff")



function mustHaveKeys(obj){
    var keys = [
        "subscribersPer100"
        ,"adultLiteracyRate"
        ,"medianAge"
        ,"urbanPopulationRate"
    ];
    for (var i = 0; i < keys.length; i++){
        if (obj[keys[i]] === null){
            return false;
        }

    }
    return true;
}
