import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const styles = {
  picker: {
    width: '100% !important',
    marginTop: '2rem',
  },
  addColor: {
    width: '100%',
    padding: '1rem',
    marginTop: '1rem',
    fontSize: '2rem',
  },
  colorNameInput: {
    width: '100%',
    height: '70px',
  },
};
class ColorPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: 'teal',
      newColorName: '',
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', value => this.props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase()));
    ValidatorForm.addValidationRule('isColorUnique', () => this.props.colors.every(({ color }) => color !== this.state.currentColor));
  }

  updateCurrentColor = (newColor) => {
    this.setState({ currentColor: newColor.hex });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    const { addNewColor } = this.props;
    const { currentColor, newColorName } = this.state;
    const newColor = {
      color: currentColor,
      name: newColorName,
    };
    addNewColor(newColor);
    this.setState({ currentColor: '', newColorName: '' });
  };

  render() {
    const { paletteIsFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;
    return (
      <div>
        <ChromePicker
          className={classes.picker}
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
          disableAlpha
        />
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator
            className={classes.colorNameInput}
            value={newColorName}
            name="newColorName"
            placeholder="Color Name"
            variant="filled"
            margin="normal"
            onChange={this.handleChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={[
              'Enter a color name',
              'Color name must be unique',
              'Color already used',
            ]}
          />
          <Button
            className={classes.addColor}
            variant="contained"
            type="submit"
            color="primary"
            disabled={paletteIsFull}
            style={{ backgroundColor: paletteIsFull ? 'gray' : currentColor }}
          >
            {paletteIsFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
