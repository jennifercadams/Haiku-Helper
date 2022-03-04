import React from 'react';

import './Welcome.css';

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="welcome">
        <p className="line-1">I'm Haiku Helper</p>
        <p className="line-2"><span id="change-text"></span></p>
        <p className="line-3">For writing haiku</p>
        <button id="start" onClick={this.props.start}>Start</button>
      </div>
    )
  }
}