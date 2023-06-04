import ProviderCombinedContext from "../../../../../../../contexts/ProviderCombinedContext";
import SidePanel from "../../../SidePanel";
import React, { useContext, useState } from "react";
import Tab from "../../../../../UI/Tab/Tab";
import CombinedContext from "../../../../../../../contexts/CombinedContext";
import { handleTasksComposition } from "../../../../../../../assets/functions/handleCompositionPlanning/handleTasksComposition";
import TaskSettingsPanel from "../TaskSettingsPanel";

const VisibilitySettingsPanel = props => {
  const context = useContext(CombinedContext);
  const [multipleConceptTaskVisible, setMultipleConceptTaskVisible] = useState([]);
  const [multipleConceptTaskInReport, setMultipleConceptTaskInReport] = useState([]);

  const handleCancelChanges = () => {
    props.onCancel();
  };

  const handleConfirmChanges = () => {
    const listTaskVisible = multipleConceptTaskVisible.map(x => x.task);
    const listTaskInReport = multipleConceptTaskInReport.map(x => x.task);
    multipleConceptTaskVisible.length > 0 && handleTasksComposition(context, "TaskVisible", listTaskVisible);
    multipleConceptTaskInReport.length > 0 && handleTasksComposition(context, "TaskInReport", listTaskInReport);
  };

  let tabContentTaskVisible = context.composition.openCompositionPlanning && /*#__PURE__*/React.createElement(TaskSettingsPanel, {
    jsonTitle: "TaskVisible",
    multipleConcept: multipleConceptTaskVisible,
    onConceptChange: setMultipleConceptTaskVisible
  });
  let tabContentTaskInReport = context.composition.openCompositionPlanning && /*#__PURE__*/React.createElement(TaskSettingsPanel, {
    jsonTitle: "TaskInReport",
    multipleConcept: multipleConceptTaskInReport,
    onConceptChange: setMultipleConceptTaskInReport
  });
  const tabData = [{
    title: 'Visível',
    content: tabContentTaskVisible
  }, {
    title: 'Visível na Impressão',
    content: tabContentTaskInReport
  }];
  const content = /*#__PURE__*/React.createElement(Tab, {
    tabData: tabData
  });
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(SidePanel, {
    title: "Configurar Visibilidade",
    content: content,
    isSidePanelOpen: props.isSidePanelOpen,
    collapseSidePanel: () => props.collapseSidePanel(),
    onCancelChanges: () => handleCancelChanges(),
    onClosed: () => handleConfirmChanges()
  }));
};

export default VisibilitySettingsPanel;