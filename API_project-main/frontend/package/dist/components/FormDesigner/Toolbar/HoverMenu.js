import React from "react";

const HoverMenu = props => /*#__PURE__*/React.createElement("div", {
  style: {
    zIndex: 9999,
    width: props.data ? "175px" : "80px",
    marginTop: props.isFormTitle ? "30px" : props.isSection ? "25px" : "28px",
    marginRight: props.isSection ? props.isFormTitle ? "15px" : "68px" : "38px"
  },
  className: "absolute break-all top-0 right-0 flex flex-col rounded-sm border shadow-xs bg-gray-200 justify-between py-1 px-2"
}, props.data ? Object.keys(props.data).filter(x => x !== "ruleMandatory" && x !== "ruleVisibility" && x !== "itemName" && x !== "itemPath" && x !== "itemsList").map(x => {
  if (x === "InternalFunctions") {
    return /*#__PURE__*/React.createElement("div", {
      key: x,
      className: "flex w-full py-1"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-700 leading-tight"
    }, x, ":", " ", props.data[x].map(y => {
      return y.type;
    }).join(", ")));
  } else {
    return /*#__PURE__*/React.createElement("div", {
      key: x,
      className: "flex w-full py-1"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-700 leading-tight"
    }, x, ": ", props.data[x].join(", ")));
  }
}) : /*#__PURE__*/React.createElement("p", {
  className: "text-xs text-gray-700 leading-tight"
}, "Sem dados"));

export default HoverMenu;