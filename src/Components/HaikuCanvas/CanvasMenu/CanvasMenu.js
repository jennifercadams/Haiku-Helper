import React from 'react';

import Background from './canvasMenuButtons/Background';
import Font from './canvasMenuButtons/Font';
import TextColor from './canvasMenuButtons/TextColor';

export default class CanvasMenu extends React.Component {
  render() {
    const { settings, updateSettings } = this.props;
    return (
      <div id="canvas-menu">
        <Background settings={settings} updateSettings={updateSettings} />
        <Font />
        <TextColor settings={settings} updateSettings={updateSettings} />
        <button className="canvas-button">Share</button>
        <button className="canvas-button">Download</button>
      </div>
    )
  }
}