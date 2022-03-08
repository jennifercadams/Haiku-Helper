import React from 'react';

export default class Font extends React.Component {
  render() {
    const { font, toggleOptions, settings, updateSettings } = this.props;
    return (
      <div className="canvas-button-container">
        <button 
          className="canvas-button" 
          onClick={() => toggleOptions('font')}
        >Font</button>
        {font && <div className="options">
          <input 
            type="color" 
            className="option" 
            id="textColor" 
            value={settings.textColor} 
            onChange={updateSettings} 
          />
          <select className="option" id="font" onChange={updateSettings}>
            <option value="Open Sans">Open Sans</option>
            <option value="Caveat">Caveat</option>
            <option value="Cinzel">Cinzel</option>
            <option value="EB Garamond">Garamond</option>
            <option value="Indie Flower">Indie Flower</option>
            <option value="Merriweather">Merriweather</option>
            <option value="Poppins">Poppins</option>
            <option value="Raleway">Raleway</option>
            <option value="Sansita Swashed">Sansita Swashed</option>
            <option value="Satisfy">Satisfy</option>
            <option value="Space Mono">Space Mono</option>
          </select>
        </div>}
      </div>
    )
  }
}