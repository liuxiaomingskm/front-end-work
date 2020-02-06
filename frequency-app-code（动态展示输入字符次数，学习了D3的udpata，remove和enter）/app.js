// write your code here!


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

       var letters =  d3.select("#letters")
                        .selectAll(".letter")
                        .data(getFrequencies(text),function(d){
                            return d.character; //将d.character相同的页面元素和数据捆绑一起
                        })


        letters
            .classed("new",false) //已经存在的data去除"new" class属性
            .exit()
            .remove();


       letters
            .enter() //将新的data和页面元素捆绑一起
            .append("div")
            .classed("letter", true)
            .classed("new", true)
            .merge(letters)
            .style("width", "20px")
            .style("line-height","20px")
            .style("margin-right", "5px")
            .style("height",function(d){
                return d.count * 20 + "px";//根据重复次数设置高度
            })
            .text(function(d){
                return d.character;
            });
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

