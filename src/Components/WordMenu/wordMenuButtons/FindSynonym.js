import React from 'react';

export default class FindSynonym extends React.Component {
  render() {
    const { word, line, index, synonyms, getSynonyms, replaceWord } = this.props;
    const synonymList = synonyms.map((synonym, i) => (<button
      className="synonym"
      key={`${synonym}+${i}`}
      index={i}
      onClick={() => replaceWord(line, index, synonym)}
    >{synonym}</button>))
    return (
      <div className="add-word-container">
        <button className="word-menu-item" onClick={() => getSynonyms(word)}>Find Synonym</button>
        <div className="synonym-container">{synonymList}</div>
      </div>
    )
  }
}