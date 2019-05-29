import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import ColorBox from './ColorBox';

const styles = {
  Palette: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  colors: { height: '90%' },
  goBack: {
    width: '20%',
    height: props => (props.showingFullPalette ? '25%' : '50%'),
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
    opacity: 1,
    backgroundColor: 'black',
    '& a': {
      color: 'white',
      width: '100px',
      height: '30px',
      position: 'absolute',
      display: 'inline-block',
      top: '50%',
      left: '50%',
      marginTop: '-15px',
      marginLeft: '-50px',
      textAlign: 'center',
      outline: 'none',
      background: 'rgba(255, 255, 255, 0.3)',
      fontSize: '1rem',
      lineHeight: '30px',
      textTransform: 'uppercase',
      textDecoration: 'none',
      border: 'none',
    },
  },
};

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
