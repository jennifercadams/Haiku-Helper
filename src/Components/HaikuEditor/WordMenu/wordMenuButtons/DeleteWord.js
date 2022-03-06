import React from 'react';

export default class DeleteWord extends React.Component {
  render() {
    const { line, index, deleteWord, closeWordMenus } = this.props;
    return (
      <button 
        className="word-menu-item" 
        onClick={() => {
          deleteWord(line, index);
          closeWordMenus();
        }}
      >Delete Word</button>
    )
  }  
}