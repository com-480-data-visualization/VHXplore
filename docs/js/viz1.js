d3.csv("data/pldb.csv").then(csv_data => {
  console.log("Loaded");
  const data_unfiltered = csv_data
    .filter(d => d.rank < 3000)    // filter expects callback function (criterion) to be applied to all rows. If true, it keeps otherwise it discards.
    .filter(d => +d.appeared > 1950)
    .filter(d => d.creators != "")
    .map(d => (                 // Map expects callback funciton which defines mapping and this is applied to all rows
    {
      name: d.title,
      year: +d.appeared,       // Convert string to number
      creator: d.creators,
      country: d.country,
      bookcount: +d.bookCount,
      type: d.type,
    }
));
  const seen = new Map();
  const data = data_unfiltered.filter(d => {
    const existing = seen.get(d.year);
    if(!existing || existing.rank > d.rank){
      seen.set(d.year, d);
      return true;
    }
    return false;
  });
  console.log(data.sort((a, b) => a.year - b.year));

  const width = 1340;
  const height = 300;
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
    .call(d3.axisBottom(x).tickFormat(d3.format("d")))
    .selectAll("text")
    .style("font-size", "20px")
    .style("transform", "translate(0%, 50%)");


  const details = d3.select("#viz1")
    .append("div")
    .attr("class", "details")
    .style("opacity", 0)

  // Draw dots
  svg.selectAll(".dot")
  .data(data)
  .enter()
  .append("circle")
  .attr("class", "dot")
  .attr("cx", d => x(d.year))
  .attr("cy", height-margin.bottom)
  .attr("r", 8)
  
  .on("mouseout", (event, d) => {
    // Shrink the circle back
    d3.select(event.currentTarget)
      .transition()
      .duration(200)
      .attr("r", 8)
      .style("fill", "#6A9955");
  })

  .on("mouseover", (event, d) => {
    d3.select(event.currentTarget)
      .transition()
      .duration(200)
      .attr("r", 10)
      .style("fill", "red");
    // Show alert with name and year
    details.interrupt()
    .style("opacity", 0)
    .style("border", "solid")
    .style("border-radius", "5px")
    .style("border-color", "#9CDCFE");

    details.transition()
    .duration(1000)
    .style("opacity", 1)
    .on("end", function repeat() {
      d3.select(this)
        .transition()
        .duration(5000)
        .style("border-color", "#9CDCFE")
        .transition()
        .duration(5000)
        .style("border-color", "#9CDCFE")
        .on("end", repeat);  // Recurse anonymously
    });


    if(d.type == "pl"){
      type = "Programming Language";
    }
    details.html(`<strong>${d.name}</strong><br>${d.year}<br>${d.creator} <br>Type:${type}`)
    
    const dotRect = event.currentTarget.getBoundingClientRect();
    const detailRect = details.node().getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    
    const dotX = dotRect.left + dotRect.width / 2 + scrollX;
    const dotY = dotRect.top + dotRect.height / 2 + scrollY;
    const detailX = detailRect.left + detailRect.width / 2 + scrollX;
    const detailY = detailRect.top + detailRect.height / 2 + scrollY;
    
    // Midpoint x between dot and detail box for the elbow
    const midX = (dotX + detailX) / 2;
    const midY = (dotY + detailY + detailRect.height/2) / 2 ;

    // Optional: adjust target Y to be at center or bottom of box
    const targetX = detailX;
    const targetY = detailY+detailRect.height/2;

    // Build a square/angled path
    const pathData = `
      M ${dotX},${dotY}
      L ${dotX},${midY}
      L ${targetX},${midY}
      L ${targetX},${targetY}
    `;

    // Remove existing path
    d3.select("#line-overlay").selectAll("path").remove();

    // Draw the new path with transition
    d3.select("#line-overlay")
      .append("path")
      .attr("d", pathData)
      .attr("fill", "none")
      .attr("stroke", "#9CDCFE")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", function () {
        return this.getTotalLength();
      })
      .attr("stroke-dashoffset", function () {
        return this.getTotalLength();
      })
      .transition()
      .duration(500)
      .attr("stroke-dashoffset", 0);

  }
  );

});

// Sample data
