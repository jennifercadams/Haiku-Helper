import React from 'react';

import './WordMenu.css';

export default class WordMenu extends React.Component {
  render() {
    return (
      <div className="word-menu">
        <button>Delete Word</button>
        <button>Find Synonym</button>
        <button>Add Word Before</button>
        <button>Add Word After</button>
      </div>
    )
  }
}