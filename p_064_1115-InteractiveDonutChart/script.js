//-- updated from original source: https://bl.ocks.org/jonsadka/fa05f8d53d4e8b5f262e

const width = 960;
const height = 500;
const min = Math.min(width, height);
const oRadius = (min / 2) * 0.9; //-- outer
const iRadius = (min / 2) * 0.85; //-- inner
const color = d3.scale.category20();

//-- construct arc generator
const arc = d3.svg.arc().outerRadius(oRadius).innerRadius(iRadius);

//-- construct default pie laoyut
const pie = d3.layout
  .pie()
  .value((d) => d)
  .sort(null);

//-- generate [size] numbers of random numbers between 0 and 100
const makeData = (size) => d3.range(size).map((item) => Math.random() * 100);

//-- generate random data based on input value (***var***, reset in the render function)
let data = makeData(+document.getElementById("datacount").value);
// console.log("data: \n" + data);

//-- set svg width and height
const svg = d3.select("svg").attr("width", width).attr("height", height);

//-- construct group to hold pie chart and set/transform the location to the center of the screen
const g = svg
  .append("g")
  .attr("transform", `translate(${width / 2}, ${height / 2})`);

//-- enter data and draw pie chart
const path = g
  .datum(data)
  .selectAll("path")
  .data(pie)
  .enter()
  .append("path")
  .attr("fill", (d, i) => color(i))
  .attr("d", arc)
  .each(function (d) {
    this._current = d;
  });

//-- Store the displayed angles in _current.
//-- Then, interpolate from _current to the new angles.
//-- During the transition, _current is updated in-place by d3.interpolate.
//-- ******************** --//
function arcTween(a) {
  const i = d3.interpolate(this._current, a);
  this._current = i(0);
  return (t) => arc(i(t));
}
//-- ******************** --//

function render() {
  //-- generate new random data
  data = makeData(+document.getElementById("datacount").value);

  //-- add transition to new path
  g.datum(data)
    .selectAll("path")
    .data(pie)
    .transition()
    .duration(1000)
    .attrTween("d", arcTween);

  //-- add any new paths
  g.datum(data)
    .selectAll("path")
    .data(pie)
    .enter()
    .append("path")
    .attr("class", "piechart")
    .attr("fill", function (d, i) {
      return color(i);
    })
    .attr("d", arc)
    .each(function (d) {
      this._current = d;
    });

  //-- remove data not being used
  g.datum(data).selectAll("path").data(pie).exit().remove();
}

render();
setInterval(render, 1500);
