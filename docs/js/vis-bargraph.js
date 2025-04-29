d3.csv("data/pldb.csv").then(csv_data => {
    console.log("csv file loaded");
  
    const data = csv_data
      .filter(d => d.rank < 150)
      .filter(d => +d.appeared > 1900)
      .filter(d => d.creators != "")
      .map(d => ({
        name: d.title,
        year: +d.appeared,
        creator: d.creators,
        country: d.country,
        bookcount: +d.bookCount,
        type: d.type,
      }
    ))
    .sort((a, b) => a.year - b.year);
  
    // Build data1 from CSV
    window.bookcount_data = data.map(d => ({
      group: d.name,
      value: d.bookcount
    }));
  
    // A smaller hardcoded dataset for testing
    window.appeared_data = data.map(d => ({
      group: d.name,
      value: d.year
    }));
  
    // Set up chart dimensions
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 1360 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
  
    // Create SVG container
    var svg = d3.select("#viz-bargraph-container")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    // Create scales
    var x = d3.scaleBand()
      .range([0, width])
      .padding(0.2);
  
    var y = d3.scaleLinear()
      .range([height, 0]);
  
    // Append axes
    var xAxisGroup = svg.append("g")
      .attr("transform", "translate(0," + height + ")");
  
    var yAxisGroup = svg.append("g")
      .attr("class", "myYaxis");
  
    // Global update function
    window.update = function(rawData) {
        console.log("update called");
      
        const isString = typeof rawData === "string";
        const data = isString ? window[rawData] : rawData;
      
        // Update x domain and redraw x axis
        x.domain(data.map(d => d.group));
        xAxisGroup
          .transition()
          .duration(1000)
          .call(d3.axisBottom(x))
          .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");
      
        // 🔥 Custom Y-scale logic
        if (isString && rawData === "appeared_data") {
          // Fixed Y range for years
          y.domain([1950, 2025]);
        } else {
          // Auto-scale for other datasets
          y.domain([0, d3.max(data, d => d.value)]);
        }
      
        yAxisGroup
          .transition()
          .duration(1000)
          .call(d3.axisLeft(y));
      
        // Update bars
        const bars = svg.selectAll("rect")
          .data(data);
      
        bars.exit().remove();
      
        bars.enter()
          .append("rect")
          .merge(bars)
          .transition()
          .duration(1000)
            .attr("x", d => x(d.group))
            .attr("y", d => y(d.value))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("fill", "#ffd700");
      };
      
  
    // Initial draw
    update('appeared_data');
  });
  