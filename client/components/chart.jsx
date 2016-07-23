import { makeCharts, deleteCharts } from '../chartGenerator.js';
import React from 'react';

// let dataset = [
//   { "Word": 35, "Awesomeness":2000 },
//   { "Word": 34, "Awesomeness":3000 }
// ];

// let data1 = {
//   dataset: dataset,
//   x: "Word",
//   charts: [{ y: "Awesomeness", type: "bar" }, { y: "Awesomeness", type: "scatter" }]
// };

// let data2 = {
//   dataset: dataset,
//   x: "Awesomeness",
//   charts: [{ y: "Word", type: "bar" }, { y: "Word", type: "scatter" }]
// };

class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  formatter(matrix) {
    let result = {};
    for (let i = 0; i < matrix.length; i++){
      for (let j = 0; j < matrix[i].length; j++){
        if (!j){
          result[matrix[i][j]] = [];
        }else{
          result[matrix[i][0]].push(matrix[i][j]);
        }
      }
    }
    return result;
  }

  formatChartForProp(nextProps) {
    console.log("Format Chart For Props:");
    let result = [];
    let copy = nextProps.app.choosers.slice(1);
    console.log(copy);
    for (let series of copy) {
      result.push({
        y: nextProps.app.yAxis[series],
        type: nextProps.app.types[series]
      });
    }
    return result;
  }

  formatDataForProp(input) {
    const result = [];
    const keys = Object.keys(input);
    for (let i = 0; i < input[keys[0]].length; i++) {
      let entry = {};
      for (let key of keys) {
        entry[key] = input[key][i];
      }
      result.push(entry);
    }
    return result;
  }

  formatPropForChart(nextProps) {
    const chartProp = {};
    chartProp.dataset = this.formatDataForProp(this.formatter(nextProps.app.input));
    chartProp.x = nextProps.app.xAxis;
    chartProp.charts = this.formatChartForProp(nextProps);
    return chartProp;
  }

  componentWillReceiveProps(nextProps) {
    let data = this.formatPropForChart(nextProps);
    deleteCharts();
    makeCharts(data, 1500, 900);
  }

  render() {
    return (
      <div>
        <div className="chart text-center">
        </div>
      </div>
    );
  }
}

module.exports = Chart;
