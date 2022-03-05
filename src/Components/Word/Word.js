import React from 'react';

import './Word.css';

export default class Word extends React.Component {
  render() {
    return (
      <button className="word" key={this.props.index}>{this.props.word}</button>
    )
  }
}