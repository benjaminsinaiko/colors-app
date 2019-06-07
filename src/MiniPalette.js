import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/MiniPaletteStyles';

class MiniPalette extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleClick = () => {
    const { id, goToPalette } = this.props;
    goToPalette(id);
  };

  openDialog = (e) => {
    e.stopPropagation();
    const { openDialog, id } = this.props;
    openDialog(id);
  };

  render() {
    const {
      classes, paletteName, emoji, colors, index,
    } = this.props;
    const miniColorBoxes = colors.map(color => (
      <div
        key={color.name}
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
      />
    ));
    return (
      <div
        className={classes.root}
        onClick={this.handleClick}
        onKeyDown={this.handleClick}
        role="button"
        tabIndex={index}
      >
        <DeleteIcon
          className={classes.deleteIcon}
          style={{ transition: 'all 0.3s ease-in-out' }}
          onClick={this.openDialog}
        />
        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
