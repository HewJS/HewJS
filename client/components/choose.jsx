// This component handles chart type selection for each data series.
// The association is stored as an object `types' on the state of the App component,
// where {series: 'chartType'}

const Choose = (props) => {

  return (
    <div className="eachGraph">
      <h2> Graph Type: </h2>
      <select data-axis={props.chartType} onChange={props.assignType}>
        <option value="scatter">
          Scatter
        </option>
        <option value="bar">
          Bar
        </option>
        <option value="histogram">
          Histogram
        </option>
        <option value="line">
          Line
        </option>
      </select>
    </div>
  );
};

module.exports = Choose;
