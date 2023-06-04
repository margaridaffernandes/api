import React, { useContext, useState } from 'react';
import CombinedContext from "../../../../contexts/CombinedContext";

const Tab = props => {
  const context = useContext(CombinedContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const tabSize = '0 0 ' + 100 / props.tabData.length + "%";
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "flex justify-between"
  }, props.tabData.map((data, index) =>
  /*#__PURE__*/
  // tab title
  React.createElement("li", {
    key: index,
    onClick: () => setActiveIndex(index),
    style: {
      flex: tabSize,
      borderBottom: activeIndex === index ? '4px solid ' + context.theme.themePalette.$200 : '4px solid #f4f4f4'
    },
    className: `flex items-center text-xs xxl:text-13 xxxl:text-13-5 xxxxl:text-14 xxxxxl:text-15-5 justify-center py-2 xxl:px-2 xxxxl:px-3 xxxxxl:px-4 cursor-pointer text-gray-500 ${activeIndex === index && 'font-semibold text-gray-700'}`
  }, data.title))), props.tabData.map((data, index) => activeIndex === index && /*#__PURE__*/React.createElement("div", {
    key: index
  }, data.content)));
};

export default Tab;