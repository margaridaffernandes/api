import React, { useContext, useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import CombinedContext from "../../../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../../../contexts/ProviderCombinedContext";
import { hexToRgb } from "../../../../../assets/functions/HandleColors/hexToRgb";
import { extractRGBA } from "../../../../../assets/functions/HandleColors/extractRGBA";
import { createPersonalizedPalette } from "../../../../../assets/functions/HandleColors/createPersonalizedTheme";
import "../../../../../styles/colorpickerstyles.css";

const ColorPicker = props => {
  const context = useContext(CombinedContext);
  const [color, setColor] = useState({}); //inicializar o colorPicker na cor do tema actual

  useEffect(() => {
    let initialPalette;

    if (context.theme.themeColor === "personalizada") {
      initialPalette = {
        r: extractRGBA(context.theme.themePalette.$500).r,
        g: extractRGBA(context.theme.themePalette.$500).g,
        b: extractRGBA(context.theme.themePalette.$500).b,
        a: extractRGBA(context.theme.themePalette.$500).a
      };
    } else {
      initialPalette = {
        r: hexToRgb(context.theme.themePalette.$500).r,
        g: hexToRgb(context.theme.themePalette.$500).g,
        b: hexToRgb(context.theme.themePalette.$500).b,
        a: '1'
      };
    }

    setColor(initialPalette);
  }, [context.theme.themePalette, context.theme.themeColor]);

  const onPersonalizedColorChange = c => {
    setColor(c.rgb);
    context.theme.handleThemeColor("personalizada");
    context.theme.handleThemePalette("personalizada", createPersonalizedPalette(c.rgb));
  };

  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col justify-center items-center",
    style: {
      minWidth: '200px'
    }
  }, /*#__PURE__*/React.createElement(SketchPicker, {
    color: color,
    onChangeComplete: color => onPersonalizedColorChange(color)
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-5 w-5 xxl:h-6 xxl:w-6 xxxl:h-8 xxxl:w-8 flex my-1 mx-1 rounded-lg",
    style: {
      background: context.theme.themePalette.$600
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "h-5 w-5 xxl:h-6 xxl:w-6 xxxl:h-8 xxxl:w-8 flex my-1 mx-1 rounded-lg",
    style: {
      background: context.theme.themePalette.$500
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "h-5 w-5 xxl:h-6 xxl:w-6 xxxl:h-8 xxxl:w-8 flex my-1 mx-1 rounded-lg",
    style: {
      background: context.theme.themePalette.$400
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "h-5 w-5 xxl:h-6 xxl:w-6 xxxl:h-8 xxxl:w-8 flex my-1 mx-1 rounded-lg",
    style: {
      background: context.theme.themePalette.$300
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "h-5 w-5 xxl:h-6 xxl:w-6 xxxl:h-8 xxxl:w-8 flex my-1 mx-1 rounded-lg",
    style: {
      background: context.theme.themePalette.$200
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "h-5 w-5 xxl:h-6 xxl:w-6 xxxl:h-8 xxxl:w-8 flex my-1 mx-1 rounded-lg",
    style: {
      background: context.theme.themePalette.$100
    }
  }))));
};

export default ColorPicker;