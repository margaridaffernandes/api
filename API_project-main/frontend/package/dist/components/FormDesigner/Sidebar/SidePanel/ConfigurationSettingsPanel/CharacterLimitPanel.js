import React, { useContext } from "react";
import CombinedContext from "../../../../../contexts/CombinedContext";
import PrefixInput from "../../../../UI/Input/PrefixInput";

const CharacterLimitPanel = props => {
  const context = useContext(CombinedContext);

  const handleCharacterChange = e => {
    let max = e.target.value;

    if (max === "") {
      context.datatypes.removeField(context.composition.openCompositionPlanningPath, "limitCharacters");
    } else {
      context.datatypes.updateLimitCharacters(context.composition.openCompositionPlanningPath, max);
    }
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PrefixInput, {
    prefix: "N\xBA m\xE1ximo:",
    onChange: event => handleCharacterChange(event),
    value: context.datatypes.limitCharacters[context.composition.openCompositionPlanningPath] ? context.datatypes.limitCharacters[context.composition.openCompositionPlanningPath] : ""
  }));
};

export default CharacterLimitPanel;