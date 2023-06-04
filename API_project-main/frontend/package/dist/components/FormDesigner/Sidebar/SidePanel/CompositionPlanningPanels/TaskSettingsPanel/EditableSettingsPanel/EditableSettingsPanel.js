import ProviderCombinedContext from "../../../../../../../contexts/ProviderCombinedContext";
import SidePanel from "../../../SidePanel";
import React, { useContext, useState } from "react";
import CombinedContext from "../../../../../../../contexts/CombinedContext";
import TaskSettingsPanel from "../TaskSettingsPanel";
import { handleTasksComposition } from "../../../../../../../assets/functions/handleCompositionPlanning/handleTasksComposition";

const EditableSettingsPanel = props => {
  const context = useContext(CombinedContext);
  const [multipleConcept, setMultipleConcept] = useState([]);

  const handleCancelChanges = () => {
    props.onCancel();
  };

  const handleConfirmChanges = () => {
    const list = multipleConcept.map(x => x.task);
    multipleConcept.length > 0 && handleTasksComposition(context, "TaskEditable", list);
  };

  let content = context.composition.openCompositionPlanning && /*#__PURE__*/React.createElement(TaskSettingsPanel, {
    jsonTitle: "TaskEditable",
    multipleConcept: multipleConcept,
    onConceptChange: setMultipleConcept
  });
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(SidePanel, {
    title: "Configurar Edi\xE7\xE3o",
    content: content,
    isSidePanelOpen: props.isSidePanelOpen,
    collapseSidePanel: () => props.collapseSidePanel(),
    onCancelChanges: () => handleCancelChanges(),
    onClosed: () => handleConfirmChanges()
  }));
};

export default EditableSettingsPanel;