import { faCog, faEllipsisV, faPen, faPlus, faEye, faEyeSlash, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
const OptionsButton = /*#__PURE__*/React.forwardRef((props, ref) => {
  let icon = null;

  switch (props.icon) {
    case "faCog":
      icon = faCog;
      break;

    case "faEllipsisV":
      icon = faEllipsisV;
      break;

    case "faPlus":
      icon = faPlus;
      break;

    case "faPen":
      icon = faPen;
      break;

    case "faEye":
      icon = faEye;
      break;

    case "faEyeSlash":
      icon = faEyeSlash;
      break;

    case "faTrash":
      icon = faTrash;
      break;

    default:
      break;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "flex"
  }, /*#__PURE__*/React.createElement("div", {
    title: props.description,
    style: {
      paddingTop: props.isSection ? "0px" : "4px",
      paddingRight: "5px"
    },
    className: "flex justify-end items-center"
  }, /*#__PURE__*/React.createElement("div", {
    ref: ref,
    onMouseOver: props.onMouseOver,
    onMouseOut: props.onMouseOut,
    onClick: props.onClick,
    style: {
      width: "16px",
      height: "16px"
    },
    className: `${props.hover} transform hover:scale-110 text-gray-600 duration-500 bg-gray-200 rounded-lg flex cursor-pointer justify-center items-center`
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    style: {
      width: '10px',
      height: '10px'
    },
    icon: icon
  }))), props.openedMenu && props.menu);
});
export default OptionsButton;