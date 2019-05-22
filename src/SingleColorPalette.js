import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
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
    } = this.props;
    const colorBox = this._shades.map(color => (
      <ColorBox key={color.level} name={color.name} background={color[format]} showLink={false} />
    ));

    return (
      <div className="SingleColorPalette Palette">
        <Navbar handleChange={this.changeFormat} isSingleColor={false} />
        <div className="Palette-colors">
          {colorBox}
          <div className="go-back ColorBox">
            <Link to={`/palette/${id}`} className="back-button">
              Go Back
            </Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default SingleColorPalette;
