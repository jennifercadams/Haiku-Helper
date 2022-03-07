import React from 'react';

import Background from './canvasMenuButtons/Background';
import Font from './canvasMenuButtons/Font';
import TextColor from './canvasMenuButtons/TextColor';

export default class CanvasMenu extends React.Component {
  render() {
    return (
      <div id="canvas-menu">
        <Background {...this.props} />
        <Font {...this.props} />
        <TextColor {...this.props} />
        <button className="canvas-button">Share</button>
        <button className="canvas-button">Download</button>
      </div>
    )
  }
}