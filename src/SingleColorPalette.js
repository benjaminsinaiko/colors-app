import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import styles from './styles/PaletteStyles';
import ColorBox from './ColorBox';

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    const { palette, colorId } = this.props;
    this._shades = this.gatherShades(palette, colorId);
    this.state = {
      format: 'hex',
    };
  }

  gatherShades = (palette, colorToFilterBy) => {
    let shades = [];
    const allColors = palette.colors;

    const colorKeys = Object.keys(allColors);
    colorKeys.forEach((colorKey) => {
      shades = shades.concat(allColors[colorKey].filter(color => color.id === colorToFilterBy));
    });
    return shades.slice(1);
  };

  changeFormat = (val) => {
    this.setState({ format: val });
  };

  render() {
    const { format } = this.state;
    const {
      palette: { paletteName, emoji, id },
      classes,
    } = this.props;
    const colorBox = this._shades.map(color => (
      <ColorBox
        key={color.level}
        name={color.name}
        background={color[format]}
        showingFullPalette={false}
      />
    ));

    return (
      <div className={classes.Palette}>
        <Navbar handleChange={this.changeFormat} isSingleColor={false} />
        <div className={classes.colors}>
          {colorBox}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`}>GO BACK</Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
