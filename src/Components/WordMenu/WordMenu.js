import React from 'react';

import './WordMenu.css';

export default class WordMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordInput: '',
      addBefore: false,
      addAfter: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(e) {
    this.setState({ wordInput: e.target.value });
  }

  toggleAdd(addType) {
    if (addType === 'addBefore') {
      this.setState(state => ({ addBefore: !state.addBefore, addAfter: false, wordInput: '' }));
    } else {
      this.setState(state => ({ addBefore: false, addAfter: !state.addAfter, wordInput: '' }));
    }
  }

  handleAdd(line, i, word) {
    this.props.addWord(line, i, word);
    this.setState({ wordInput: '', addBefore: false, addAfter: false });
  }

  render() {
    const { line, index, deleteWord, closeWordMenus, blankWord } = this.props;
    return (
      <>
      {!blankWord && <div className="word-menu">
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
          <button className="word-menu-item" onClick={() => this.toggleAdd('addBefore')}>Add Word Before</button>
          {this.state.addBefore && <input type="text" 
            className="add-word" 
            maxLength="30" 
            onChange={this.handleChange}
            value={this.state.wordInput} 
            autoFocus
          />}
          {this.state.addBefore && <button className="add-word" onClick={() => {
            this.handleAdd(line, index, this.state.wordInput);
            closeWordMenus();
          }}>Add</button>}
        </div>
        <div className="add-word-container">
          <button className="word-menu-item" onClick={() => this.toggleAdd('addAfter')}>Add Word After</button>
          {this.state.addAfter && <input type="text" 
            className="add-word" 
            maxLength="30" 
            onChange={this.handleChange}
            value={this.state.wordInput} 
            autoFocus
          />}
          {this.state.addAfter && <button className="add-word" onClick={() => {
            this.handleAdd(line, index + 1, this.state.wordInput);
            closeWordMenus();
          }}>Add</button>}
        </div>
      </div>}
      {blankWord && <div className="word-menu">
        <div className="add-word-container">
          <button 
            className="word-menu-item blank-word" 
            onClick={() => this.toggleAdd('addAfter')}
          >Add Word</button>
          {this.state.addAfter && <input type="text" 
            className="add-word" 
            maxLength="30" 
            onChange={this.handleChange}
            value={this.state.wordInput} 
            autoFocus
          />}
          {this.state.addAfter && <button className="add-word" onClick={() => {
            this.handleAdd(line, index, this.state.wordInput);
            closeWordMenus();
          }}>Add</button>}
        </div>
      </div>}
      </>
    )
  }
}