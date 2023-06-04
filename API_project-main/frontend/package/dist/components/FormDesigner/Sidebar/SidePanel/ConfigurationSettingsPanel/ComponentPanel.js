import { ComboboxIcon, RadioButtonIcon, TextAreaIcon, TextEditorIcon, TextInputIcon } from "../../../../../assets/icons/svg_icons";
import React, { useContext } from "react";
import CombinedContext from "../../../../../contexts/CombinedContext";
import IconButton from "../../../UI/Button/IconButton";

const ComponentPanel = props => {
  const context = useContext(CombinedContext);

  const handleDatatype = type => {
    // Se escolher um DV_TEXT do tipo input, é necessário retirar a altura caso existir => porque a altura é definida
    if (context.composition.openCompositionPlanningDatatype === "DV_TEXT" && type === "input") {
      context.datatypes.removeField(context.composition.openCompositionPlanningPath, "textHeight");
      context.datatypes.removeField(context.composition.openCompositionPlanningPath, "limitCharacters");
      context.datatypes.updateDatatypes(context.composition.openCompositionPlanningPath, type);
    } else {
      context.datatypes.updateDatatypes(context.composition.openCompositionPlanningPath, type);
    }
  };

  let options;

  if (context.composition.openCompositionPlanningDatatype === "DV_TEXT") {
    options = {
      input: {
        isDefault: true,
        description: "Input simples",
        icon: /*#__PURE__*/React.createElement(TextInputIcon, null)
      },
      textarea: {
        description: "Área de texto",
        icon: /*#__PURE__*/React.createElement(TextAreaIcon, null)
      },
      editor: {
        description: "Editor de texto",
        icon: /*#__PURE__*/React.createElement(TextEditorIcon, null)
      } // editor: {
      //     description: "Editor de texto",
      //     icon: <TextEditorIcon2/>
      // }

    };
  } else {
    options = {
      combo: {
        isDefault: true,
        description: "Combo box",
        icon: /*#__PURE__*/React.createElement(ComboboxIcon, null)
      },
      radio: {
        description: "Radio box",
        icon: /*#__PURE__*/React.createElement(RadioButtonIcon, null)
      }
    };
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid gap-1 grid-cols-1 sm:grid-cols-2"
  }, Object.keys(options).map((option, index) => /*#__PURE__*/React.createElement(IconButton, {
    key: index,
    dimension: "33",
    icon: options[option].icon,
    selected: context.datatypes.datatypes[context.composition.openCompositionPlanningPath] === undefined ? options[option].isDefault ? true : context.datatypes.datatypes[context.composition.openCompositionPlanningPath] === option : context.datatypes.datatypes[context.composition.openCompositionPlanningPath] === option,
    handleClick: () => handleDatatype(option),
    description: options[option].description
  }))));
};

export default ComponentPanel;