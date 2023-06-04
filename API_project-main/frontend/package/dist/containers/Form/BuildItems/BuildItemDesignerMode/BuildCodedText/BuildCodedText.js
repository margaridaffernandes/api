import React from "react";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";
import Dropdown from "../../../../../components/FormDesigner/Datatypes/Dropdown/Dropdown";
import MultipleSelectSearch from "../../../../../components/FormDesigner/Datatypes/MultipleSelectSearch/MultipleSelectSearch";
import MultiSelect from "../../../../../components/FormDesigner/Datatypes/MultiSelect/MultiSelect";
import RadioBox from "../../../../../components/FormDesigner/Datatypes/RadioBox/RadioBox";
import RadioBoxMultiple from "../../../../../components/FormDesigner/Datatypes/RadioBoxMultiple/RadioBoxMultiple";
import SelectSearch from "../../../../../components/FormDesigner/Datatypes/SelectSearch/SelectSearch";
import { buildInitialValueEditMode } from "../../../FormInitialValues/BuildInitialValue/BuildInitialValue";

const buildCodedTextFormDesigner = (item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder, datatype) => {
  const isRM = pathArray[0] === "rm" ? true : false;
  const label = isRM ? item.itemName : item.node === null ? item.text : item.node.text;
  let array = [];
  array.push("value");
  const pathLabel = pathArray.concat(array).join("-");
  buildInitialValueEditMode(item, pathLabel, initialValues);
  let items;

  if (item.itemsList === undefined) {
    items = [];
  } else {
    items = item.itemsList;
  }

  if (item.terminology_id !== "external" && items.length > 0 && item.occurrences.upperOccurrences === 1) {
    if (datatype === "radio") {
      return /*#__PURE__*/React.createElement(RadioBox, {
        isRM: isRM,
        data: isRM && item,
        isSection: false,
        isAny: isAny,
        groupID: item.groupID,
        path: pathArray.join("."),
        handleFormOrder: handleFormOrder,
        order: formOrder ? formOrder[pathArray.join(".")] : null,
        item: item,
        key: itemIndex,
        showLabel: !isAny || (formOrder ? firstAnyItem(formOrder, pathArray, isAny) : itemIndex === 0),
        value: values[pathLabel],
        onRadioChange: setFieldValue,
        label: label,
        pathLabel: pathLabel,
        items: items,
        optional: item.occurrences.lowerOccurrences === 0,
        sectionOccurrence: itemSection[itemSection.length - 1],
        description: isRM ? item.description : item.node === null ? "" : item.node.description
      });
    } else {
      // default
      return /*#__PURE__*/React.createElement(Dropdown, {
        isRM: isRM,
        data: isRM && item,
        isSection: false,
        isAny: isAny,
        groupID: item.groupID,
        path: pathArray.join("."),
        handleFormOrder: handleFormOrder,
        order: formOrder ? formOrder[pathArray.join(".")] : null,
        item: item,
        key: itemIndex,
        showLabel: !isAny || (formOrder ? firstAnyItem(formOrder, pathArray, isAny) : itemIndex === 0),
        value: values[pathLabel],
        onDropdownChange: setFieldValue,
        label: label,
        pathLabel: pathLabel,
        items: items,
        optional: item.occurrences.lowerOccurrences === 0,
        sectionOccurrence: itemSection[itemSection.length - 1],
        description: isRM ? item.description : item.node === null ? "" : item.node.description
      });
    }
  } else if (item.terminology_id !== "external" && items.length > 0 && item.occurrences.upperOccurrences !== 1) {
    if (datatype === "radio") {
      return /*#__PURE__*/React.createElement(RadioBoxMultiple, {
        isRM: isRM,
        data: isRM && item,
        isSection: false,
        isAny: isAny,
        groupID: item.groupID,
        path: pathArray.join("."),
        handleFormOrder: handleFormOrder,
        order: formOrder ? formOrder[pathArray.join(".")] : null,
        item: item,
        key: itemIndex,
        showLabel: !isAny || (formOrder ? firstAnyItem(formOrder, pathArray, isAny) : itemIndex === 0),
        value: values[pathLabel],
        onRadioMultipleChange: setFieldValue,
        label: label,
        pathLabel: pathLabel,
        items: items,
        optional: item.occurrences.lowerOccurrences === 0,
        sectionOccurrence: itemSection[itemSection.length - 1],
        description: isRM ? item.description : item.node === null ? "" : item.node.description
      });
    } else {
      // default
      return /*#__PURE__*/React.createElement(MultiSelect, {
        isRM: isRM,
        data: isRM && item,
        isSection: false,
        isAny: isAny,
        groupID: item.groupID,
        path: pathArray.join("."),
        handleFormOrder: handleFormOrder,
        order: formOrder ? formOrder[pathArray.join(".")] : null,
        item: item,
        key: itemIndex,
        showLabel: !isAny || (formOrder ? firstAnyItem(formOrder, pathArray, isAny) : itemIndex === 0),
        value: values[pathLabel],
        onMultiselectChange: setFieldValue,
        label: label,
        pathLabel: pathLabel,
        items: items,
        optional: item.occurrences.lowerOccurrences === 0,
        sectionOccurrence: itemSection[itemSection.length - 1],
        description: isRM ? item.description : item.node === null ? "" : item.node.description
      });
    }
  } else if ((item.terminology_id === "external" || items.length === 0) && item.occurrences.upperOccurrences === 1) {
    return /*#__PURE__*/React.createElement(SelectSearch, {
      isRM: isRM,
      data: isRM && item,
      isSection: false,
      isAny: isAny,
      groupID: item.groupID,
      path: pathArray.join("."),
      handleFormOrder: handleFormOrder,
      order: formOrder ? formOrder[pathArray.join(".")] : null,
      item: item,
      key: itemIndex,
      showLabel: !isAny || (formOrder ? firstAnyItem(formOrder, pathArray, isAny) : itemIndex === 0),
      value: values[pathLabel],
      onSelectSearchChange: setFieldValue,
      label: label,
      pathLabel: pathLabel,
      internalFunctions: item.InternalFunctions,
      optional: item.occurrences.lowerOccurrences === 0,
      sectionOccurrence: itemSection[itemSection.length - 1],
      description: isRM ? item.description : item.node === null ? "" : item.node.description
    });
  } else if ((item.terminology_id === "external" || items.length === 0) && item.occurrences.upperOccurrences !== 1) {
    return /*#__PURE__*/React.createElement(MultipleSelectSearch, {
      isRM: isRM,
      data: isRM && item,
      isSection: false,
      groupID: item.groupID,
      path: pathArray.join("."),
      handleFormOrder: handleFormOrder,
      order: formOrder ? formOrder[pathArray.join(".")] : null,
      item: item,
      key: itemIndex,
      isAny: isAny,
      showLabel: !isAny || (formOrder ? firstAnyItem(formOrder, pathArray, isAny) : itemIndex === 0),
      value: values[pathLabel],
      onMultiSelectSearchChange: setFieldValue,
      label: label,
      pathLabel: pathLabel,
      internalFunctions: item.InternalFunctions,
      optional: item.occurrences.lowerOccurrences === 0,
      sectionOccurrence: itemSection[itemSection.length - 1],
      description: isRM ? item.description : item.node === null ? "" : item.node.description
    });
  }
};

export { buildCodedTextFormDesigner };