import React from 'react';

import './App.css';
import Welcome from '../Components/Welcome/Welcome';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      welcome: true,
    }
    this.start = this.start.bind(this);
  }

  start() {
    this.setState({welcome: false})
  }

  render() {
    return (
      <main>
        {this.state.welcome && <Welcome start={this.start} />}
      </main>
    )
  }
}
