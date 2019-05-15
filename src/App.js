import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

class App extends Component {
  render() {
    console.log(generatePalette(seedColors[3]));

    return (
      <div className="App">
        <Palette {...seedColors[4]} />
      </div>
    );
  }
}

export default App;
