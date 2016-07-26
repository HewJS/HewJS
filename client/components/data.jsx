// This component allows users to associate data with chart axes
// by calling setAxes in App. the association is stored as a state
// on the App component.

const Data = (props) => {

  return (
    <div className="allData text-center">
      <div>
      {
        props.choosers.map(axis =>
          <div className="bindings">
            <h2>{axis}</h2>
            <select onChange={props.setAxes} data-axis={axis}>
              <option value="---choose-a-value---">choose a value</option>
              {
                Object.keys(props.rawData).map(key =>
                <option value={key}>{key}</option>)
              }
            </select>
          </div>
        )
      }
      </div>
    </div>
  );

};

module.exports = Data;
