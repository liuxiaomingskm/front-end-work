var width = 600;
var height = 600;
 var barPadding = 1;
 var padding = 20;
 var minYear = d3.min(birthData, d => d.year);
 var maxYear = d3.max(birthData, d => d.year);
 var yearData = birthData.filter(d => d.year === minYear);

 //d3.histogram()
 //return a function
 //The return function creates bins for data passed into it

 //histogram.value([value])
 //specifies what value should be used when creating bins
 var xScale = d3.scaleLinear()
 				.domain([0, d3.max(yearData, d=> d.births)])
 				.rangeRound([padding, width - padding]);

/* histogram.thresholds([value])
.specifies how the histogram generator should separate your data into bins
.if value is an array, the thresholds will be based on the elements in the array
.if value is a number, D3 will try to make that many bins(but not guarantees!)
*/

/* scale.ticks([count])
.Return approximately count intermediate values from the scale's domain
.You are not guaranteed to get exactly count values!

*/

var histogram = d3.histogram()
					.domain(xScale.domain())
					.thresholds(xScale.ticks())
					.value(d => d.births);

// 通过设置value(d => d.births) 将按照d.births对x轴进行bin划分
var bins = histogram(yearData);



var yScale = d3.scaleLinear()
				.domain([0, d3.max(bins, d=> d.length)])
				.range([height, 0]);

var bars = d3.select("svg")
				.attr("width", width)
				.attr("height", height)
				.selectAll(".bar")
				.data(bins)
				.enter()
				.append("g")
					.classed("bar", true);

bars
	.append("rect")
	.attr("x", (d,i) => xScale(d.x0))
	.attr("y", d => yScale(d.length))
	.attr("height", d => height - yScale(d.length))
	.attr("width",  d => xScale(d.x1) - xScale(d.x0) - barPadding)
	.attr("fill", "#9c27b0");

bars
	.append("text")
	.text(d => d.x0 + "-" + d.x1 + "(bar height:" + d.length + ")")
	.attr("transform", "rotate(-90)")
	.attr("y", d => (xScale(d.x1) + xScale(d.x0)) / 2)
	.attr("x", -height + 10)
	.style("alignment-baseline", "middle");

//set the initial value for range "input"
d3.select("input")
	.property("min", minYear)
	.property("max", maxYear)
	.property("value",minYear)
	.on("input", function(){
		var year = +d3.event.target.value;
		yearData = birthData.filter( d => d.year === year);
		xScale.domain([0, d3.max(yearData, d => d.births)]);
		histogram.domain(xScale.domain())
				.thresholds(xScale.ticks());
		bins =  histogram(yearData);
		yScale.domain([0, d3.max(bins, d => d.length)]);

		bars = d3.select("svg")
				.selectAll(".bar")
				.data(bins);

		bars.exit()
			.remove();

		var  g = bars
					.enter()
					.append("g")
					.classed("bar", true);
		g.append("rect");
		g.append("text");

		g.merge(bars)
			.select("rect")
			.attr("x", (d,j) => xScale(d.x0))
			.attr("y", d => yScale(d.length))
			.attr("height" ,  d => height - yScale(d.length))
			.attr("width", d => {
				var width = xScale(d.x1) - xScale(d.x0) -  barPadding;
				return width < 0 ? 0 :width;
			})
			.attr("fill", "#9c27b0");

		g.merge(bars)
			.select("text")
			.text(d =>d.x0 + "-" + d.x1 + "(bar height: " + d.length + ")")
			.attr("transform", "rotate(-90)")
			.attr("y",  d =>(xScale(d.x1) + xScale(d.x0)) / 2)
			.attr("x", -height + 10)
			.style("alignment-baseline", "middle");

	});


 