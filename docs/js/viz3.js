const margin = { top: 20, right: 20, bottom: 50, left: 100 };
const width = 500 - margin.left - margin.right;
const height = 450 - margin.top - margin.bottom;

d3.csv("data/alldata_processed.csv", d3.autoType).then(data => {
    console.log("performance data loaded");
    data.forEach(d => {
        d.mem_GB_mean = d['mem(KB)_mean'] / 1024 / 1024;
        d.mem_GB_std = d['mem(KB)_std'] / 1024 / 1024;
    });

    const langs = Array.from(new Set(data.map(d => d.lang))).sort();
    const names = Array.from(new Set(data.map(d => d.name))).sort();

    const color = d3.scaleOrdinal()
        .domain(langs)
        .range(d3.schemeCategory10);

    const langSelect = d3.select("#lang-select");
    langs.forEach(lang => {
        langSelect.append("option").attr("value", lang).text(lang);
    });
    const defaultLangs = ["C (clang)","C (gcc)","Go","C++ (gpp)","Java","Julia","Lua","Perl","PHP","Python 3","Ruby","Rust","Swift"];
    defaultLangs.forEach(lang => {
        langSelect.selectAll("option")
            .filter(function() { return this.value === lang; })
            .property("selected", true);
    });

    const nameSelect = d3.select("#name-select");
    names.forEach(name => {
        nameSelect.append("option").attr("value", name).text(name);
    });

    const nSelect = d3.select("#n-select");
    function populateNS(selectedName) {
        const ns = Array.from(new Set(
            data.filter(d => d.name === selectedName).map(d => d.n)
        )).sort((a, b) => a - b);
        nSelect.selectAll("option").remove();
        ns.forEach(n => {
            nSelect.append("option").attr("value", n).text(n);
        });
    }

    const defaultProblem = "nbody";
    const defaultSize = 50000000;
    nameSelect.property("value", defaultProblem);
    populateNS(defaultProblem);
    nSelect.property("value", defaultSize);

    langSelect.on("change", update);
    nameSelect.on("change", function() {
        populateNS(this.value);
        update();
    });
    nSelect.on("change", update);

    const sortSelect = d3.select("#sort-select");
    const sortOptions = [
        {value: "alpha", text: "Alphabetical"},
        {value: "size", text: "Increasing Program Size"},
        {value: "cpu", text: "Increasing CPU Time"},
        {value: "mem", text: "Increasing Memory Usage"}
    ];
    sortSelect.selectAll("option")
        .data(sortOptions)
        .enter()
        .append("option")
        .attr("value", d => d.value)
        .text(d => d.text);
    sortSelect.property("value", "cpu");
    sortSelect.on("change", update);

    update();

    function update() {
        const selectedLangs = Array.from(langSelect.node().selectedOptions).map(o => o.value);
        const selectedName = nameSelect.node().value;
        const selectedN = +nSelect.node().value;

        const filtered = data.filter(d =>
            d.name === selectedName &&
            d.n === selectedN &&
            selectedLangs.includes(d.lang)
        );

        const sortBy = sortSelect.property("value");
        if (sortBy === "alpha") {
            filtered.sort((a, b) => d3.ascending(a.lang, b.lang));
        } else if (sortBy === "size") {
            filtered.sort((a, b) => d3.ascending(a["size(B)_mean"], b["size(B)_mean"]));
        } else if (sortBy === "cpu") {
            filtered.sort((a, b) => d3.ascending(a["cpu-time(s)_mean"], b["cpu-time(s)_mean"]));
        } else if (sortBy === "mem") {
            filtered.sort((a, b) => d3.ascending(a.mem_GB_mean, b.mem_GB_mean));
        }

        drawChart(filtered, '#chart-size',
            d => d['size(B)_mean'], d => d['size(B)_std'], 'Size (Bytes)');
        drawChart(filtered, '#chart-cpu',
            d => d['cpu-time(s)_mean'], d => d['cpu-time(s)_std'], 'CPU Time (s)');
        drawChart(filtered, '#chart-mem',
            d => d.mem_GB_mean, d => d.mem_GB_std, 'Memory (GB)');
    }

    function drawChart(data, selector, valueMean, valueStd, ylabel) {
        d3.select(selector).selectAll("svg").remove();

        const svg = d3.select(selector)
            .append("svg")
            .attr("id", "svg_perf")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .domain(data.map(d => d.lang))
            .range([0, width])
            .padding(0.4);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => valueMean(d) + valueStd(d)) * 1.1])
            .nice()
            .range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        svg.append("g")
            .call(d3.axisLeft(y));

        const t = svg.transition().duration(200);

       
        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.lang))
            .attr("width", x.bandwidth())
            .attr("y", y(0))
            .attr("height", 0)
            .attr("fill", d => color(d.lang))
            .attr("fill-opacity", 1.0)
          .transition(t)
            .delay((d,i) => i * 5)
            .attr("y", d => y(valueMean(d)))
            .attr("height", d => height - y(valueMean(d)));

       
        svg.selectAll(".error-bar")
            .data(data)
            .enter()
            .append("line")
            .attr("class", "error-bar")
            .attr("x1", d => x(d.lang) + x.bandwidth() / 2)
            .attr("x2", d => x(d.lang) + x.bandwidth() / 2)
            .attr("y1", y(0))
            .attr("y2", y(0))
            .attr("stroke", "white")
          .transition(t)
            .delay((d,i) => i * 5)
            .attr("y1", d => y(valueMean(d) - valueStd(d)))
            .attr("y2", d => y(valueMean(d) + valueStd(d)));

        const capWidth = 5;
     
        svg.selectAll(".error-cap-top")
            .data(data)
            .enter()
            .append("line")
            .attr("class", "error-cap-top")
            .attr("x1", d => x(d.lang) + x.bandwidth() / 2 - capWidth)
            .attr("x2", d => x(d.lang) + x.bandwidth() / 2 + capWidth)
            .attr("y1", y(0))
            .attr("y2", y(0))
            .attr("stroke", "white")
          .transition(t)
            .delay((d,i) => i * 5)
            .attr("y1", d => y(valueMean(d) + valueStd(d)))
            .attr("y2", d => y(valueMean(d) + valueStd(d)));

       
        svg.selectAll(".error-cap-bottom")
            .data(data)
            .enter()
            .append("line")
            .attr("class", "error-cap-bottom")
            .attr("x1", d => x(d.lang) + x.bandwidth() / 2 - capWidth)
            .attr("x2", d => x(d.lang) + x.bandwidth() / 2 + capWidth)
            .attr("y1", y(0))
            .attr("y2", y(0))
            .attr("stroke", "white")
          .transition(t)
            .delay((d,i) => i * 5)
            .attr("y1", d => y(valueMean(d) - valueStd(d)))
            .attr("y2", d => y(valueMean(d) - valueStd(d)));

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 75)
            .attr("x", -height / 2)
            .attr("dy", "-1em")
            .style("text-anchor", "middle")
            .style("fill", "white")  
            .text(ylabel);
        
    }
});