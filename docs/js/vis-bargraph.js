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
        papercount: +d.paperCount,
        number_of_users: +d.numberOfUsers,
        type: d.type,
      }
    ))
    .sort((a, b) => a.year - b.year);
    
    const details = d3.select("#viz-bargraph-container")
      .append("div")
      .attr("class", "details")
      .style("opacity", 0);

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

    window.papercount_data = data.map(d => ({
      group: d.name,
      value: d.papercount
    }));
    window.number_of_users_data = data.map(d => ({
      group: d.name,
      value: d.number_of_users
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

        let title="";
        if (rawData === "bookcount_data") {
          title = "Book Count";
        }
        else if (rawData === "papercount_data") {
          title = "Paper Count";
        }
        else if (rawData === "number_of_users_data") {
          title = "Number of Users";
        }

        const titleElement = d3.select("#title")
          .style("opacity", 0)
          .text(title)
          .style("font-size", "24px")
          .style("color", "#9CDCFE")
          .style("font-weight", "bold")
          .style("text-align", "center");
        titleElement.transition()
          .duration(200)
          .style("opacity", 1)

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
      

      // Add a group for hover effects
      const focus = svg.append("g").style("display", "none");

      focus.append("line")
        .attr("class", "hover-line")
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "#999")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "3,3");

      focus.append("circle")
        .attr("r", 6)
        .attr("fill", "red");

      const overlay = svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("mouseover", () => focus.style("display", null))
        .on("mouseout", () => {
          focus.style("display", "none");
          details.transition().duration(500).style("opacity", 0);
        })
        .on("mousemove", mousemove);

        function mousemove(event) {
          const [mouseX] = d3.pointer(event);
          const groupNames = x.domain();
          
          // Find the closest group (x-band)
          const closestGroup = groupNames.reduce((a, b) => {
            return Math.abs(x(b) + x.bandwidth()/2 - mouseX) < Math.abs(x(a) + x.bandwidth()/2 - mouseX) ? b : a;
          });
        
          // Find the corresponding data point
          const d = data.find(d => d.group === closestGroup);
          if (!d) return;
        
          const cx = x(d.group) + x.bandwidth() / 2;
          const cy = y(d.value);
        
          focus.select("line")
            .attr("x1", cx)
            .attr("x2", cx);
        
          focus.select("circle")
            .attr("cx", cx)
            .attr("cy", cy);
        
          // Show details
          details.interrupt()
            .style("opacity", 0)
            .style("border", "solid")
            .style("border-radius", "5px")
            .style("border-color", "#9CDCFE");
        
          details.transition()
            .duration(0)
            .style("opacity", 1);

          const svgRect = svg.node().getBoundingClientRect();
          const scrollX = window.scrollX;
          const scrollY = window.scrollY;
          const pageX = svgRect.left + cx + scrollX;
          const pageY = svgRect.top + cy + scrollY;

          details.html(`<strong>${d.group}</strong><br>Count (Relative Scale): ${d.value}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (pageY - 10) + "px");
        }
        

        // Update bars
      const line = d3.line()
      .x(d => x(d.group) + x.bandwidth() / 2)
      .y(d => y(d.value));
      
      //svg.selectAll("rect").remove(); // remove old bars
      
      const path = svg.selectAll(".line-path")
        .data([data]);
      
      path.enter()
        .append("path")
        .attr("class", "line-path")
        .merge(path)
        .transition()
        .duration(1000)
        .attr("fill", "none")
        .attr("stroke", "#ffd700")
        .attr("stroke-width", 2)
        .attr("d", line);
        
      };


  
    // Initial draw

    update('bookcount_data');
  });
  