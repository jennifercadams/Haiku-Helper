import React from 'react';

import './HaikuEditor.css';

export default class HaikuEditor extends React.Component {
  render() {
    return (
      <div id="haiku-editor">
        <h2>Edit Haiku</h2>
        <p>{this.props.history[0].line1.text.join(' ')}</p>
        <p>{this.props.history[0].line2.text.join(' ')}</p>
        <p>{this.props.history[0].line3.text.join(' ')}</p>
      </div>
    )
  }
}