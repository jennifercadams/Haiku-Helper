import React from 'react';

import './HaikuForm.css';

export default class HaikuForm extends React.Component {
  render() {
    const { handleChange, handleSubmit, 
      line1, line1Syllables, 
      line2, line2Syllables, 
      line3, line3Syllables, 
      formError, getSyllableCount 
    } = this.props;
    return (
      <form id="haiku-form" onSubmit={handleSubmit}>
        <label htmlFor="line1">Line 1
          <input type="text"
            name="line1"
            id="line1"
            placeholder=" 5 syllables"
            maxLength="100"
            onChange={handleChange}
            value={line1} 
          />
          <span className="form-syllable-msg" style={line1Syllables === 5 ? {color: 'green'} : { color: 'red' }}>
            {line1Syllables || null}
          </span>
        </label>
        <label htmlFor="line2">Line 2
          <input type="text"
            name="line2"
            id="line2"
            placeholder=" 7 syllables"
            maxLength="100"
            onChange={handleChange}
            value={line2} 
          />
          <span className="form-syllable-msg" style={line2Syllables === 7 ? {color: 'green'} : { color: 'red' }}>
            {line2Syllables || null}
          </span>
        </label>
        <label htmlFor="line3">Line 3
          <input type="text" 
            name="line3"
            id="line3"
            placeholder=" 5 syllables"
            maxLength="100"
            onChange={handleChange}
            value={line3} 
          />
          <span className="form-syllable-msg" style={line3Syllables === 5 ? {color: 'green'} : { color: 'red' }}>
            {line3Syllables || null}
          </span>
        </label>
        <p id="error">{formError}</p>
        <div>
          <button id="count-syllables" onClick={getSyllableCount}>Count Syllables</button>
          <input type="submit" value="Go to Editor" />
        </div>
      </form>
    )
  }
}