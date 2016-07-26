// Need to specify path to dimple as there is an issue when
// importing dimple in the usual way
import dimple from '../node_modules/dimple-js/dist/dimple.latest.js';
import d3 from 'd3';

// Incoming data format:
  // data === {
  //   dataset: ....,
  //   x: the name of the x-axis,
  //   charts: [ {y: ...., type: .... }, {y: ...., type: .... }, .... ]
  // }

let makeCharts = function(data, height, width) {
  let svg = dimple.newSvg(".chart", height, width).attr('class', 'chartSvg');

  // For each "chart" object,
    // "typify" the type...
    // add the category axis and measure axis...
    // add the series
    // draw

  let newChart = new dimple.chart(svg, data.dataset);
  let x = newChart.addCategoryAxis('x', data.x);
  x.addOrderRule(data.x);
  data.charts.forEach(chart => {
    chart.type ? chart.type : "scatter";
    if (chart.y) {
      let newChartType = typify(chart.type);
      let y = newChart.addMeasureAxis('y', chart.y);
      newChart.addSeries(null, newChartType, [x, y]);
    }
  });
  newChart.draw();
};

let deleteCharts = function() {
  d3.select('.chartSvg').remove();
};

let typify = function(typeString) {
  if (typeString === "bar") {
    return dimple.plot.bar;
  } else if (typeString === "histogram") {
    return dimple.plot.histogram;
  } else if (typeString === "line") {
    return dimple.plot.line;
  } else if (typeString === "scatter") {
    return dimple.plot.scatter;
  }
};

module.exports = { makeCharts, deleteCharts };
