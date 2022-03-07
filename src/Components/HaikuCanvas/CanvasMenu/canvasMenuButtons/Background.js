import React from 'react';

export default class Background extends React.Component {
  render() {
    const { background, toggleOptions, settings, updateSettings } = this.props;
    return (
      <div className="canvas-button-container">
        <button 
          className="canvas-button"
          onClick={() => toggleOptions('background')}
        >Background</button>
        {background && <div className="options">
          <input 
            className="option"
            type="color" 
            id="background" 
            value={settings.background} 
            onChange={updateSettings} 
          />
        </div>}
      </div>
    )
  }
}