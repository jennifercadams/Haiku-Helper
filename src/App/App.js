import React from 'react';

import './App.css';
import { numberToWords } from '../util/numberToWords';

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
      welcome: true, editor: false, canvas: false,
      formError: '', formError2: '',
      line1: '', line1Syllables: null,
      line2: '', line2Syllables: null,
      line3: '', line3Syllables: null,
      haiku: { line1: {}, line2: {}, line3: {} },
      canvasSettings: { background: '#ffffff', font: 'Open Sans', textColor: '#000000' },
      history: []
    }
    this.start = this.start.bind(this);
    this.startOver = this.startOver.bind(this);
    this.backToEditor = this.backToEditor.bind(this);
    this.countSyllables = this.countSyllables.bind(this);
    this.getSyllableCount = this.getSyllableCount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.goToEditor = this.goToEditor.bind(this);
    this.updateSyllableCount = this.updateSyllableCount.bind(this);
    this.deleteWord = this.deleteWord.bind(this);
    this.addWord = this.addWord.bind(this);
    this.goToCanvas = this.goToCanvas.bind(this);
    this.updateCanvasSettings = this.updateCanvasSettings.bind(this);
  }

  // Navigation methods

  start() {
    this.setState({welcome: false})
  }

  startOver() {
    this.setState({ editor: false, canvas: false, formError: '', haiku: { line1: {}, line2: {}, line3: {} } });
  }

  backToEditor() {
    this.setState({ editor: true, canvas: false, formError: '', formError2: '' });
  }

  // Syllable count methods

  async countSyllables(line) {
    const getWordSyllables = async (word) => {
      const count = await fetch(fetchSyllables + word)
        .then(response => response.json())
        .then(jsonResponse => jsonResponse[0].numSyllables)
      return count;
    }
    let counter = 0;
    const lineText = this.state.haiku[line].text.slice();
    for (let i = 0; i < lineText.length; i++) {
      if (lineText[i].match(/^[0-9]+nd$/)) {
        counter++;
      }
      if (lineText[i].match(/[0-9]/)) {
        const number = Number(lineText[i].replace(/[^0-9]/g, ''));
        const numberWords = numberToWords.convert(number).split(' ');
        lineText.splice(i, 1, ...numberWords)
      }
    }
    for (const word of lineText) {
      let cleanWord = word.replace(/[^a-z0-9]/gi, '');
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

  // Haiku Form methods

  handleChange(e) {
    this.setState(state => ({
      formError: '',
      editor: false,
      [e.target.id]: e.target.value,
      [e.target.id + 'Syllables']: null,
      haiku: {
        ...state.haiku, 
        [e.target.id]: { 
          text: e.target.value.trim().replace(/[^\sa-z0-9'-\.\,\?;:]/gi, '').replace(/\s\s+/g, ' ').split(' '), 
          syllables: null
        }
      }
    }));
  }

  async goToEditor(e) {
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
    } else {
      this.setState({ formError: 'Please enter text in each line. '});
    }
  }

  // Haiku Editor methods

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
      formError: '',
      formError2: '',
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
    }), () => this.updateSyllableCount(line));
  }

  addWord(line, i, word) {
    this.setState(state => ({
      formError: '',
      formError2: '',
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
    }), () => this.updateSyllableCount(line));
  }

  goToCanvas() {
    const { haiku, formError } = this.state;
    const fiveSevenFive = haiku.line1.syllables === 5
      && haiku.line2.syllables === 7
      && haiku.line3.syllables === 5;
    if (fiveSevenFive || formError) {
      this.setState({ editor: false, canvas: true });
    } else {
      this.setState({ 
        formError: 'Your syllable counts are not 5 - 7 - 5.', 
        formError2: 'Click "Continue" again to proceed anyway.'
      });
    }
  }

  // Haiku Canvas methods

  updateCanvasSettings(e) {
    this.setState(state => ({
      canvasSettings: { ...state.canvasSettings, [e.target.id]: e.target.value }
    }));
  }

  render() {
    const showForm = !this.state.welcome && !this.state.editor && !this.state.canvas;
    const showEditor = !this.state.welcome && this.state.editor && !this.state.canvas;
    const showCanvas = !this.state.welcome && !this.state.editor && this.state.canvas;
    return (
      <main>
        {this.state.welcome && <Welcome start={this.start} />}
        {!this.state.welcome && <Header />}
        {showForm && <HaikuForm 
          {...this.state}
          handleChange={this.handleChange}
          goToEditor={this.goToEditor} 
          getSyllableCount={this.getSyllableCount}
        />}
        {showEditor && <HaikuEditor 
          haiku={this.state.haiku}
          formError={this.state.formError}
          formError2={this.state.formError2}
          deleteWord={this.deleteWord}
          addWord={this.addWord}
          startOver={this.startOver}
          goToCanvas={this.goToCanvas}
        />}
        {showCanvas && <HaikuCanvas 
          haiku={this.state.haiku}
          settings={this.state.canvasSettings}
          startOver={this.startOver}
          backToEditor={this.backToEditor}
          updateSettings={this.updateCanvasSettings}
        />}
      </main>
    )
  }
}
