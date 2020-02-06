d3.select(".remove")
    .on("click", function(){
        d3.selectAll(".note")
            .remove();
    })

d3.select(".lucky")
    .on("click", function(){
        d3.selectAll(".note")
            .style("font-size", function(){
                return Math.random()*100 + "px";
            });
    });
var input = d3.select("input");
var preview = d3.select(".preview");
d3.select("#new-note").on("submit", function(){
    d3.event.preventDefault(); //取消event的默认行为--即按下button之后提交的行为

    d3.select("#notes")
        .append("p")
        .classed("note",true)
        .text(input.property("value"));
    input.property("value","");
    setPreview("");
});

input.on("input", function(){
    var note = d3.event.target.value;//event target是引发事件的element
setPreview(note);
})



function setPreview(val){
    preview.text(val)
    .classed("hide", val ==="");

}

d3.select("#quotes")
    .style("list-style", "none")
    .selectAll("li")
    .data(quotes)
    .enter()
    .append("li")
    .text(function(d){
        return d.quote;
    })
    .style("margin","20px")
    .style("padding", "20px")
    .style("font-size",function(d){
        return d.quote.length < 25? "2em" : "1em";
    })
