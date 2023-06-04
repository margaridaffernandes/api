import objectPath from "object-path";
import { maxValueArray } from "../Maximum/maxValueArray";
import { buildDLMRules } from "../HandleDLM/buildDLMRules";
let itemOrder;
let newTemplate;
let order = {};
let groupIDs = [];
let compositionPlanning = {};

const buildDLM = dlm => {
  let templateRules = [];
  dlm.rules !== undefined && dlm.rules.forEach(rule => {
    let rules = [];
    let inputs = [];
    let events = [];
    rule.conditions.all.forEach(condition => {
      inputs.push(condition.fact);
    });
    rule.event.params.message.forEach(e => {
      events.push(e.item);
    });
    rules.push({
      inputVariables: inputs,
      ruleID: rule.uid,
      eventFact: events
    });
    templateRules.push(rules);
  });
  return templateRules;
};

const buildSection = (item, pathArray, groupID, dlm) => {
  const nextGroupID = groupID + 1;
  let newGroupID;

  if (groupIDs.indexOf(nextGroupID) > -1) {
    newGroupID = maxValueArray(groupIDs) + 1;
    groupIDs.push(newGroupID);
  } else {
    newGroupID = nextGroupID;
    groupIDs.push(newGroupID);
  }

  item.items.map((subItem, subItemIndex) => {
    let array = [];
    array.push("items", subItemIndex);
    return buildItem(subItem, pathArray.concat(array), newGroupID, dlm);
  });
};

const buildItem = (item, pathArray, groupID, dlm) => {
  if (item.data_type === "Title") {
    const path = pathArray.join(".");
    const dlmRules = buildDLMRules(path, buildDLM(dlm)); //SET TEMPLATE RULES

    objectPath.set(newTemplate, "templateRules", buildDLM(dlm)); // SET DLM RULES

    objectPath.set(newTemplate, path + ".dlmRules", dlmRules); // SET GROUPID

    objectPath.set(newTemplate, path + ".groupID", groupID); // SET ORDER

    itemOrder += 1;
    order[path] = itemOrder; // SET COMPOSITION PLANNING

    compositionPlanning[path] = {
      itemName: item.node ? item.node.text : "",
      itemPath: path,
      TaskVisible: item.TaskVisible ? item.TaskVisible : [],
      TaskEditable: item.TaskEditable ? item.TaskEditable : [],
      TaskInReport: item.TaskInReport ? item.TaskInReport : [],
      InternalFunctions: item.InternalFunctions ? item.InternalFunctions : [],
      Functions: item.Functions ? item.Functions : [],
      Refset: item.Refset ? item.Refset : [],
      ruleMandatory: item.ruleMandatory ? item.ruleMandatory : [],
      ruleVisibility: item.ruleVisibility ? item.ruleVisibility : [],
      terminology: item.terminology_id
    };
    return buildSection(item, pathArray, groupID, dlm);
  } else {
    if (Array.isArray(item)) {
      item.forEach((itemAny, itemAnyIndex) => {
        let array = [];
        array.push(itemAnyIndex);
        const newPath = pathArray.concat(array);
        const path = newPath.join(".");
        const dlmRules = buildDLMRules(path, buildDLM(dlm)); // SET DLM RULES

        objectPath.set(newTemplate, path + ".dlmRules", dlmRules); // SET GROUPID

        objectPath.set(newTemplate, path + ".groupID", groupID); // SET ORDER

        itemOrder += 1;
        order[path] = itemOrder; // SET COMPOSITION PLANNING

        compositionPlanning[path] = {
          itemName: itemAny.node ? itemAny.node.text : "",
          itemPath: path,
          TaskVisible: itemAny.TaskVisible ? itemAny.TaskVisible : [],
          TaskEditable: itemAny.TaskEditable ? itemAny.TaskEditable : [],
          TaskInReport: itemAny.TaskInReport ? itemAny.TaskInReport : [],
          InternalFunctions: itemAny.InternalFunctions ? itemAny.InternalFunctions : [],
          Functions: itemAny.Functions ? itemAny.Functions : [],
          Refset: itemAny.Refset ? itemAny.Refset : [],
          ruleMandatory: itemAny.ruleMandatory ? itemAny.ruleMandatory : [],
          ruleVisibility: itemAny.ruleVisibility ? itemAny.ruleVisibility : [],
          terminology: item.terminology_id
        };
      });
    } else {
      const path = pathArray.join(".");
      const dlmRules = buildDLMRules(path, buildDLM(dlm)); // SET DLM RULES

      objectPath.set(newTemplate, path + ".dlmRules", dlmRules); // SET GROUPID

      objectPath.set(newTemplate, path + ".groupID", groupID); // SET ORDER

      itemOrder += 1;
      order[path] = itemOrder; // SET COMPOSITION PLANNING

      compositionPlanning[path] = {
        itemName: item.node ? item.node.text : "",
        itemPath: path,
        TaskVisible: item.TaskVisible ? item.TaskVisible : [],
        TaskEditable: item.TaskEditable ? item.TaskEditable : [],
        TaskInReport: item.TaskInReport ? item.TaskInReport : [],
        InternalFunctions: item.InternalFunctions ? item.InternalFunctions : [],
        Functions: item.Functions ? item.Functions : [],
        Refset: item.Refset ? item.Refset : [],
        ruleMandatory: item.ruleMandatory ? item.ruleMandatory : [],
        ruleVisibility: item.ruleVisibility ? item.ruleVisibility : [],
        terminology: item.terminology_id
      };
    }
  }
};

const buildJDTRules = async (template, dlm) => {
  newTemplate = template;
  itemOrder = 0;
  order = {};
  compositionPlanning = {};
  groupIDs = []; // SET COMPOSITION PLANNING

  compositionPlanning["root"] = {
    itemName: newTemplate.node ? newTemplate.node.text : "",
    itemPath: "",
    TaskVisible: newTemplate.TaskVisible ? newTemplate.TaskVisible : [],
    TaskEditable: newTemplate.TaskEditable ? newTemplate.TaskEditable : [],
    TaskInReport: newTemplate.TaskInReport ? newTemplate.TaskInReport : [],
    InternalFunctions: newTemplate.InternalFunctions ? newTemplate.InternalFunctions : [],
    Functions: newTemplate.Functions ? newTemplate.Functions : [],
    Refset: newTemplate.Refset ? newTemplate.Refset : [],
    ruleMandatory: newTemplate.ruleMandatory ? newTemplate.ruleMandatory : [],
    ruleVisibility: newTemplate.ruleVisibility ? newTemplate.ruleVisibility : [],
    terminology: newTemplate.terminology_id ? newTemplate.terminology_id : ""
  };
  newTemplate.items.map((attribute, index) => {
    return attribute.map((att, attIndex) => {
      const groupID = 1;
      groupIDs.push(groupID);
      let array = [];
      array.push("items", index, attIndex);
      return buildItem(att, array, groupID, dlm);
    });
  });
  return [newTemplate, order, compositionPlanning];
};

export { buildJDTRules };