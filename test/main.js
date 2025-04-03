d3.csv("/Milestones/milestone1/pldb.csv", function(data) {
    console.log("Loaded");
  
    // Filter the data to only include the columns you want
    const filtered_data = data.map(function(d) {
      return {
        title: d.title,       // Name of the language (for x-axis)
        appeared: +d.appeared // Convert 'appeared' to a number for y-axis
      };
    });
    console.log(filtered_data);
  
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
  
    // Create the SVG container
    const svg = d3.select('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
    // Create x and y scales
    const x = d3.scaleBand()
      .domain(filtered_data.map(d => d.title)) // Using 'title' for the x-axis
      .range([0, width])
      .padding(0.1);  // Padding between bars
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(filtered_data, d => d.appeared)]) // Using 'appeared' for y-axis
      .nice()  // Rounds the axis ticks
      .range([height, 0]);
  
    // Append the bars
    svg.selectAll('.bar')
      .data(filtered_data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.title)) // Set x-position based on 'title'
      .attr('y', d => y(d.appeared)) // Set y-position based on 'appeared'
      .attr('width', x.bandwidth())  // Width of each bar
      .attr('height', d => height - y(d.appeared));  // Height of each bar
  
    // Add x-axis
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(5));
  
    // Add y-axis
    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y).ticks(5));
  
  });
  