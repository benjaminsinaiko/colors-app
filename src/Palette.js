import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import styles from './styles/PaletteStyles';

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      format: 'hex',
    };
  }

  changeLevel = (level) => {
    this.setState({ level });
  };

  changeFormat = (val) => {
    this.setState({ format: val });
  };

  render() {
    const {
      palette: {
        colors, paletteName, emoji, id,
      },
      classes,
    } = this.props;
    const { level, format } = this.state;

    const colorBoxes = colors[level].map(color => (
      <ColorBox
        key={`${color.id}-${color.level}`}
        background={color[format]}
        name={color.name}
        moreUrl={`/palette/${id}/${color.id}`}
        showingFullPalette
      />
    ));

    return (
      <div className={classes.Palette}>
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
          singleColor
        />
        <div className={classes.colors}>{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
