import React from 'react';

export default class EmptyLineButton extends React.Component {
  render() {
    const { line, index, closeWordMenus, wordInput, addAfter, handleChange, toggleAdd, handleAdd } = this.props;
    return (
      <div className="add-word-container">
        <button 
          className="word-menu-item blank-word" 
          onClick={() => toggleAdd('addAfter')}
        >Add Word</button>
        {addAfter && <input type="text" 
          className="add-word" 
          maxLength="30" 
          onChange={handleChange}
          value={wordInput} 
          autoFocus
        />}
        {addAfter && <button className="add-word" onClick={() => {
          handleAdd(line, index, wordInput);
          closeWordMenus();
        }}>Add</button>}
      </div>
    )
  }
}