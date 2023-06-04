import React, { useContext } from "react";
import ThemeColor from "./ThemeColor";
import themeColors from "../../../../../assets/colors/ThemeColors";
import CombinedContext from "../../../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../../../contexts/ProviderCombinedContext";

const PaletteColor = props => {
  const context = useContext(CombinedContext);
  let colorsRow = [];

  for (let i = 0; i < Object.keys(themeColors).length; i += 9) {
    const row = [];

    for (let j = 0; j < 9; j++) {
      if (Object.keys(themeColors)[i + j] !== undefined) {
        row.push(Object.keys(themeColors)[i + j]);
      }
    }

    colorsRow.push(row);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "mt-2 mb-2"
  }, colorsRow.map((row, index) => /*#__PURE__*/React.createElement(ProviderCombinedContext, {
    key: index
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center"
  }, row.map((color, indexColor) => /*#__PURE__*/React.createElement("div", {
    key: indexColor,
    className: "flex"
  }, /*#__PURE__*/React.createElement(ThemeColor, {
    onChange: props.onChange,
    colorName: color,
    selected: context.theme.themeColor === color
  })))))));
};

export default PaletteColor;