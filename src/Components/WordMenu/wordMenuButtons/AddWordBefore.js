import React from 'react';

export default class AddWordBefore extends React.Component {
  render() {
    const { line, index, closeWordMenus, wordInput, addBefore, handleChange, toggleAdd, handleAdd } = this.props;
    return (
      <div className="add-word-container">
        <button className="word-menu-item" onClick={() => toggleAdd('addBefore')}>Add Word Before</button>
        {addBefore && <input type="text" 
          className="add-word" 
          maxLength="30" 
          onChange={handleChange}
          value={wordInput} 
          autoFocus
        />}
        {addBefore && <button className="add-word" onClick={() => {
          handleAdd(line, index, wordInput);
          closeWordMenus();
        }}>Add</button>}
      </div>
    )
  }
}