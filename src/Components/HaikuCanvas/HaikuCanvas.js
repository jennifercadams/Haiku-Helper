import React from 'react';

import './HaikuCanvas.css';
import CanvasMenu from './CanvasMenu/CanvasMenu';

export default class HaikuCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.drawHaiku = this.drawHaiku.bind(this);
  }

  drawHaiku() {
    const { haiku, settings } = this.props;
    const canvas = document.getElementById('haiku-canvas').getContext('2d');
    canvas.clearRect(0, 0, 400, 300);
    canvas.fillStyle = settings.background;
    canvas.fillRect(0, 0, 400, 300);
    canvas.font = `26px ${settings.font}`;
    canvas.textAlign = 'center';
    canvas.fillStyle = settings.textColor;
    canvas.fillText(haiku.line1.text.join(' '), 200, 100);
    canvas.fillText(haiku.line2.text.join(' '), 200, 150);
    canvas.fillText(haiku.line3.text.join(' '), 200, 200);
    canvas.font = '12px Open Sans';
    canvas.textAlign = 'right';
    canvas.fillText('made with Haiku Helper', 390, 290)
  }

  render() {
    const { settings, updateSettings, startOver, backToEditor } = this.props; 
    return (
      <div id="canvas-container">
        <CanvasMenu 
          settings={settings}
          updateSettings={updateSettings}
        />
        <canvas id="haiku-canvas" width="400" height="300"></canvas>
        <div className="nav-buttons">
          <button className="nav-button" onClick={startOver}>Start Over</button>
          <button className="nav-button" onClick={backToEditor}>Back to Editor</button>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.drawHaiku();
  }

  componentDidUpdate() {
    this.drawHaiku();
  }
}