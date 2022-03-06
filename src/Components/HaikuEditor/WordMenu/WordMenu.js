import React from 'react';

import './WordMenu.css';
import DeleteWord from './wordMenuButtons/DeleteWord';
import EditWord from './wordMenuButtons/EditWord';
import FindSynonym from './wordMenuButtons/FindSynonym';
import AddWordBefore from './wordMenuButtons/AddWordBefore';
import AddWordAfter from './wordMenuButtons/AddWordAfter';
import EmptyLineButton from './wordMenuButtons/EmptyLineButton';

const fetchSynonyms = 'https://api.datamuse.com/words?max=6&ml=';

export default class WordMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordInput: '',
      synonyms: [],
      edit: false,
      addBefore: false,
      addAfter: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.getSynonyms = this.getSynonyms.bind(this);
    this.replaceWord = this.replaceWord.bind(this);
  }

  handleChange(e) {
    const cleanInput = e.target.value.replace(/[^\sa-z'-\.\,\?;:]/gi, '').replace(/\s\s+/g, ' ');
    this.setState({ wordInput: cleanInput });
  }

  toggleAdd(addType) {
    this.setState({ synonyms: [] })
    if (addType === 'addBefore') {
      this.setState(state => ({ edit: false, addBefore: !state.addBefore, addAfter: false, wordInput: '' }));
    } else if (addType === 'addAfter') {
      this.setState(state => ({ edit: false, addBefore: false, addAfter: !state.addAfter, wordInput: '' }));
    } else {
      if (this.state.edit === false) {
        this.setState({ edit: true, addBefore: false, addAfter: false, wordInput: this.props.word });
      } else {
        this.setState({ edit: false, addBefore: false, addAfter: false, wordInput: '' });
      }
    }
  }

  async handleAdd(line, i, input) {
    const awaitAdd = await this.props.addWord;
    const inputWords = input.trim().split(' ').reverse();
    inputWords.forEach(word => {
      if (word !== '') {
        awaitAdd(line, i, word)
      }
    });
    this.props.closeWordMenus();
  }

  async getSynonyms(word) {
    if (this.state.synonyms.length === 0) {
      this.setState({ addBefore: false, addAfter: false })
      const synonyms = await fetch(fetchSynonyms + word)
        .then(response => response.json())
        .then(jsonResponse => jsonResponse.map(result => result.word));
      this.setState({ synonyms: synonyms });
    } else {
      this.setState({ synonyms: [] })
    }
  }

  async replaceWord(line, i, newWord) {
    const awaitDelete = await this.props.deleteWord;
    const awaitAdd = await this.props.addWord;
    const newWords = newWord.trim().split(' ').reverse();
    awaitDelete(line, i);
    newWords.forEach(word => awaitAdd(line, i, word));
    this.props.closeWordMenus();
  }

  render() {
    const { word, line, index, deleteWord, closeWordMenus, blankWord } = this.props;
    const addProps = {
      line: line,
      index: index,
      wordInput: this.state.wordInput,
      edit: this.state.edit,
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
        <EditWord 
          word={word}
          replaceWord={this.replaceWord}
          {...addProps}
        />
        <FindSynonym 
          word={word}
          line={line} 
          index={index} 
          synonyms={this.state.synonyms}
          getSynonyms={this.getSynonyms}
          replaceWord={this.replaceWord}
        />
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