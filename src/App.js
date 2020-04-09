import React, {Component} from 'react';
import './App.css';

import HomePage from './pages/homepage/homepage.component';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <HomePage />
      </div>
    );
  }
}

export default App;
