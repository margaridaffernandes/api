import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import CombinedContext from "../../../../contexts/CombinedContext";

const FilteredList = props => {
  const context = useContext(CombinedContext);
  const dropListHeigth = {
    1: "h-8",
    2: "h-16",
    3: "h-24"
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `w-full cursor-pointer bg-white overflow-y-auto ${dropListHeigth[props.list.length] ? dropListHeigth[props.list.length] + "  mb-2" : " mb-4"} 
            ${(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) < 760 ? 'max-h-48' : 'max-h-80'}`
  }, props.list.filter(e => props.filter !== undefined && props.filter !== "All" ? e["type"] === props.filter : e).filter(d => {
    return d.name.toLowerCase().includes(props.searchValue.toLowerCase());
  }).map((elemento, index) => {
    let val = props.tagColors !== undefined && props.tagColors.filter(el => el["type"] === elemento["type"])[0];
    return /*#__PURE__*/React.createElement("div", {
      onClick: () => props.handleChange(elemento),
      key: index,
      className: props.selected !== null && (props.id ? props.selected[props.id] === elemento[props.id] : props.selected === elemento) ? "text-xs duration-300 relative flex items-center border-b border-gray-200 bg-gray-100 text-gray-700 leading-tight h-8 px-1 hover:outline hover:bg-gray-300" : "text-xs duration-300 relative flex items-center border-b border-gray-200 text-gray-700 leading-tight h-8 px-1 hover:outline hover:bg-gray-100"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center text-9 xxl:text-10 xxxl:text-11 xxxxl:text-xs font-semibold xxxl:font-normal justify-center rounded-full w-4 h-4 xxxl:w-5 xxxl:h-5 mr-2",
      style: {
        backgroundColor: context.theme.themePalette.$100
      }
    }, props.badgePrefix), /*#__PURE__*/React.createElement("span", {
      className: "text-10 xxl:text-11 xxxl:text-xs xxxxl:text-13"
    }, props.idText ? elemento[props.idText] : elemento), props.tagColors !== undefined && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center text-9 xxl:text-10 xxxl:text-11 xxxxl:text-11-5 justify-center ml-2 rounded-lg px-2 font-bold",
      style: {
        backgroundColor: val !== undefined && val["color"].tagColor$100,
        color: val !== undefined && val["color"].tagColor$200
      }
    }, elemento["type"]), props.selected !== null && (props.id ? props.selected[props.id] === elemento[props.id] : props.selected === elemento) && /*#__PURE__*/React.createElement("div", {
      style: {
        color: val ? val["color"].tagColor$200 : context.theme.themePalette.$400
      },
      className: "absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      size: "xs",
      icon: faCheck
    })));
  }));
};

export default FilteredList;