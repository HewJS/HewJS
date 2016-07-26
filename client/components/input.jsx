import Dropzone from 'react-dropzone';

// This component handles data input from the user. It uses Dropzone
// to handle drag-and-dropped files, and a text field to handle direct
// typing/pasting.

const Input = (props) => {

  // this variable is used for debouncing (live input update)
  let liveReload;

  // This function takes in a comma separated string as input and
  // returns a matrix representing the input. The returned value
  // is transposed due our wish for the 'correct' data format to be
  // arranged column-wise, and our current implementation for formatting.
  // Handles "quoted,commas"
  const parseCSV = (input) => {
    input = input.split('\n').filter(line => !!line);
    input = input.map(function(line) {
      let parsed = [];
      let quote = 0;
      let entry = '';
      for (let char of line) {
        if (char === '"') {
          quote += 1;
        } else if (char === ',' && quote % 2 === 0) {
          parsed.push(entry.trim());
          entry = '';
        } else {
          entry += char;
        }
      }
      parsed.push(entry.trim());
      return parsed;
    });
    return transpose(input);
  };

  // This function reads the contents of the dropped file, and sets the
  // state on the App component.
  const handleInput = (files) => {
    const context = props.context;
    const file = files[0];
    const read = new FileReader();
    read.onload = function(event) {
      $('#textArea').val(event.target.result);
      context.setState({
        input: parseCSV(event.target.result)
      });
    };
    read.readAsText(file);
  };

  // This function reads the contents of the text area, and sets the
  // state on the App component.
  const handleText = () => {
    let input = $('#textArea').val();
    if (input) {
      props.context.setState({
        input: parseCSV(input)
      });
    }
  };

  // Enables live reload of the text input field.
  const liveText = () => {
    clearTimeout(liveReload);
    liveReload = setTimeout(function() {
      handleText();
    }, 500);
  };

  const transpose = (matrix) => {
    let result = [];
    for (let i = 0; i < matrix[0].length; i++) {
      let row = [];
      for (let j = 0; j < matrix.length; j++) {
        row.push(matrix[j][i]);
      }
      result.push(row);
    }
    return result;
  };

  // Function to return a string representation (in CSV format)
  // of a matrix.
  const printCSV = (matrix) => {
    return matrix.map(row => row.map(entry =>
      entry.indexOf(',') === -1 ? entry : '"'+entry+'"')
      .join(',')
    ).join('\n');
  };

  // Called when `Format data' is clicked. Transposes the contents
  // of the text input field, and updates the state on App to reflect
  // the change.
  const transposeInput = () => {
    let input = $('#textArea').val();
    if (input) {
      input = printCSV(parseCSV(input));
      $('#textArea').val(input);
      handleText();
    }
  };

  let textAreaStyle = {
    width: '1170px',
    height: '300px',
    borderRadius: '8px'
  };

  let dropzoneBorder = {
    border: 'none'
  };

  return (
    <div className="dataInput text-center">
      <Dropzone id="dropzone" onDrop={handleInput} disableClick={true} style={dropzoneBorder}>
        <textarea id="textArea" onChange={liveText} placeholder="paste or drop your CSV here!"
        style={textAreaStyle}></textarea>
      </Dropzone>
      <button onClick={transposeInput} className="transpose">Format data</button>
    </div>
  );
};

module.exports = Input;
