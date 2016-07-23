import Dropzone from 'react-dropzone';

const Input = (props) => {

  // this variable is used for debouncing (live input update)
  let liveReload;

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

  const handleText = () => {
    let input = $('#textArea').val();
    if (input) {
      props.context.setState({
        input: parseCSV(input)
      });
    }
  };

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

  const transposeInput = () => {
    let input = $('#textArea').val();
    if (input) {
      input = parseCSV(input);
      input = transpose(input).map(row => row.join(',')).join('\n');
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
