import React from 'react';

import './HaikuEditor.css';
import Word from '../Word/Word';

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
      deleteWord: this.props.deleteWord
    }
    const line1 = this.props.haiku.line1.text.map((word, i) => <Word 
      line="line1"
      word={word}
      key={`line-1-word-${i}`}
      index={i}
      menus={this.state.line1Menus}
      {...methods}
    />);
    const line2 = this.props.haiku.line2.text.map((word, i) => <Word 
      line="line2"
      word={word}
      key={`line-2-word-${i}`}
      index={i}
      menus={this.state.line2Menus}
      {...methods}
    />);
    const line3 = this.props.haiku.line3.text.map((word, i) => <Word 
      line="line3"
      word={word}
      key={`line-3-word-${i}`}
      index={i}
      menus={this.state.line3Menus}
      {...methods}
    />);
    return (
      <div id="haiku-editor">
        <h2>Edit Haiku</h2>
        <div id="editor-line-1">{line1}</div>
        <div id="editor-line-2">{line2}</div>
        <div id="editor-line-3">{line3}</div>
      </div>
    )
  }
}