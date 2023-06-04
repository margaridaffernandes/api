import React, { useContext } from "react";
import CombinedContext from "../../../contexts/CombinedContext";
import { handleCompositionPlanning } from "../../../assets/functions/handleCompositionPlanning/handleCompositionPlanning";

const FieldContainer = props => {
  const context = useContext(CombinedContext);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "0.35rem",
      marginTop: "0.35rem",
      paddingBottom: context.formMode === "design" && "1.05rem"
    },
    className: "w-full px-5 justify-start",
    onClick: e => handleCompositionPlanning(e, context, props.path, props.datatype)
  }, props.children);
};

export default FieldContainer;