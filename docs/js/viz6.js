const margin_pop = { top: 20, right: 150, bottom: 100, left: 150 },
      width_pop = 960 - margin_pop.left - margin_pop.right,
      height_pop = 600 - margin_pop.top - margin_pop.bottom,
      barPadding = 0.1,
      top_n = 20,
      transitionDuration = 500;

const BASE_TICK_DELAY = transitionDuration;
const BASE_TRANSITION_DURATION = transitionDuration;
let speed = 1;

const speedSlider = d3.select('#speedSlider');
const speedDisplay = d3.select('#speedValue');
const MIN_SPEED = 0.2;
const MAX_SPEED = 80;
const DEFAULT_SPEED = 1;

speedSlider
  .attr('min', 0)
  .attr('max', 1)
  .attr('step', 0.001);

const DEFAULT_NORM = Math.log(DEFAULT_SPEED / MIN_SPEED) / Math.log(MAX_SPEED / MIN_SPEED);
speedSlider.property('value', DEFAULT_NORM);


function updateSpeed() {
  const norm = +speedSlider.property('value');
  speed = MIN_SPEED * Math.pow(MAX_SPEED / MIN_SPEED, norm);
  speedDisplay.text(speed.toFixed(2) + '×');
}


updateSpeed();

speedSlider.on('input', updateSpeed);

const svg = d3.select("#popularity")
  .attr("width", width_pop + margin_pop.left + margin_pop.right)
  .attr("height", height_pop + margin_pop.top + margin_pop.bottom)
    .append("g")
  .attr("transform", `translate(${margin_pop.left},${margin_pop.top})`);

const x = d3.scaleLinear().range([0, width_pop]);
const y = d3.scaleBand().range([0, height_pop]).padding(barPadding);
const color = d3.scaleOrdinal(d3.schemeTableau10);

const xAxisGroup = svg.append("g")
  .attr("class", "axis x-axis")
  .attr("transform", `translate(0,${height_pop})`);
const yAxisGroup = svg.append("g")
  .attr("class", "axis y-axis");

const pauseBtn = d3.select('#pauseBtn');
const resetBtn = d3.select('#resetBtn');
let paused = true;
let timeoutId;

