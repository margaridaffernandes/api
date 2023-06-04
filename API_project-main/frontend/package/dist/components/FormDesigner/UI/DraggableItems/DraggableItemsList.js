import React, { useContext } from 'react';
import DraggableItem from "./DraggableItem";
import CombinedContext from "../../../../contexts/CombinedContext";

const DraggableItemsList = props => {
  const context = useContext(CombinedContext);
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full py-1"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "flex flex-col"
  }, props.data.map((d, i) => /*#__PURE__*/React.createElement(DraggableItem, {
    key: i,
    data: d,
    isRM: true,
    handleRM: context.rmData.handleAddRM,
    path: d.itemPath,
    pathRM: props.path
  }))));
};

export default DraggableItemsList;