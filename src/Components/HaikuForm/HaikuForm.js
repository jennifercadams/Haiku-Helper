import React from 'react';

import './HaikuForm.css';

export default class HaikuForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form id="haiku-form" onSubmit={this.props.handleSubmit}>
        <label htmlFor="line-1">Line 1
          <input type="text"
            name="line1"
            id="line1"
            placeholder=" 5 syllables"
            maxLength="100"
            onChange={this.props.handleChange}
            value={this.props.line1} 
          />
          <span id="line-1-msg" style={this.props.haiku.line1.syllables === 5 ? {color: 'green'} : { color: 'red' }}>
            {this.props.haiku.line1.syllables || null}
          </span>
        </label>
        <label htmlFor="line-2">Line 2
          <input type="text"
            name="line2"
            id="line2"
            placeholder=" 7 syllables"
            maxLength="100"
            onChange={this.props.handleChange}
            value={this.props.line2} 
          />
          <span id="line-2-msg" style={this.props.haiku.line2.syllables === 7 ? {color: 'green'} : { color: 'red' }}>
            {this.props.haiku.line2.syllables || null}
          </span>
        </label>
        <label htmlFor="line-3">Line 3
          <input type="text" 
            name="line3"
            id="line3"
            placeholder=" 5 syllables"
            maxLength="100"
            onChange={this.props.handleChange}
            value={this.props.line3} 
          />
          <span id="line-3-msg" style={this.props.haiku.line3.syllables === 5 ? {color: 'green'} : { color: 'red' }}>
            {this.props.haiku.line3.syllables || null}
          </span>
        </label>
        <div>
          <button id="count-syllables" onClick={this.props.getSyllableCount}>Count Syllables</button>
          <input type="submit" />
        </div>
      </form>
    )
  }
}