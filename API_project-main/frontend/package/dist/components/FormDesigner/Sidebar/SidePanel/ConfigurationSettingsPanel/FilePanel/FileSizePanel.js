import React, { useContext, useEffect, useState } from "react";
import CombinedContext from "../../../../../../contexts/CombinedContext";
import PrefixInput from "../../../../../UI/Input/PrefixInput";

const FileSizePanel = props => {
  const context = useContext(CombinedContext);
  const [fileMaxSize, setFileMaxSize] = useState([]);
  useEffect(() => {
    if (context.datatypes.fileMaxSize[context.composition.openCompositionPlanningPath]) {
      setFileMaxSize(context.datatypes.fileMaxSize[context.composition.openCompositionPlanningPath]);
    }
  }, [context.datatypes.fileMaxSize, context.composition.openCompositionPlanningPath]);

  const handleFileSizeChange = e => {
    let value = e.target.value;
    setFileMaxSize(value);
    context.datatypes.handleFileMaxSize(context.composition.openCompositionPlanningPath, value);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row justify-center items-end"
  }, /*#__PURE__*/React.createElement(PrefixInput, {
    prefix: "Valor m\xE1x:",
    onChange: event => handleFileSizeChange(event),
    value: fileMaxSize,
    type: "number"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500 text-11 pb-1"
  }, "MB"));
};

export default FileSizePanel;