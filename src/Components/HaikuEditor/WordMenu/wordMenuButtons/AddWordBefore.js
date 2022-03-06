import React from 'react';

export default class AddWordBefore extends React.Component {
  render() {
    const { line, index, wordInput, addBefore, handleChange, toggleAdd, handleAdd } = this.props;
    return (
      <div className="add-word-container">
        <button className="word-menu-item" onClick={() => toggleAdd('addBefore')}>Add Words Before</button>
        {addBefore && <input type="text" 
          className="add-word" 
          maxLength="30" 
          onChange={handleChange}
          value={wordInput} 
          autoFocus
        />}
        {addBefore && <button className="add-word" onClick={() => handleAdd(line, index, wordInput)}
        >Add</button>}
      </div>
    )
  }
}