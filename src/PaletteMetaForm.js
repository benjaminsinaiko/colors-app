import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
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

  handleSubmit = () => {
    const { handleSubmit } = this.props;
    const { newPaletteName } = this.state;
    handleSubmit(newPaletteName);
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { toggleForm } = this.props;
    toggleForm();
    this.setState({ open: false });
  };

  render() {
    const { open, newPaletteName } = this.state;
    return (
      <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={this.handleSubmit}>
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
    );
  }
}

export default PaletteMetaForm;
