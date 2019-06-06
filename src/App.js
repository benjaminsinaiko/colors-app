import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import seedColors from './seedColors';
import NewPaletteForm from './NewPaletteForm';
import generatePalette from './colorHelpers';

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.state = {
      palettes: savedPalettes || seedColors,
    };
  }

  findPalette = id => this.state.palettes.find(palette => palette.id === id);

  savePalette = (newPalette) => {
    this.setState(
      prevState => ({ palettes: [...prevState.palettes, newPalette] }),
      this.syncLocalStorage,
    );
  };

  syncLocalStorage = () => {
    const { palettes } = this.state;
    // save palettes to localStoreage
    window.localStorage.setItem('palettes', JSON.stringify(palettes));
  };

  render() {
    const { palettes } = this.state;
    return (
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={routeProps => (
            <NewPaletteForm palettes={palettes} savePalette={this.savePalette} {...routeProps} />
          )}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={routeProps => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={routeProps => <PaletteList palettes={palettes} {...routeProps} />}
        />
        <Route
          exact
          path="/palette/:id"
          render={routeProps => (
            <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
          )}
        />
        <Route path="/palette/:paletteId/:colorId" render={() => <SingleColorPalette />} />
      </Switch>
    );
  }
}

export default App;
