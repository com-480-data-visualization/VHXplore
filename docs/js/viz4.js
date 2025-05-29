Promise.all([
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
    d3.csv("data/pldb.csv")
  ]).then(([geoData, csv_data]) => {
    // Country name mapping to align dataset with GeoJSON
    const countryNameMap = {
      "United States": "USA",
      "United Kingdom": "England",
      "Korea": "South Korea",
      "Iran": "Iran (Islamic Republic of)",
      "Vietnam": "Viet Nam",
      // Add more if needed
    };
  
    // Parse and filter CSV
    const filteredData = csv_data
      .filter(d => +d.appeared > 1900)
      .map(d => ({
        name: d.title,
        year: +d.appeared,
        creator: d.creators,
        country: countryNameMap[d.country] || d.country,
        bookcount: +d.bookCount,
        papercount: +d.paperCount,
        number_of_users: +d.numberOfUsers,
        type: d.type,
        originnCommunity: d.originCommunity,
        rank: +d.rank
      }));
      const languageCountsByCountry = d3.rollup(
        filteredData,
        v => v.length,
        d => d.country
      );
      
    const countriesWithLanguages = new Set(
        filteredData.map(d => d.country)
      );
      
    const svg = d3.select("#world-map");
    const tooltip = d3.select("#map-tooltip");
  
    const projection = d3.geoNaturalEarth1()
      .scale(160)
      .translate([960 / 2, 600 / 2]);
  
    const path = d3.geoPath().projection(projection);
  
    // Draw map
    svg.append("g")
      .selectAll("path")
      .data(geoData.features)
      .join("path")
      .attr("d", path)
      .attr("fill", d => countriesWithLanguages.has(d.properties.name) ? "skyblue" : "#ccc")
      .attr("stroke", "#333")
      .on("mouseover", function (event, d) {
        const country = d.properties.name;
        const totalCount = languageCountsByCountry.get(country) || 0;
      
        const entries = filteredData
          .filter(lang => lang.country === country)
          .sort((a, b) => a.rank - b.rank)
          .slice(0, 7);
      
        if (entries.length > 0) {
          const tooltipHTML = `
            <strong>${country}</strong><br>
            <em>Total ${totalCount} programming language${totalCount !== 1 ? "s" : ""} developed</em><br><br>
            <div style= padding-right: 5px;">
              ${entries.map(lang => `
                <div class="tooltip-language">
                  <div><strong>${lang.name}</strong> <span style="color:#888;">(${lang.year})</span></div>
                  <div><em>Community:</em> ${lang.originnCommunity || "N/A"}</div>
                </div>
              `).join("")}
            </div>
          `;
      
          tooltip
            .style("display", "block")
            .html(tooltipHTML);
        } else {
          tooltip
            .style("display", "block")
            .html(`<strong>${country}</strong><br><em>No programming languages found</em>`);
        }
      })
      
      
      .on("mousemove", function (event) {
        const isHoveringTooltip = tooltip.node().matches(':hover');
        if (isHoveringTooltip) return;
  
        tooltip
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px");
      })
      .on("mouseout", function () {
        tooltip.style("display", "none");
      });
  });