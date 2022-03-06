import React from 'react';

import './WordMenu.css';
import DeleteWord from './wordMenuButtons/DeleteWord';
import FindSynonym from './wordMenuButtons/FindSynonym';
import AddWordBefore from './wordMenuButtons/AddWordBefore';
import AddWordAfter from './wordMenuButtons/AddWordAfter';
import EmptyLineButton from './wordMenuButtons/EmptyLineButton';

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
    const addProps = {
      line: line,
      index: index,
      closeWordMenus: closeWordMenus,
      wordInput: this.state.wordInput,
      addBefore: this.state.addBefore,
      addAfter: this.state.addAfter,
      handleChange: this.handleChange,
      toggleAdd: this.toggleAdd,
      handleAdd: this.handleAdd
    }
    return (
      <>
      {!blankWord && <div className="word-menu">
        <DeleteWord 
          line={line} 
          index={index} 
          deleteWord={deleteWord} 
          closeWordMenus={closeWordMenus} 
        />
        <FindSynonym />
        <AddWordBefore {...addProps} />
        <AddWordAfter {...addProps} />
      </div>}
      {blankWord && <div className="word-menu">
        <EmptyLineButton {...addProps} />
      </div>}
      </>
    )
  }
}