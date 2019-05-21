import React, { Component } from 'react';
import ColorBox from './ColorBox';

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    const { palette, colorId } = this.props;
    this._shades = this.gatherShades(palette, colorId);
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

  render() {
    const colorBox = this._shades.map(color => (
      <ColorBox key={color.level} name={color.name} background={color.hex} showLink={false} />
    ));

    return (
      <div className="Palette">
        <h1>SINGLE COLOR PALETTE</h1>
        <div className="Palette-colors">{colorBox}</div>
      </div>
    );
  }
}

export default SingleColorPalette;
