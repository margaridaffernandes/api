import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import CombinedContext from "../../../../contexts/CombinedContext";
const DropList = /*#__PURE__*/React.forwardRef((props, ref) => {
  const context = useContext(CombinedContext);
  const dropListHeigth = {
    1: "h-8",
    2: "h-16",
    3: "h-24"
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      marginTop: "2.25rem"
    },
    className: `w-full absolute inset-y-0 z-10 cursor-pointer bg-white overflow-y-auto border border-gray-200 rounded-sm 
            ${dropListHeigth[props.list.length] ? dropListHeigth[props.list.length] : 'h-32'}`
  }, props.list.map((elemento, index) => {
    let isSelected = props.selected !== null && (props.id ? props.selected[props.id] === elemento[props.id] : props.selected === elemento);
    return /*#__PURE__*/React.createElement("div", {
      onClick: () => props.handleChange(elemento),
      key: index,
      style: {
        borderLeft: isSelected && "4px solid " + context.theme.themePalette.$200
      },
      className: `text-10 xxxl:text-xs duration-300 relative flex items-center text-gray-700 leading-tight h-8 px-4 hover:outline 
                                  ${isSelected ? 'hover:bg-gray-200' : 'hover:bg-gray-100'}`
    }, props.idText ? elemento[props.idText] !== undefined ? elemento[props.idText] : null : elemento !== undefined ? elemento : null, isSelected && /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-y-0 right-0 flex items-center pr-4",
      style: {
        color: context.theme.themePalette.$500
      }
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      size: "xs",
      icon: faCheck
    })));
  }));
});
export default DropList;