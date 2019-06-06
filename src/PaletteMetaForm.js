import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openStage: 'form',
      newPaletteName: '',
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => this.props.palettes.every(
      ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase(),
    ));
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  showEmojiPicker = () => {
    this.setState({ openStage: 'emoji' });
  };

  savePalette = (emoji) => {
    const { handleSubmit } = this.props;
    const { newPaletteName } = this.state;
    const newPalette = {
      paletteName: newPaletteName,
      emoji: emoji.native,
    };
    handleSubmit(newPalette);
    this.setState({ openStage: '' });
  };

  handleSubmit = () => {
    const { handleSubmit } = this.props;
    const { newPaletteName } = this.state;
    handleSubmit(newPaletteName);
  };

  handleClose = () => {
    const { toggleForm } = this.props;
    toggleForm();
  };

  render() {
    const { openStage, newPaletteName } = this.state;
    return (
      <>
        <Dialog open={openStage === 'emoji'} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
          <Picker title="Pick a Palette emoji" onSelect={this.savePalette} />
        </Dialog>
        <Dialog
          open={openStage === 'form'}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                {"Please enter a name for your new beautiful palette. Make sure it's unique."}
              </DialogContentText>

              <TextValidator
                label="Palette Name"
                value={newPaletteName}
                name="newPaletteName"
                onChange={this.handleChange}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['Enter palette name', 'Palette name already used']}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </>
    );
  }
}

export default PaletteMetaForm;
