import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import arrayMove from 'array-move';
import DraggableColorList from './DragableColorList';
import PaletteFormNav from './PaletteFormNav';

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
    this.setState({ currentColor: newColor.hex }, () => {});
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
  };

  render() {
    const { paletteIsFull } = this.props;
    const { currentColor, newColorName } = this.state;
    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
          disableAlpha
        />
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator
            value={newColorName}
            name="newColorName"
            onChange={this.handleChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={[
              'Enter a color name',
              'Color name must be unique',
              'Color already used',
            ]}
          />
          <Button
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

export default ColorPickerForm;
