import React from 'react';

import './Word.css';
import WordMenu from '../WordMenu/WordMenu';

export default class Word extends React.Component {
  render() {
    const { line, index, menus } = this.props;
    return (
      <div className="word-container">
        <button 
          className="word-button"
          key={`${line}-${index}-button`}
          onClick={() => this.props.toggleWordMenu(line, index)}
        >
          {this.props.word}
        </button>
        <WordMenu 
          key={`${line}-${index}-menu`}
          menuIndex={menus[index]}
        />
      </div>
    )
  }
}