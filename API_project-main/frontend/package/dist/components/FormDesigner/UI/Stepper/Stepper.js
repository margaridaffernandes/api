import React, { useContext } from "react";
import CombinedContext from "../../../../contexts/CombinedContext";

const Stepper = props => {
  const context = useContext(CombinedContext);
  const {
    size,
    handleChange
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center h-7 xxl:h-8 rounded-lg bg-gray-100 border border-gray-300"
  }, /*#__PURE__*/React.createElement("button", {
    id: "stepperButton",
    style: {
      borderBottomLeftRadius: "0.5rem",
      borderTopLeftRadius: "0.5rem",
      color: context.theme.themePalette.$500
    },
    className: "h-full w-5 xxl:w-6 xxxl:w-7 text-15 xxl:text-18 focus:outline-none cursor-pointer",
    onClick: () => handleChange("decrement")
  }, "-"), /*#__PURE__*/React.createElement("div", {
    style: {
      letterSpacing: "-1px"
    },
    className: "bg-white px-4 text-11 xxl:text-xs w-27px xxl:w-35px flex items-center justify-center h-full cursor-default"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-700"
  }, size), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500 pl-1"
  }, "px")), /*#__PURE__*/React.createElement("button", {
    id: "stepperButton",
    style: {
      borderBottomRightRadius: "0.5rem",
      borderTopRightRadius: "0.5rem",
      color: context.theme.themePalette.$500
    },
    className: "h-full w-5 xxl:w-6 xxxl:w-7 text-15 xxl:text-18 focus:outline-none cursor-pointer",
    onClick: () => handleChange("increment")
  }, "+"));
};

export default Stepper;