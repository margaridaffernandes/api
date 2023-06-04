import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import CompositionPlanningPanel from "../CompositionPlanningPanel";
import CombinedContext from "../../../../../../contexts/CombinedContext";
import { getEnvUrl } from "../../../../../../environment";

const TaskSettingsPanel = props => {
  const context = useContext(CombinedContext);
  const [taskSelected, setTask] = useState(null);
  const [showDropTasks, setShowDropTasks] = useState(false);
  const [concepts, setConcepts] = useState(null);
  const [showDropConcepts, setShowDropConcepts] = useState(false);
  const {
    multipleConcept,
    onConceptChange
  } = props;

  const handleSetShowDropTasks = () => {
    setShowDropTasks(!showDropTasks);
  };

  const handleSelectTask = obj => {
    setTask(taskSelected !== null && taskSelected.id === obj.id ? null : obj);
    setConcepts(null);
    setShowDropTasks(false);
  };

  const handleClearTask = () => {
    setTask(null);
    setConcepts(null);
    onConceptChange([]);
    setShowDropTasks(false);
  };

  useEffect(() => {
    taskSelected !== null && axios({
      method: "get",
      url: `${getEnvUrl('aidarefsets', '4010')}/refsetConcepts?id=${taskSelected.id}`,
      // url: `http://172.21.220.49:4010/refsetConcepts?id=${taskSelected.id}`,
      headers: {
        Authorization: "Bearer " + context.token
      }
    }).then(response => {
      if (response.data.success === true) {
        setConcepts(response.data.concepts);
      } else {
        setConcepts([]);
      }
    }).catch(error => {
      setConcepts([]);
    });
  }, [taskSelected, context.token]);

  const handleSetShowDropConcepts = () => {
    setShowDropConcepts(!showDropConcepts);
  };

  const handleSelectMultipleConcepts = (event, value) => {
    event.stopPropagation();
    onConceptChange(multipleConcept.filter(x => x.idTask === value.idTask).length > 0 ? multipleConcept.filter(x => x.idTask !== value.idTask) : [...multipleConcept, value]);
    setShowDropConcepts(false);
  };

  const handleClearMultipleConcepts = () => {
    onConceptChange([]);
    setShowDropConcepts(false);
  };

  let taskList = context.composition.compositionPlanningTasks;
  let bodyData = [{
    value: multipleConcept,
    placeholder: "Selecione uma tarefa...",
    type: "multiple_dropdown",
    isDropSelected: showDropConcepts,
    dropList: concepts,
    dropListID: "idTask",
    dropListTextID: "task",
    handleOpenDrop: handleSetShowDropConcepts,
    handleSetValue: handleSelectMultipleConcepts,
    handleClearValue: handleClearMultipleConcepts
  }];
  return /*#__PURE__*/React.createElement(CompositionPlanningPanel, {
    jsonTitle: props.jsonTitle,
    itemsList: taskList,
    selectedItem: taskSelected,
    handleSelectItem: handleSelectTask,
    handleClearValue: handleClearTask,
    handleOpenDrop: handleSetShowDropTasks,
    showDropList: showDropTasks,
    hasSearchBar: false,
    concepts: concepts,
    dropListID: "id",
    dropListTextID: "name",
    bodyData: bodyData
  });
};

export default TaskSettingsPanel;