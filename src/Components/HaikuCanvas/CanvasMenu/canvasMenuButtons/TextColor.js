import React from 'react';

export default class TextColor extends React.Component {
  render() {
    const { settings, updateSettings } = this.props;
    return (
      <div className="canvas-button-container">
        <label htmlFor="textColor">Text Color</label>
        <input type="color" id="textColor" value={settings.textColor} onChange={updateSettings} />
      </div>
    )
  }
}