function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import { GithubPicker } from "react-color";

class ColorPicker extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleColorChange", color => {
      this.props.onChangeColor(color.hex);
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "absolute z-10 pt-2"
    }, /*#__PURE__*/React.createElement(GithubPicker, {
      width: "112px",
      colors: ["#b80000", "#e91e63", "#db3e00", "#fccb00", "#eb9694", "#f0b7ca", "#fad0c3", "#fef3bd", "#05d808", "#008b02", "#006b76", "#1273de", "#baf4bb", "#c1e1c5", "#bedadc", "#c4def6", "#004dcf", "#5300eb", "#4a5568", "#000000", "#bed3f3", "#d4c4fb", "#d9d9d9", "#ffffff"],
      onChange: color => this.handleColorChange(color)
    }));
  }

}

export default ColorPicker;