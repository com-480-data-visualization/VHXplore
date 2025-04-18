d3.csv("data/pldb.csv").then(csv_data => {

  console.log("Loaded");
  const data = csv_data
    .filter(d => d.rank < 50)
    .filter(d => +d.appeared > 1900)
    .filter(d => d.creators != "")
    .map(d => (
    {
      name: d.title,
      year: +d.appeared,       // Convert string to number
      creator: d.creators
    }

));
  const width = 1000;
  const height = 500;
  const margin = { top: 20, right: 30, bottom: 40, left: 40 };

  const svg = d3.select("#viz1-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([margin.left, width - margin.right]);

  // X-axis
  svg.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

  // Tooltip
  const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // Draw dots
  svg.selectAll(".dot")
  .data(data)
  .enter()
  .append("circle")
  .attr("class", "dot")
  .attr("cx", d => x(d.year))
  .attr("cy", height / 2)
  .attr("r", 5)
  .on("mouseover", (event, d) => {
    // Enlarge the circle
    d3.select(event.currentTarget)
      .transition()
      .duration(200)
      .attr("r", 8);

    // Show tooltip
    tooltip.transition().duration(200).style("opacity", 1);
    tooltip.html(`<strong>${d.name}</strong><br>${d.year}<br>${d.creator}`)
      .style("left", (event.pageX - 40) + "px")
      .style("top", (event.pageY - 80) + "px");
  })
  .on("mouseout", (event, d) => {
    // Shrink the circle back
    d3.select(event.currentTarget)
      .transition()
      .duration(200)
      .attr("r", 5);

    // Hide tooltip
    tooltip.transition().duration(300).style("opacity", 0);
  });

    
});

// Sample data
