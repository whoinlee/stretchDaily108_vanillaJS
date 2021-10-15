import data from './data.js';
console.log("script.js :: data??\n", data);

const margin = {top: 20, right: 40, bottom: 30, left: 40};
const height = document.querySelector('.chart').offsetHeight; 
// console.log("height?", height);
// console.log("script.js :: d3?? ", d3)

const svg = d3.select("svg")
    .on("mousemove", moved);

const rule = svg.append("g")
    .append("line")
    .attr("y1", height)
    .attr("y2", 0)
    .attr("stroke", "black");
  
// const serie = svg.append("g")
//     .style("font", "bold 10px sans-serif")
//     .selectAll("g")
//     .data(series)
//     .join("g");

// serie.append("text")
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
    // serie.attr("transform", ({values}) => {
    //   const i = bisect(values, date, 0, values.length - 1);
    //   return `translate(0,${y(1) - y(values[i].value / values[0].value)})`;
    // });
    // svg.property("value", date).dispatch("input");
  }


init();

