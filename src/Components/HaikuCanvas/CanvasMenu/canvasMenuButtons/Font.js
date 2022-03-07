import React from 'react';

export default class Font extends React.Component {
  render() {
    const { settings, updateSettings } = this.props;
    return (
      <div className="canvas-button-container">
        <button className="canvas-button">Font</button>
        <select id="font" onChange={updateSettings}>
          <option value="Open Sans">Open Sans</option>
          <option value="Arial">Arial</option>
          <option value="Brush Script MT">Brush Script MT</option>
          <option value="Courier New">Courier New</option>
          <option value="Garamond">Garamond</option>
          <option value="Georgia">Georgia</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Tahoma">Tahoma</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Trebuchet MS">Trebuchet MS</option>
          <option value="Verdana">Verdana</option>
        </select>
        <input type="color" id="textColor" value={settings.textColor} onChange={updateSettings} />
      </div>
    )
  }
}