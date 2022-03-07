import React from 'react';

import './Welcome.css';

export default class Welcome extends React.Component {
  render() {
    return (
      <div id="welcome">
        <p id="welcome-line-1">I'm Haiku Helper</p>
        <p id="welcome-line-2"><span id="change-text"></span></p>
        <p id="welcome-line-3">For writing haiku</p>
        <button id="start" onClick={this.props.start}>Start</button>
      </div>
    )
  }
}