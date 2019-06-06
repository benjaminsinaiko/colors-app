import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import MiniPalette from './MiniPalette';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
  goToPalette = (id) => {
    const { history } = this.props;
    history.push(`/palette/${id}`);
  };

  render() {
    const { classes, palettes, deletePalette } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Colors</h1>
            <Link to="/palette/new">Create new palette</Link>
          </nav>
          <div className={classes.palettes}>
            {palettes.map((palette, index) => (
              <MiniPalette
                key={palette.id}
                id={palette.id}
                index={index}
                {...palette}
                handleClick={() => this.goToPalette(palette.id)}
                handleDelete={deletePalette}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(PaletteList);
