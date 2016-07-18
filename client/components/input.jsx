const Dropzone = require('react-dropzone');

const Input = (props) => {

  const handleInput = (files) => {
    const context = props.context;
    const file = files[0];
    const read = new FileReader();
    read.onload = function(event) {
      context.setState({
        input: event.target.result.split('\n').map(line => line.split(','))
      });
    }
    read.readAsText(file);
  }

  return (
    <div>
     <Dropzone onDrop={handleInput}>
         <div>Drop a file here!</div>
     </Dropzone>
     <p>{JSON.stringify(props.context.state.input)}</p>
    </div>
  );
};

module.exports = Input;