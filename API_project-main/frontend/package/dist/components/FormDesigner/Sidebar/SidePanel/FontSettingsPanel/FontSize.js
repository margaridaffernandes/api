import React, { useContext, useEffect, useState } from "react";
import CombinedContext from "../../../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../../../contexts/ProviderCombinedContext";
import Stepper from "../../../UI/Stepper/Stepper";

const FontSize = props => {
  const context = useContext(CombinedContext);
  let fontSize = parseInt(context.font.fontSize[props.identifier].replace('px', ''));
  const [size, setSize] = useState(fontSize);

  const handleChange = action => {
    action === "increment" ? setSize(size + 1) : setSize(size - 1);
  };

  useEffect(() => {
    let sizeValue = size.toString().concat("px");
    context.font.handleFontSize(props.identifier, sizeValue);
  }, [size, props.identifier]);
  document.documentElement.style.setProperty('--stepper-hover', context.theme.themePalette.$200);
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row justify-between items-center py-1 px-1 xxl:py-2 xxl:px-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-10 xxl:text-11 xxxl:text-xs font-bold text-gray-700 leading-tight mr-1 xxl:mr-2 xxxl:mr-4"
  }, props.title), /*#__PURE__*/React.createElement(Stepper, {
    size: size,
    handleChange: handleChange
  })));
};

export default FontSize;