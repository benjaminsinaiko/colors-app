import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

import MiniPalette from './MiniPalette';

import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openDeleteDialog: false,
      deleteId: '',
    };
  }

  goToPalette = (id) => {
    const { history } = this.props;
    history.push(`/palette/${id}`);
  };

  openDialog = (id) => {
    this.setState({ openDeleteDialog: true, deleteId: id });
  };

  closeDialog = () => {
    this.setState({ openDeleteDialog: false, deleteId: '' });
  };

  confirmDelete = () => {
    const { deleteId } = this.state;
    const { deletePalette } = this.props;
    deletePalette(deleteId);
    this.closeDialog();
  };

  render() {
    const { classes, palettes } = this.props;
    const { openDeleteDialog } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Colors</h1>
            <Link to="/palette/new">Create new palette</Link>
          </nav>

          <TransitionGroup className={classes.palettes}>
            {palettes.map((palette, index) => (
              <CSSTransition key={palette.id} timeout={500} classNames="fade">
                <MiniPalette
                  key={palette.id}
                  id={palette.id}
                  index={index}
                  {...palette}
                  goToPalette={this.goToPalette}
                  openDialog={this.openDialog}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={openDeleteDialog}
          onClose={this.closeDialog}
          aria-labelledby="delete-dialog-title"
        >
          <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
          <List>
            <ListItem button onClick={this.confirmDelete}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItem>
            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(PaletteList);
