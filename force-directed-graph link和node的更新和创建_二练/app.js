d3.csv('./senate_committee_data.csv', function(d, i, headers) {
  //统计所有该参议员参加的所有委员会，headers是所有的csv的属性
  var committees = headers.slice(2).filter(h => d[h] === '1');
  return {
    name: d.name,
    party: d.party,
    committees: committees
  }
}, function(error, nodes) {
  if (error) throw error;

    var links = makeLinks(nodes);
    // console.log("nodes",nodes);
    // console.log("links", links);
    var width = 750;
    var height = 750;
    var svg = d3.select('svg')
                  .attr("width", width)
                  .attr("height", height);

    var linkGp = svg.append('g')
                      .classed('links', true);
    
    var nodeGp = svg.append('g')
                      .classed('nodes', true);


/*
links经过forceLink处理后 单个link形式如下， 原因是nodes含有参议员相关信息，links一开始只有
起点和终点参议员， 经过forceLink函数处理后，每个参议员的信息都添加到起点和终点参议员json中
{source: {…}, target: {…}, index: 0}  具体明细如下=> 
source: {name: "John Barrasso", party: "R", committees: Array(1), index: 0, x: 526.0322066233481, …}
target: {name: "Ben Cardin", party: "D", committees: Array(2), index: 5, x: 508.58043624930303, …}
index: 0
                      */
    var simulation = d3.forceSimulation(nodes)
            .force('charge', d3.forceManyBody().strength(-100))
            .force('center', d3.forceCenter(width / 2, height /2))
            .force('link', d3.forceLink(links)
                                .distance( d=> {
                                  // console.log(d);
                                  var count1 = d.source.committees.length;
                                  var count2 = d.target.committees.length;  
                                  return 25 * Math.max(count1,count2);})
                                .id(d => d.name))

            .on("tick", () => {
              linkGp
                    .selectAll('line')
                    .attr('x1', d => d.source.x)
                    .attr('y1', d => d.source.y)
                    .attr('x2', d => d.target.x)
                    .attr('y2', d => d.target.y);

                nodeGp
                  .selectAll("circle")
                  .attr('cx', d => d.x)
                  .attr('cy', d => d.y)

            });
            graph(nodes, links);
            setUpCheckBoxes(nodes.columns.slice(2));

  function graph(nodeData, linkData){
            var partyScale = d3.scaleOrdinal()
                            .domain(['D','R','I'])
                            .range(['blue','red','#ccc']);

            var nodeUpdate = nodeGp
                              .selectAll('circle')
                              .data(nodeData, d => d.name);

                nodeUpdate
                  .exit()
                  .remove();

                nodeUpdate
                    .enter()
                    .append("circle")
                       .attr("r", 15)
                       .attr('fill', d => partyScale(d.party))
                       .attr('stroke', 'white')
                       .attr('stroke-width', 3)
                       .call(d3.drag()
                                  .on('start', dragStart)
                                  .on('drag', drag)
                                  .on('end', dragEnd))
                        .on("mousemove touchmove", showTooltip)
                        .on("mouseout touchend", hideTooltip);

            var linkUpdate = linkGp
                                .selectAll("line")
                                //注意这里 target.name不能保证唯一性， 但是target+source可以保证唯一性
                                .data(linkData, d => d.source.name + d.target.name);
                              
                linkUpdate
                        .exit()
                        .remove();

                linkUpdate
                        .enter()
                        .append("line");
                              }


  function setUpCheckBoxes(committees){
    var boxAreas = d3.select("#checkboxes")
          .selectAll("div")
          .data(committees)
          .enter()
          .append("div");

    boxAreas
        .append("label")
        .property("for", d =>d)
        .text(d => d);
    boxAreas
        .append('input')
        //checkbox是input里面的一个类型
        .property("type","checkbox")
        // name指哪几个checkbox是属于同一个selection
        .property("name", "committee")
        //value属性用来返回checkbox的值
        .property("value", d => d)
        .property('checked', true)
        .on("click", () =>{

          //浏览checkbox 哪些被勾上了
            var activeCommittees =committees.filter(c => d3.select(`input[value = "${c}"]`)
                    .property("checked"));
            var newNodes = nodes.map(n => {
              return {
                name: n.name,
                party: n.party,
                //这里只是计算哪些议员在active committees里面，对于不在active committes里面的
                //议员 议员信息还是存在的 只不过committees为空集
                committees: n.committees.filter(c =>
                  activeCommittees.includes(c)),
                  x:n.x,
                  y:n.y,
                  vx:n.vx,
                  vy:n.vy
              }//剔除 committees为空集的议员
            }).filter(n => n.committees.length > 0);
            var newLinks = makeLinks(newNodes);
            graph(newNodes, newLinks);
            simulation.nodes(newNodes)
                      .force("link")
                      .links(newLinks);
            simulation.alpha(0.5).restart();

        });

  }

  function showTooltip(d){

        var tooltip = d3.select(".tooltip");
         tooltip
              .style("opacity", 1)
              .style("left", (d3.event.x - tooltip.node().offsetWidth / 2) + 'px')
              .style("top", (d3.event.y + 10) + 'px')
              .html(() => {
          
                var committees =  d.committees.map(c => `<li>${c}</li>`).join('')
              
                return `
                <p>${d.name}(${d.party})</p>
                <p>Committtees</p>
                <ol>${committees}</ol>
                `
              });
  }

  function hideTooltip(){
    d3.select(".tooltip")
          .style("opacity",0);
  }

  function dragStart(d){
    simulation.alphaTarget(0.5).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function drag(d){

    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  function dragEnd(d){
     simulation.alphaTarget(0);
     d.fx = null;
     d.fy = null;
  }



  function makeLinks(nodes){
    var links = [];
    for (var i = 0; i < nodes.length; i++){
      for (var j = i + 1; j < nodes.length; j++){
        var s1 = nodes[i];
        var s2 = nodes[j];
        for (var k = 0; k < s1.committees.length; k++){
          var committee = s1.committees[k];
          if (s2.committees.includes(committee)){
            links.push({
              source: s1.name,
              target: s2.name
            });
            break;;
          }
        }

      }
    }
    return links;
  }

});