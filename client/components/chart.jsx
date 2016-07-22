import { makeCharts, deleteCharts } from '../chartGenerator.js';
import React from 'react';

let dataset = [
  { "Word": 35, "Awesomeness":2000 },
  { "Word": 34, "Awesomeness":3000 }
];

let data1 = {
  dataset: dataset,
  x: "Word",
  charts: [{ y: "Awesomeness", type: "bar" }, { y: "Awesomeness", type: "scatter" }]
};

let data2 = {
  dataset: dataset,
  x: "Awesomeness",
  charts: [{ y: "Word", type: "bar" }, { y: "Word", type: "scatter" }]
};

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    }
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
    let result = [];
    let copy = nextProps.app.choosers.slice(1);
    for (let series of copy) {
      let temp = {};
      temp.y = nextProps.app[series];
      temp.type = nextProps.app.types[nextProps.app.choosers.indexOf(series)-1]
      result.push(temp);
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
    this.setState({data: chartProp});
  }

  componentWillReceiveProps(nextProps) {
    this.formatPropForChart(nextProps);
  }

  componentDidMount() {
    makeCharts(this.state.data, 800, 600);
    // makeCharts(data1, 800, 600);
  }

  componentDidUpdate() {
    deleteCharts();
    makeCharts(this.state.data, 800, 600);
    // makeCharts(data2, 800, 600);
  }

  render() {
    return (
      <div>
        <p>{JSON.stringify(this.state.data)}</p>
        <div className="chart">
        </div>
      </div>
    );
  }
};

module.exports = Chart;
