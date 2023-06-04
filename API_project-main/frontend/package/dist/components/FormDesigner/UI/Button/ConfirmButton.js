import React, { useContext } from "react";
import CombinedContext from "../../../../contexts/CombinedContext";

const ConfirmButton = props => {
  const context = useContext(CombinedContext);
  return /*#__PURE__*/React.createElement("div", {
    onClick: props.handleConfirm,
    className: "cursor-pointer flex justify-end pr-4 pb-4"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: context.theme.themePalette.$400
    },
    className: "hover:text-blue-500 text-10 xxl:text-xs leading-tight"
  }, props.title));
};

export default ConfirmButton;