//Define data
const AQI = d3.csv("annual_aqi_by_county.csv");


AQI.then(function(data) {

  
  // Code in here
  // create SVG
  let 
  width = 800,
  height = 850;

  let margin = {
  top: 30,
  bottom: 40,
  left: 100,
  right: 40
  };

  let svg = d3
  .select('body')
  .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', '#e9f7f2');

  let yScale = d3.scaleBand()
  .domain(
    data.map(d => d.State)
  ) 
  .range([margin.left-100, width - margin.right+50])
  .padding(0.1);

   let xScale = d3.scaleLinear()
  .domain([1000, 0])
  .range([height - margin.bottom-50, margin.top+68]);

  let yAxis = svg
  .append('g')
    .attr('transform', `translate(${margin.left},0)`)
  .call(d3.axisLeft().scale(yScale));

  yAxis
  .append('text')
    .attr('y', -80)
    .attr('x', -300)
    .attr("transform", "rotate(270)")
    .style('stroke', 'black')
    .style("font-size", "15px")
    .text('State');


  let xAxis = svg
    .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom().scale(xScale));

  xAxis
    .append('text')
      .attr('x', 400)
      .attr('y', 30)
      .style('stroke', 'black')
      .style("font-size", "15px")
      .text('Data Value');

  let bar = svg
    .selectAll('rect')
        .data(data)
      .enter()
      .append('rect')
        .attr('x', d => margin.left)
        .attr('y', d => yScale(d.State))
        .attr('height', yScale.bandwidth())
        .attr('width', d => xScale(d.Good_Days) - margin.left)
        .attr('fill', 'steelblue');


  bar
    .on('click', function(d) {
      var rect = d3.select(this);
      var currentColor = rect.attr('fill');
        
      if (currentColor === 'steelblue') {
        rect.transition()
            .delay(50)
            .duration(1000)
            .attr('fill', 'red');
    } else {
        rect.transition()
            .delay(50)
            .duration(1000)
            .attr('fill', 'steelblue'); }
    
            }) 
});