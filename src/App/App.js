import React from 'react';

import './App.css';

import Welcome from '../Components/Welcome/Welcome';
import Header from '../Components/Header/Header';
import HaikuForm from '../Components/HaikuForm/HaikuForm';
import HaikuEditor from '../Components/HaikuEditor/HaikuEditor';
import HaikuCanvas from '../Components/HaikuCanvas/HaikuCanvas';

const fetchSyllables = 'https://api.datamuse.com/words?md=s&max=1&sp=';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      welcome: true,
      editor: false,
      formError: '',
      line1: '', line1Syllables: null,
      line2: '', line2Syllables: null,
      line3: '', line3Syllables: null,
      haiku: { line1: {}, line2: {}, line3: {} },
      history: []
    }
    this.start = this.start.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.countSyllables = this.countSyllables.bind(this);
    this.getSyllableCount = this.getSyllableCount.bind(this);
    this.updateSyllableCount = this.updateSyllableCount.bind(this);
    this.deleteWord = this.deleteWord.bind(this);
    this.addWord = this.addWord.bind(this);
    this.startOver = this.startOver.bind(this);
    this.drawHaikuText = this.drawHaikuText.bind(this);
  }

  start() {
    this.setState({welcome: false})
  }

  handleChange(e) {
    this.setState(state => ({
      formError: '',
      editor: false,
      [e.target.id]: e.target.value,
      [e.target.id + 'Syllables']: null,
      haiku: {
        ...state.haiku, 
        [e.target.id]: { 
          text: e.target.value.trim().replace(/[^\sa-z'-\.\,\?;:]/gi, '').replace(/\s\s+/g, ' ').split(' '), 
          syllables: null
        }
      }
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (this.state.line1 && this.state.line2 && this.state.line3) {
      const areSyllablesCounted = this.state.haiku.line1.syllables
        && this.state.haiku.line2.syllables
        && this.state.haiku.line3.syllables;
      if (!areSyllablesCounted) {
        await this.getSyllableCount(e);
      }
      this.setState(state => ({
        editor: true,
        history: [this.state.haiku, ...state.history],
        line1: '', line1Syllables: null,
        line2: '', line2Syllables: null,
        line3: '', line3Syllables: null
      }))
      this.drawHaikuText();
    } else {
      this.setState({ formError: 'Please enter text in each line. '});
    }
  }

  async countSyllables(line) {
    const getWordSyllables = async (word) => {
      const count = await fetch(fetchSyllables + word)
        .then(response => response.json())
        .then(jsonResponse => jsonResponse[0].numSyllables)
      return count;
    }
    let counter = 0;
    for (const word of this.state.haiku[line].text) {
      const cleanWord = word.replace(/[^a-z]/gi, '');
      const syllables = await getWordSyllables(cleanWord);
      counter += syllables;
    }
    return counter;
  }

  async getSyllableCount(e) {
    e.preventDefault();
    if (this.state.line1 && this.state.line2 && this.state.line3) {
      const line1Count = await this.countSyllables('line1');
      const line2Count = await this.countSyllables('line2');
      const line3Count = await this.countSyllables('line3');
      this.setState(state => ({
        line1Syllables: line1Count,
        line2Syllables: line2Count,
        line3Syllables: line3Count,
        haiku: { 
          line1: { ...state.haiku.line1, syllables: line1Count },
          line2: { ...state.haiku.line2, syllables: line2Count },
          line3: { ...state.haiku.line3, syllables: line3Count }
        }
      }));
    } else {
      this.setState({ formError: 'Please enter text in each line. '});
    }
  }

  async updateSyllableCount(line) {
    const newCount = await this.countSyllables(line);
    this.setState(state => ({
      haiku: {
        ...state.haiku,
        [line]: { ...state.haiku[line], syllables: newCount }
      }
    }))
  }

  deleteWord(line, i) {
    this.setState(state => ({
      haiku: {
        ...state.haiku,
        [line]: {
          ...state.haiku[line],
          text: [
            ...state.haiku[line].text.slice(0, i),
            ...state.haiku[line].text.slice(i + 1)
          ]
        }
      }
    }), () => {
      this.updateSyllableCount(line);
      this.drawHaikuText();
    });
  }

  addWord(line, i, word) {
    this.setState(state => ({
      haiku: {
        ...state.haiku,
        [line]: {
          ...state.haiku[line],
          text: [
            ...state.haiku[line].text.slice(0, i),
            word.trim(),
            ...state.haiku[line].text.slice(i)
          ]
        }
      }
    }), () => {
      this.updateSyllableCount(line);
      this.drawHaikuText();
    });
  }

  startOver() {
    this.setState({ editor: false, haiku: { line1: {}, line2: {}, line3: {} } });
  }

  drawHaikuText() {
    const canvas = document.getElementById('haiku-canvas').getContext('2d');
    canvas.clearRect(0, 0, 400, 300);
    canvas.font = "24px Open Sans";
    canvas.textAlign = "center";
    canvas.fillText(this.state.haiku.line1.text.join(' '), 200, 100);
    canvas.fillText(this.state.haiku.line2.text.join(' '), 200, 150);
    canvas.fillText(this.state.haiku.line3.text.join(' '), 200, 200);
  }

  render() {
    return (
      <main>
        {this.state.welcome && <Welcome start={this.start} />}
        {!this.state.welcome && <Header />}
        {!this.state.welcome && !this.state.editor && <HaikuForm 
          {...this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit} 
          getSyllableCount={this.getSyllableCount}
        />}
        {!this.state.welcome && this.state.editor && <HaikuEditor 
          haiku={this.state.haiku}
          deleteWord={this.deleteWord}
          addWord={this.addWord}
          startOver={this.startOver}
        />}
        {!this.state.welcome && this.state.editor && <HaikuCanvas />}
      </main>
    )
  }
}
