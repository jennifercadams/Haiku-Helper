import React from 'react';

import './HaikuEditor.css';
import Word from '../Word/Word';

export default class HaikuEditor extends React.Component {

  render() {
    const line1 = this.props.history[0].line1.text.map((word, i) => <Word 
      word={word}
      key={`line-1-word-${i}`}
    />);
    const line2 = this.props.history[0].line2.text.map((word, i) => <Word 
      word={word}
      key={`line-2-word-${i}`}
    />);
    const line3 = this.props.history[0].line3.text.map((word, i) => <Word 
      word={word}
      key={`line-3-word-${i}`}
    />);
    return (
      <div id="haiku-editor">
        <h2>Edit Haiku</h2>
        <div id="editor-line-1">
          {line1}
        </div>
        <div id="editor-line-2">
          {line2}
        </div>
        <div id="editor-line-3">
          {line3}
        </div>
      </div>
    )
  }
}