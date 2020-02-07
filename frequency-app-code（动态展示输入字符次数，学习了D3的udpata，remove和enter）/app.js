var width = 800;
var height = 400;
var barPadding = 10;
var svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height); //无论后面附加了多少语句 每次都返回svg这一实体
            

d3.select("#reset")
    .on("click", function(){
        d3.selectAll(".letter")
            .remove();
        d3.select("#phrase")
            .text("");
        d3.select("#count")
            .text("");
    })


d3.select("form")
    .on("submit", function () {
        d3.event.preventDefault();//阻止form的默认行为
        var input = d3.select("input");
        var text = input.property("value");//获得input文本内容
        var data = getFrequencies(text);
        var barWidth = width / data.length - barPadding;
       var letters =  svg
                        .selectAll(".letter")
                        .data(data,function(d){
                            return d.character; //将d.character相同的页面元素和数据捆绑一起
                        })


        letters
            .classed("new",false) //已经存在的data去除"new" class属性
            .exit()
            .remove();


       var letterEnter = letters
            .enter() //将新的data和页面元素捆绑一起
            .append("g")
            .classed("letter", true)
            .classed("new", true);


            letterEnter.append("rect");
            letterEnter.append("text");

            letterEnter.merge(letters)
            .select("rect")
            .style("width", barWidth)
            .style("height",function(d){
                return d.count * 20 ;//根据重复次数设置高度
            })
            .attr("x",function(d,i){
                return (barWidth + barPadding) * i;
            })
            .attr("y", function(d){
                return height - d.count * 20;
            });
        letterEnter.merge(letters)
        .select("text") 
        .attr("x", function(d,i){
            return (barWidth + barPadding) * i  + barWidth / 2;
        })
        .attr("text-anchor", "middle")
        .attr("y",function(d){
            return height - d.count*20 - 10;
        })
        .text(function(d){
            return d.character;
        })
        
        

        d3.select("#phrase")
            .text("Analysis of : " + text);

        d3.select("#count")
            .text("(New characters:" + letters.enter().nodes().length + ")");//letters.enter().nodes().length有点小困惑
        input.property("value", "");
    });







function getFrequencies(str) {
    var sorted = str.split("").sort();
    var data = [];
    for (var i = 0; i < sorted.length;i++){
        var last = data[data.length - 1];
        if (last && last.character === sorted[i]) last.count++;
        else data.push({character:sorted[i], count: 1});
    }
    return data;
}

