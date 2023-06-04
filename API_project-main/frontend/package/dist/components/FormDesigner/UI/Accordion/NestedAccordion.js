import React, { useState } from 'react';
import AccordionItem from "./AccordionItem";

const NestedAccordion = props => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = i => {
    if (activeIndex === i) {
      return setActiveIndex(null);
    }

    setActiveIndex(i);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "w-full p-4"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "flex flex-col"
  }, props.accordionData.map((data, index) => /*#__PURE__*/React.createElement(AccordionItem, {
    key: index,
    data: data,
    onClick: () => handleAccordionClick(index),
    active: activeIndex === index
  }))));
};

export default NestedAccordion;