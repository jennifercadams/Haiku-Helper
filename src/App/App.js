import React from 'react';

import './App.css';

import Welcome from '../Components/Welcome/Welcome';
import Header from '../Components/Header/Header';
import HaikuForm from '../Components/HaikuForm/HaikuForm';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      welcome: true,
      line1: '',
      line2: '',
      line3: '',
      haiku: {
        line1: {},
        line2: {},
        line3: {}
      },
      history: []
    }
    this.start = this.start.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getSyllableCount = this.getSyllableCount.bind(this);
  }

  start() {
    this.setState({welcome: false})
  }

  handleChange(e) {
    this.setState(state => ({
      [e.target.id]: e.target.value,
      haiku: {
        ...state.haiku, 
        [e.target.id]: { text: e.target.value.split(' '), syllables: null }
      }
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState(state => ({
      history: [this.state.haiku, ...state.history],
      line1: '',
      line2: '',
      line3: '',
      haiku: {}
    }))
  }

  getSyllableCount(e) {
    e.preventDefault();
  }

  render() {
    return (
      <main>
        {this.state.welcome && <Welcome start={this.start} />}
        {!this.state.welcome && <Header />}
        {!this.state.welcome && <HaikuForm 
          line1={this.state.line1}
          line2={this.state.line2}
          line3={this.state.line3}
          haiku={this.state.haiku}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit} 
          getSyllableCount={this.getSyllableCount}
        />}
      </main>
    )
  }
}
