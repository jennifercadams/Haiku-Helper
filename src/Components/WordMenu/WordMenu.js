import React from 'react';

import './WordMenu.css';

export default class WordMenu extends React.Component {
  render() {
    return (
      <>
      {this.props.menuIndex && <div className="word-menu">
        <button className="word-menu-item">Delete Word</button>
        <button className="word-menu-item">Find Synonym</button>
        <button className="word-menu-item">Add Word Before</button>
        <button className="word-menu-item">Add Word After</button>
      </div>}
      </>
    )
  }
}