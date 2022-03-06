import React from 'react';

export default class EditWord extends React.Component {
  render() {
    const { line, index, wordInput, edit, handleChange, toggleAdd, replaceWord } = this.props;
    return (
      <div className="add-word-container">
        <button className="word-menu-item" onClick={() => toggleAdd('edit')}>Edit Word</button>
        {edit && <input type="text" 
          className="add-word" 
          maxLength="30" 
          onChange={handleChange}
          value={wordInput} 
          autoFocus
        />}
        {edit && <button className="add-word" onClick={() => replaceWord(line, index, wordInput)}
        >Add</button>}
    </div>
    )
  }
}