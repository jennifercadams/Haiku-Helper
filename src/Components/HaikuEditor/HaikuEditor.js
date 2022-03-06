import React from 'react';

import './HaikuEditor.css';
import Word from './Word/Word';

export default class HaikuEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      line1Menus: this.props.haiku.line1.text.map(_ => false),
      line2Menus: this.props.haiku.line2.text.map(_ => false),
      line3Menus: this.props.haiku.line3.text.map(_ => false)
    }
    this.closeWordMenus = this.closeWordMenus.bind(this);
    this.toggleWordMenu = this.toggleWordMenu.bind(this);
  }

  closeWordMenus() {
    this.setState({
      line1Menus: this.props.haiku.line1.text.map(_ => false),
      line2Menus: this.props.haiku.line2.text.map(_ => false),
      line3Menus: this.props.haiku.line3.text.map(_ => false)
    });
  }

  toggleWordMenu(line, i) {
    const isOpen = this.state[line + 'Menus'][i];
    this.closeWordMenus();
    if (!isOpen) {
      this.setState(state => {
        state[line + 'Menus'][i] = true;
      })
    }
  }

  render() {
    const methods = {
      closeWordMenus: this.closeWordMenus,
      toggleWordMenu: this.toggleWordMenu,
      deleteWord: this.props.deleteWord,
      addWord: this.props.addWord
    }
    const line1 = this.props.haiku.line1.text.map((word, i) => <Word 
      blankWord={false}
      line="line1"
      word={word}
      key={`line-1-word-${i}`}
      index={i}
      menus={this.state.line1Menus}
      {...methods}
    />);
    const line2 = this.props.haiku.line2.text.map((word, i) => <Word 
      blankWord={false}
      line="line2"
      word={word}
      key={`line-2-word-${i}`}
      index={i}
      menus={this.state.line2Menus}
      {...methods}
    />);
    const line3 = this.props.haiku.line3.text.map((word, i) => <Word 
      blankWord={false}
      line="line3"
      word={word}
      key={`line-3-word-${i}`}
      index={i}
      menus={this.state.line3Menus}
      {...methods}
    />);
    const blankWord = (line) => <Word 
      blankWord={true}
      line={line}
      word=""
      key={`${line}-blank`}
      index={0}
      menus={this.state[line + 'Menus']}
      {...methods}
    />;
    return (
      <div id="haiku-editor">
        <div id="editor-line-1">
          {line1.length > 0 ? line1 : blankWord('line1')}
          <span style={this.props.haiku.line1.syllables === 5 ? {color: 'green'} : { color: 'red' }}>
            {this.props.haiku.line1.syllables}
          </span>
        </div>
        <div id="editor-line-2">
          {line2.length > 0 ? line2 : blankWord('line2')}
          <span style={this.props.haiku.line2.syllables === 7 ? {color: 'green'} : { color: 'red' }}>
            {this.props.haiku.line2.syllables}
          </span>
        </div>
        <div id="editor-line-3">
          {line3.length > 0 ? line3 : blankWord('line3')}
          <span style={this.props.haiku.line3.syllables === 5 ? {color: 'green'} : { color: 'red' }}>
            {this.props.haiku.line3.syllables}
          </span>
        </div>
        <button id="start-over" onClick={this.props.startOver}>Start Over</button>
      </div>
    )
  }
}