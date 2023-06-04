import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCheck, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import tagColors from "../../../../assets/colors/TagColors";

const SearchBarWithTagFilter = props => {
  const [isTagListOpen, openTagList] = useState(false);
  const [activeColorIndex, setActiveColorIndex] = useState(null);
  const {
    value,
    searchValue,
    handleChangeSearch,
    tagList,
    handleSelectTag,
    selectedTag,
    handleRemoveFilters
  } = props;

  const onTagSelected = (e, i) => {
    handleSelectTag(e["type"]);
    setActiveColorIndex(i);
    openTagList(false);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "flex items-center cursor-pointer w-full text-10 xxl:text-11 xxxl:text-xs xxxxl:text-13 border border-gray-200 px-4 py-2 mb-2 rounded-full focus:outline-none focus:bg-gray-100 focus:border-gray-300"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => openTagList(!isTagListOpen),
    className: "flex items-center cursor-pointer text-gray-600 outline-none focus:outline-none pr-4 border-r border-gray-200 transition-all text-gray-300 hover:text-gray-600"
  }, selectedTag === "All" ? /*#__PURE__*/React.createElement("span", {
    className: "pr-2"
  }, "Todos") : /*#__PURE__*/React.createElement("div", {
    className: "h-3 w-3 rounded-full mr-2",
    style: {
      backgroundColor: activeColorIndex !== null ? tagColors[activeColorIndex].tagColor$100 : tagColors[tagList.findIndex(x => x.type === selectedTag)].tagColor$100
    }
  }), /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    size: "sm",
    icon: faCaretDown
  })), isTagListOpen && tagList.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "17.5rem"
    },
    className: "absolute z-20 h-56 text-9-5 xxl:text-xs text-gray-600 overflow-y-auto bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col"
  }, tagList.map((e, i) => {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      onClick: () => onTagSelected(e, i),
      className: `cursor-pointer ${i !== tagList.length - 1 && 'border-b'} border-gray-200`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center p-2 border-transparent border-l-4 hover:bg-gray-100",
      style: {
        borderColor: selectedTag === e["type"] && e["color"].tagColor$200
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "h-3 w-3 rounded-full mr-2",
      style: {
        backgroundColor: e["color"].tagColor$100
      }
    }), /*#__PURE__*/React.createElement("span", null, e["type"]), selectedTag === e["type"] && /*#__PURE__*/React.createElement("div", {
      className: "pr-2 ml-auto",
      style: {
        color: e["color"].tagColor$200
      }
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      size: "xs",
      icon: faCheck
    }))));
  })), /*#__PURE__*/React.createElement("div", {
    className: "pl-4 flex items-center"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    size: "sm",
    icon: faSearch
  }), /*#__PURE__*/React.createElement("input", {
    className: `pl-2 w-4/5 xxxl:w-full leading-tight focus:outline-none ${value !== null ? "text-gray-700 text-10 xxl:text-11 xxxl:text-11-5 xxxxl:text-xs" : searchValue !== "" ? "text-gray-700" : "text-gray-500"}`,
    onChange: e => handleChangeSearch(e.target.value),
    value: value !== null ? value.name : searchValue,
    placeholder: "Pesquisar..."
  })), (selectedTag !== "All" || value !== null || searchValue !== "") && /*#__PURE__*/React.createElement("button", {
    onClick: () => handleRemoveFilters(),
    className: "ml-auto cursor-pointer focus:outline-none outline-none transition-all duration-500 text-gray-400 hover:text-red-500"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faTimes
  })));
};

export default SearchBarWithTagFilter;