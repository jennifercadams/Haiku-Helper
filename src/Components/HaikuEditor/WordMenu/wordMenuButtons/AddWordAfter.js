import React from 'react';

export default class AddWordAfter extends React.Component {
  render() {
    const { line, index, wordInput, addAfter, handleChange, toggleAdd, handleAdd } = this.props;
    return (
      <div className="add-word-container">
        <button className="word-menu-item" onClick={() => toggleAdd('addAfter')}>Add Words After</button>
        {addAfter && <input type="text" 
          className="add-word" 
          maxLength="30" 
          onChange={handleChange}
          value={wordInput} 
          autoFocus
        />}
        {addAfter && <button className="add-word" onClick={() => handleAdd(line, index + 1, wordInput)}
        >Add</button>}
      </div>
    )
  }
}