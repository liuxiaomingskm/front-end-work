var minYear = d3.min(birthData, d => d.year);
var maxYear = d3.max(birthData, d => d.year);
var width = 600;
var height = 600;


var continents = [];
for (var i = 0; i < birthData.length; i++){
    var continent = birthData[i].continent;
    if (continents. indexOf(continent) === -1){
        continents.push(continent);
    }
}

var colorScale = d3.scaleOrdinal()
                    .domain(continents)
                    .range(d3.schemeCategory10);

d3.select('svg')
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + ',' + height / 2 + ')') // 因为pie chartd默认以组为单位，并且
    //饼图的圆心默认是组的左上顶点也就是svg的左上点，所以需要修改位置
    .classed('chart', true);

d3.select('input')
        .property('min', minYear)
        .property('max', maxYear)
        .property('value', minYear)
        .on('input', function(){
            makeGraph(+d3.event.target.value);
        });

makeGraph(minYear);
    


     
//refactor the function to make it simple
function makeGraph(year) {
    var yearData = birthData.filter(d => d.year === year);
    // d3.pie()
    // returns a function
    // the returned function transforms data
    //like d3.histogram, has a value method,arc组成：index记录排序顺序，值越大，index越小
var arcs = d3.pie()
            .value(d => d.births)
            .sort(function(a,b){
                if (a.continent < b.continent){return -1;}
                else if (a.continent > b.continent){ return 1;}
                else return a.births - b.births;
            })
            (yearData);

//d3.arc() converts Javascript objects into path commands
var path = d3.arc()
            .outerRadius(width / 2 - 10) //外圈半径，最好不小于内卷半径，也不能特别大，特别大会显示正方形
            .innerRadius(width / 4)// innerRadius为内圈半径 如果为0 显示实心圆形，大于0 显示镂空圆形
            .padAngle(0.02) //不相同块之间的距离
            . cornerRadius(5);//每个块的边角弧度

var update = d3.select('.chart')//很奇怪 chart类和arc类都不存在不报错？ ，莫非自己创建？
                .selectAll('.arc')
                .data(arcs);
    update
        .exit()
        .remove();
    
    update
        .enter()
        .append('path')
        .classed('arc', true)
        .merge(update)
        .attr('fill', d => colorScale(d.data.continent)) // 这里的d是arcs的元素， arc自带data对象存储原来的所有数据
        .attr('stroke', 'black')
        .attr('d', path);

}


