import React from 'react';

import './Welcome.css';

export default class Welcome extends React.Component {
  render() {
    return (
      <div id="welcome">
        <p class="line-1">I'm Haiku Helper</p>
        <p class="line-2"><span id="change-text"></span></p>
        <p class="line-3">For writing haiku</p>
        <button id="start">Start</button>
      </div>
    )
  }
}