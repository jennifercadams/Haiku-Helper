import React from 'react';

export default class Background extends React.Component {
  render() {
    const { settings, updateSettings } = this.props;
    return (
      <div className="canvas-button-container">
        <button className="canvas-button">Background</button>
        <input type="color" id="background" value={settings.background} onChange={updateSettings} />
      </div>
    )
  }
}