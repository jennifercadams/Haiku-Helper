import React from 'react';

import './WordMenu.css';
import DeleteWord from './wordMenuButtons/DeleteWord';
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
      addBefore: false,
      addAfter: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.getSynonyms = this.getSynonyms.bind(this);
    this.replaceWithSynonym = this.replaceWithSynonym.bind(this);
  }

  handleChange(e) {
    this.setState({ wordInput: e.target.value });
  }

  toggleAdd(addType) {
    this.setState({ synonyms: [] })
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

  async replaceWithSynonym(line, i, synonym) {
    const awaitDelete = await this.props.deleteWord;
    const awaitAdd = await this.props.addWord;
    awaitDelete(line, i);
    awaitAdd(line, i, synonym);
    this.props.closeWordMenus();
  }

  render() {
    const { word, line, index, deleteWord, closeWordMenus, blankWord } = this.props;
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
        <FindSynonym 
          word={word}
          line={line} 
          index={index} 
          synonyms={this.state.synonyms}
          getSynonyms={this.getSynonyms}
          replaceWithSynonym={this.replaceWithSynonym}
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