d3.json('./sample_topo.json', function(error, data) {
  if (error) throw error;

  var path = d3.geoPath();
  var width = 600;
  var height = 600;

  d3.select('svg')
      .attr('width', width)
      .attr('height', height)
    .selectAll('path')
    .data(topojson.feature(data, data.objects.collection).features)
    .enter()
    .append('path')
      .attr('d', path)
      .attr('fill', d => d.properties.color);
      
});