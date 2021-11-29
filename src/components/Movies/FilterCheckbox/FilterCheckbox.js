import React, { Component } from "react";
import Switch from "react-switch";

class FilterCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: props.isShortFilms };
    this.handleChangeShortFilmsFilter = props.onShortFilms;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
    this.handleChangeShortFilmsFilter(checked)
  }

  render() {
    return (
      <label className="switch">
        <Switch
          onChange={this.handleChange}
          checked={this.state.checked}
          onColor='#2BE080'
          offColor='#C4C4C4'
          uncheckedIcon={false}
          checkedIcon={false}
          height={20}
          width={36}
          handleDiameter={8}
          activeBoxShadow='0 0 1px 2px #2BE080'
         />
         <span className="switch__text">Короткометражки</span>
      </label>
    );
  }
}
export default FilterCheckbox;