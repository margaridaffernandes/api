import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import ProviderCombinedContext from "../../../../contexts/ProviderCombinedContext";
import CombinedContext from "../../../../contexts/CombinedContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const SidePanel = props => {
  const context = useContext(CombinedContext);
  const [hover, setHover] = useState(false);
  const [sidePanelWidth, setSidePanelWidth] = useState(0);
  const [toolboxWidth, setToolboxWidth] = useState(0);
  const [buttonWidth, setButtonWidth] = useState(0);
  const divRef = useRef();
  useLayoutEffect(() => {
    if (props.isSidePanelOpen) {
      setSidePanelWidth(divRef.current.clientWidth);
    }

    setToolboxWidth(document.getElementById('toolbox').offsetWidth);
    setButtonWidth(document.getElementById('sideMenuButton').offsetWidth);
  }, [props.isSidePanelOpen]);
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, props.isSidePanelOpen && /*#__PURE__*/React.createElement("div", {
    ref: divRef,
    className: "flex flex-col bg-white text-gray-400 border-r",
    style: {
      width: '400px',
      minWidth: '250px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-4 border-b pb-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-left text-13-5 xl:text-14 xxl:text-15 xxxl:text-16 xxxxl:text-17 text-gray-600 leading-tight px-4"
  }, props.title)), /*#__PURE__*/React.createElement("div", {
    className: "flex"
  }, props.content), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row justify-end border-t border-gray-200 py-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: props.onCancelChanges,
    style: {
      height: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1390 ? "25px" : "30px",
      outline: 0
    },
    className: "px-2 mr-2 text-11 xl:text-xs xxl:text-13 xxxl:text-13-5 xxxxl:text-14 tracking-wide transform transition duration-500 text-gray-600"
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    onClick: props.onClosed,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      height: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1390 ? "25px" : "30px",
      outline: 0,
      backgroundColor: hover ? context.theme.themePalette.$500 : context.theme.themePalette.$400
    },
    className: "px-2 mr-4 text-11 xl:text-xs xxl:text-13 xxxl:text-13-5 xxxxl:text-14 text-white tracking-wide rounded-sm transform transition duration-500"
  }, "Confirmar"))), /*#__PURE__*/React.createElement("div", {
    id: "sideMenuButton",
    className: `absolute text-gray-600 rounded-full flex z-10 cursor-pointer justify-center items-center hover:scale-110 transform transition duration-500 ${props.isSidePanelOpen && 'rotate-180'}`,
    style: {
      width: "32px",
      height: "32px",
      bottom: "15%",
      left: props.isSidePanelOpen ? sidePanelWidth + toolboxWidth - buttonWidth / 2 + 3 + "px" : toolboxWidth - buttonWidth / 2 + 3 + "px",
      backgroundColor: context.theme.themePalette.$300
    },
    onClick: props.collapseSidePanel
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faAngleRight
  })));
};

export default SidePanel;