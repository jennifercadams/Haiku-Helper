import React from 'react';

import './HaikuCanvas.css';

export default class HaikuCanvas extends React.Component {
  render() {
    return (
      <div id="canvas-container">
        <canvas id="haiku-canvas" width="400" height="300"></canvas>
      </div>
    )
  }
}