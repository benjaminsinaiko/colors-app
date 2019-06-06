import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import seedColors from './seedColors';
import NewPaletteForm from './NewPaletteForm';
import generatePalette from './colorHelpers';
import './App.css';

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

  deletePalette = (id) => {
    this.setState(
      prevState => ({ palettes: prevState.palettes.filter(palette => palette.id !== id) }),
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
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={500}>
              <Switch location={location}>
                <Route
                  exact
                  path="/palette/new"
                  render={routeProps => (
                    <div className="page">
                      <NewPaletteForm
                        palettes={palettes}
                        savePalette={this.savePalette}
                        {...routeProps}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={routeProps => (
                    <div className="page">
                      <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.paletteId),
                        )}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={routeProps => (
                    <div className="page">
                      <PaletteList
                        palettes={palettes}
                        deletePalette={this.deletePalette}
                        {...routeProps}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={routeProps => (
                    <div className="page">
                      <Palette
                        palette={generatePalette(this.findPalette(routeProps.match.params.id))}
                      />
                    </div>
                  )}
                />
                <Route path="/palette/:paletteId/:colorId" render={() => <SingleColorPalette />} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}

export default App;
