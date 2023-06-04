import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const SearchBar = props => {
  const {
    searchValue,
    value,
    handleChangeSearch,
    handleRemoveFilters
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    className: "flex items-center cursor-pointer w-full text-10 xxl:text-11 xxxl:text-xs xxxxl:text-13 border border-gray-200 px-4 py-2 mb-2 rounded-full focus:outline-none focus:bg-gray-100 focus:border-gray-300"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center w-full"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    size: "sm",
    icon: faSearch
  }), /*#__PURE__*/React.createElement("input", {
    className: `pl-2 w-full leading-tight focus:outline-none ${value !== null ? "text-gray-700 text-10 xxl:text-11 xxxl:text-11-5 xxxxl:text-xs" : searchValue !== "" ? "text-gray-700" : "text-gray-500"}`,
    onChange: e => handleChangeSearch(e.target.value),
    value: value !== null ? value.name : searchValue,
    placeholder: "Pesquisar..."
  })), (value !== null || searchValue !== "") && /*#__PURE__*/React.createElement("button", {
    onClick: () => handleRemoveFilters(),
    className: "ml-auto cursor-pointer focus:outline-none outline-none transition-all duration-500 text-gray-400 hover:text-red-500 pr-2"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faTimes
  })));
};

export default SearchBar;