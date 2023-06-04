import React, { useState } from 'react';
import AccordionItem from "./AccordionItem";

const Accordion = props => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAccordionClick = i => {
    if (activeIndex === i) {
      return setActiveIndex(0);
    }

    setActiveIndex(i);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "w-full px-3 py-2"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "flex flex-col"
  }, props.accordionData.map((data, index) => /*#__PURE__*/React.createElement(AccordionItem, {
    key: index,
    data: data,
    onClick: () => handleAccordionClick(index),
    active: activeIndex === index
  }))));
};

export default Accordion;