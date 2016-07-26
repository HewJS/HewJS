import Team from './team.jsx';
import Footer from './footer.jsx';
import Jumbotron from './jumbotron.jsx';
import Choose from './choose.jsx';
import Chart from './chart.jsx';
import Input from './input.jsx';
import Data from './data.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

window.React = React;

// The App component holds all of the other subcomponents
// Its state stores all of the user's input: data and axes selection
// This state is passed on to the relevant components

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      choosers: ['xAxis', 'y0'],
      types: {},
      xAxis: '',
      yAxis: {},
      yCounter: 1
    };
  }

  // Called when the add new series button is pressed.
  // Adds another entry into state.users, and increments
  // state.yCounter for the next invocation.
  makeNewY() {
    this.setState({
      yCounter: this.state.yCounter+1,
      choosers: this.state.choosers.concat('y'+this.state.yCounter.toString())
    });
  }

  // Passed to the Choose component.
  // Called when the user selects a chart type:
  assignType(e) {
    this.state.types[e.target.dataset.axis] = e.target.value;
    this.setState({types: this.state.types});
  }

  // Passed to the Data component.
  // Called when the user selects axes for the data.
  setAxes(e) {
    if (e.target.value !== "---choose-a-value---") {
      let axis;
      if (e.target.dataset.axis === 'xAxis') {
        axis = {};
        axis[e.target.dataset.axis] = e.target.value;
      } else {
        axis = {yAxis: this.state.yAxis, exist: true};
        axis.yAxis[e.target.dataset.axis] = e.target.value;
      }
      this.setState(axis);
    }
  }

  // Formats a 2D array into an object
  // {
  //   series1: [values...],
  //   series2: [values...]…
  // }
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

  render() {
    return (
      <div className="react-root">
        <div>
          <Jumbotron />
        </div>
        <div className="inputParent">
          <Input input={this.state.input} context={this} />
        </div>

        {this.state.input.length > 0 ? <Data rawData={this.formatter(this.state.input)} setAxes={this.setAxes.bind(this)} choosers={this.state.choosers}/> : false}
        {this.state.exist ?
          <div className="newAxis text-center">
          <button onClick={this.makeNewY.bind(this)} className="series">Add more series</button>
          </div> : false }
        <div className="graphType text-center">
          {this.state.choosers.map(chart => chart !== 'xAxis' && this.state.exist ?
              <Choose chartType={chart} assignType={this.assignType.bind(this)} /> : false
          )}
        </div>
        {this.state.input ? <Chart app={this.state} /> : false}
        <div>
          <Team />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementsByClassName('app')[0]);
