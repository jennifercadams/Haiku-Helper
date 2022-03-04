import React from 'react';

import './Word.css';

export default class Word extends React.Component {
  render() {
    return (
      <button className="word">{this.props.word}</button>
    )
  }
}