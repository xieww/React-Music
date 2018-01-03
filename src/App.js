import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import TopBars from './components/TopBars/TopBar';
import TabMenu from './components/TabMenu/TabMenu';


class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBars></TopBars>
        <TabMenu></TabMenu>
      </div>
    );
  }
}

export default App;
