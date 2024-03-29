import React from 'react';

import './Word.css';
import WordMenu from '../WordMenu/WordMenu';

export default class Word extends React.Component {
  render() {
    const { line, index, menus, word, blankWord } = this.props;
    return (
      <div className="word-container">
        <button 
          className="word-button"
          key={`${line}-${index}-button`}
          onClick={() => this.props.toggleWordMenu(line, index)}
        >
          {word}
        </button>
        {menus[index] && <WordMenu 
          key={`${line}-${index}-menu`}
          word={word}
          line={line}
          index={index}
          blankWord={blankWord}
          closeWordMenus={this.props.closeWordMenus}
          deleteWord={this.props.deleteWord}
          addWord={this.props.addWord}
        />}
      </div>
    )
  }
}