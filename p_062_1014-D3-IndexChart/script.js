import data from './data.js';
// console.log("script.js :: data??\n", data);
// const test = d3.groups(data, d => d.name);
// console.log("script.js :: test\n", test);

const dataByCom = d3.groups(data, d => d.name).map(([key, values]) => {
    const v = values[0].value;
    return {key, values: values.map(({date, value}) => ({date, value: value / v}))};
});
console.log("script.js :: dataByCom??\n", dataByCom);

const margin = {top: 20, right: 40, bottom: 30, left: 40};
const height = document.querySelector('.chart').offsetHeight; 
const width = document.querySelector('.chart').offsetWidth; 
// console.log("width?", width);    //1170
// console.log("height?", height);  //600
// console.log("script.js :: d3?? ", d3)

const k = d3.max(d3.group(data, d => d.name), ([, group]) => d3.max(group, d => d.value) / d3.min(group, d => d.value));

const x = d3.scaleUtc()
    .domain(d3.extent(data, d => d.date))
    .range([margin.left, width - margin.right])
    .clamp(true);

const y = d3.scaleLog()
    .domain([1 / k, k])
    .rangeRound([height - margin.bottom, margin.top]);

const z = d3.scaleOrdinal(d3.schemeCategory10).domain(data.map(d => d.name));

const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
    .call(g => g.select(".domain").remove());

const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y)
    .ticks(null, x => +x.toFixed(6) + "×"))
    .call(g => g.selectAll(".tick line").clone()    
    .attr("stroke-opacity", d => d === 1 ? null : 0.2)
    .attr("x2", width - margin.left - margin.right))
    .call(g => g.select(".domain").remove());

const parseDate = d3.utcParse("%Y-%m-%d");
const formatDate = d3.utcFormat("%B, %Y");

const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value));

const bisect = d3.bisector(d => d.date).left;



const svg = d3.select("svg")
    .on("mousemove", moved);

const rule = svg.append("g")
    .append("line")
    .attr("y1", height)
    .attr("y2", 0)
    .attr("stroke", "black");
  
const series = svg.append("g")
    .style("font", "bold 10px sans-serif")
    .selectAll("g")
    .data(dataByCom)
    .join("g");

series.append("path")
    .attr("fill", "none")
    .attr("stroke-width", 1.5)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke", d => z(d.key))
    .attr("d", d => line(d.values));

// series.append("text")
//     .datum(d => ({key: d.key, value: d.values[d.values.length - 1].value}))
//     .attr("fill", "none")
//     .attr("stroke", "white")
//     .attr("stroke-width", 3)
//     .attr("x", x.range()[1] + 3)
//     .attr("y", d => y(d.value))
//     .attr("dy", "0.35em")
//     .text(d => d.key)
//     .clone(true)
//     .attr("fill", d => z(d.key))
//     .attr("stroke", null);

// series.append("text")
//     .datum(d => ({key: d.key, value: d.values[d.values.length - 1].value}))
//     .attr("fill", "none")
//     .attr("stroke", "white")
//     .attr("stroke-width", 3)
//     .attr("x", x.range()[1] + 3)
//     .attr("y", d => y(d.value))
//     .attr("dy", "0.35em")
//     .text(d => d.key)
//     .clone(true)
//     .attr("fill", d => z(d.key))
//     .attr("stroke", null);

const init = () => {
    console.log("script.js :: init");
    // svg.append("g")
    //     .call(xAxis);
    // svg.append("g")
    //     .call(yAxis);
}

function moved (e) {
    console.log("script.js :: moved");
    // update(x.invert(d3.pointer(e, this)[0]));
    // d3.event.preventDefault();
}

function update(date) {
    console.log("script.js :: update");
    // date = d3.utcDay.round(date);
    // rule.attr("transform", `translate(${x(date) + 0.5},0)`);
    // series.attr("transform", ({values}) => {
    //   const i = bisect(values, date, 0, values.length - 1);
    //   return `translate(0,${y(1) - y(values[i].value / values[0].value)})`;
    // });
    // svg.property("value", date).dispatch("input");
}


init();

