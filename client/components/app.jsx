const Input = require('./input.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'HewJS in React',
      input: 'this is the data from the input field'
    };
  }

  render() {
    return (
      <div>
        <div>
          <h1>{this.state.message}</h1>
        </div>
        <div>
          <Input input={this.state.input} context={this} />
        </div>
      </div>
    );
  }
}

window.App = App;

ReactDOM.render(<App />, document.getElementsByClassName('app')[0]);