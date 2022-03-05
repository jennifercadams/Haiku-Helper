import React from 'react';

import './WordMenu.css';

export default class WordMenu extends React.Component {
  render() {
    const { menuIndex, line, index, deleteWord, closeWordMenus, blankWord } = this.props;
    return (
      <>
      {menuIndex && !blankWord && <div className="word-menu">
        <button className="word-menu-item" onClick={() => {
          deleteWord(line, index);
          closeWordMenus();
        }}>
          Delete Word
        </button>
        <div className="add-word-container">
          <button className="word-menu-item">Find Synonym</button>
        </div>
        <div className="add-word-container">
          <button className="word-menu-item">Add Word Before</button>
        </div>
        <div className="add-word-container">
          <button className="word-menu-item">Add Word After</button>
        </div>
      </div>}
      {menuIndex && blankWord && <div className="word-menu">
        <button className="word-menu-item blank-word">Add Word</button>
      </div>}
      </>
    )
  }
}