d3.csv("data/pop_data.csv").then(raw => {
    console.log("data loaded vis 6");
  const parseDate = d3.timeParse("%B %Y");
  raw.forEach(d => {
    d.Date = parseDate(d.Date);
    for (let k in d) if (k !== "Date") d[k] = +d[k];
  });

  const languages = raw.columns.filter(c => c !== "Date");
  const records = d3.group(raw, d => +d.Date);
  const frames = Array.from(records, ([time, rows]) => {
    const vals = languages.map(name => ({ name, value: rows[0][name] }));vals.sort((a, b) => b.value - a.value);
    return {
      time: new Date(time),
      ranked: vals.slice(0, top_n).map((d, i) => ({ ...d, rank: i }))
    };
  }).sort((a, b) => d3.ascending(a.time, b.time));


const startDate = frames[0].time;
const endDate = frames[frames.length - 1].time;
const progress = d3.select('#time-progress');


const dateDisplay = d3.select('#date-display');


const tickContainer = d3.select('#progress-container')
  .append('div')
  .attr('id','time-ticks')
  .style('position','relative')
  .style('width','100%')
  .style('height','20px')
  .style('margin-top','4px')

const timeScale = d3.scaleTime()
  .domain([startDate, endDate])
  .range([0,1]);

const tickDates = d3.timeYear.range(
    d3.timeYear.ceil(startDate),
    d3.timeYear.offset(d3.timeYear.floor(endDate), 1),
    1
  );

tickContainer.selectAll('div.tick')
  .data(tickDates)
  .enter()
  .append('div')
    .attr('class','tick')
    .style('position','absolute')
    .style('left', d => `${timeScale(d) * 100}%`)
    .style('transform','translateX(-50%)')
    .text(d => d3.timeFormat('%Y')(d));


  color.domain(languages);

 
  x.domain([0, d3.max(frames[0].ranked, d => d.value)]);
  y.domain(frames[0].ranked.map(d => d.name));

  xAxisGroup.call(d3.axisBottom(x).ticks(5).tickFormat(d => d.toFixed(1) + "%"));
  yAxisGroup.call(d3.axisLeft(y));

  svg.selectAll(".bar")
    .data(frames[0].ranked, d => d.name)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("y", d => y(d.name))
      .attr("height", y.bandwidth())
      .attr("width", d => x(d.value))
      .attr("fill", d => color(d.name));

  svg.selectAll(".label")
    .data(frames[0].ranked, d => d.name)
    .enter().append("text")
      .attr("class", "label")
      .attr("x", d => x(d.value) + 5)
      .attr("y", d => y(d.name) + y.bandwidth() / 2 + 4)
      .style("font", "12px sans-serif")
      .text(d => `${d.name} (${d.value.toFixed(1)}%)`);


  function update({ time, ranked }) {
    x.domain([0, d3.max(ranked, d => d.value)]);
    y.domain(ranked.map(d => d.name));

    xAxisGroup.transition().duration(BASE_TRANSITION_DURATION / speed)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d => d.toFixed(1) + "%"));
    yAxisGroup.transition().duration(BASE_TRANSITION_DURATION / speed)
      .call(d3.axisLeft(y));

    const bars = svg.selectAll(".bar").data(ranked, d => d.name);
    bars.exit()
      .transition().duration(BASE_TRANSITION_DURATION / speed)
        .attr("width", 0)
      .remove();
    bars.enter().append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", height_pop)
        .attr("height", y.bandwidth())
        .attr("width", 0)
        .attr("fill", d => color(d.name))
      .merge(bars)
      .transition().duration(BASE_TRANSITION_DURATION / speed)
        .attr("y", d => y(d.name))
        .attr("width", d => x(d.value))
        .attr("height", y.bandwidth());

    const labels = svg.selectAll(".label").data(ranked, d => d.name);
    labels.exit().remove();
    const enterLabels = labels.enter().append("text")
        .attr("class", "label")
        .attr("x", 0)
        .attr("y", height_pop)
        .style("font", "12px sans-serif")
        .text(d => `${d.name} (${d.value.toFixed(1)}%)`);
    enterLabels.merge(labels)
      .transition().duration(BASE_TRANSITION_DURATION / speed)
        .attr("x", d => x(d.value) + 5)
        .attr("y", d => y(d.name) + y.bandwidth() / 2 + 4)
        .tween("text", function(d) {
          const i = d3.interpolateNumber(
            parseFloat(this.textContent.match(/[\d.]+/)[0]),
            d.value
          );
          return t => {
            this.textContent = `${d.name} (${i(t).toFixed(1)}%)`;
          };
        });const frac = (time - startDate) / (endDate - startDate);
  progress.property('value', frac);

  dateDisplay.text(d3.timeFormat('%B %Y')(time));
}

 
  function scheduleTick() {
    timeoutId = setTimeout(() => {
      frameIndex = (frameIndex + 1) % frames.length;
      update(frames[frameIndex]);
      if (!paused) scheduleTick();
    }, BASE_TICK_DELAY / speed);
  }


  pauseBtn.on('click', () => {
    if (!paused) {
      paused = true;
      pauseBtn.text('Play');
      clearTimeout(timeoutId);
    } else {
      paused = false;
      pauseBtn.text('Pause');
      scheduleTick();
    }
  });
  
  resetBtn.on('click', () => {
    paused = true;
    clearTimeout(timeoutId);
    pauseBtn.text('Play');
    frameIndex = 0;
    update(frames[0]);
  });


  const resetSpeedBtn = d3.select('#resetSpeedBtn');
  resetSpeedBtn.on('click', () => {
  speedSlider.property('value', DEFAULT_NORM);
  updateSpeed();
});

  
  let frameIndex = 0;
  console.log("execution finished vis6");
});
