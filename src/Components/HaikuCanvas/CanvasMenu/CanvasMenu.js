import React from 'react';

import Background from './canvasMenuButtons/Background';
import Font from './canvasMenuButtons/Font';

export default class CanvasMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      background: false,
      font: false
    }
    this.toggleOptions = this.toggleOptions.bind(this);
  }

  toggleOptions(optionType) {
    if (optionType === 'background') {
      this.setState(state => ({ background: !state.background, font: false }))
    } else if (optionType === 'font') {
      this.setState(state => ({ background: false, font: !state.font }))
    }
  }

  render() {
    const props = {
      settings: this.props.settings,
      updateSettings: this.props.updateSettings,
      toggleOptions: this.toggleOptions
    }
    return (
      <div id="canvas-menu">
        <Background background={this.state.background} {...props} />
        <Font font={this.state.font} {...props} />
        <button className="canvas-button">Download</button>
      </div>
    )
  }
}