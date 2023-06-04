import React from "react";
import WysiwygTextEditor from "../../../../../components/FormDesigner/Datatypes/WysiwygTextEditor/WysiwygTextEditor";
import TextInput from "../../../../../components/FormDesigner/Datatypes/TextInput/TextInput";
import { buildInitialValueEditMode } from "../../../FormInitialValues/BuildInitialValue/BuildInitialValue";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";

const buildTextFormDesigner = (item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder, datatype // "editor" | "input" => default é o TextInput
) => {
  const isRM = pathArray[0] === "rm" ? true : false;
  const label = isRM ? item.itemName : item.node === null ? item.text : item.node.text;
  let array = [];
  array.push("value");
  const pathLabel = pathArray.concat(array).join("-");
  buildInitialValueEditMode(item, pathLabel, initialValues);

  if (datatype) {
    if (datatype === "editor") {
      return /*#__PURE__*/React.createElement(WysiwygTextEditor, {
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
        onTextChange: setFieldValue,
        label: label,
        pathLabel: pathLabel,
        optional: item.occurrences.lowerOccurrences === 0,
        sectionOccurrence: itemSection[itemSection.length - 1],
        description: isRM ? item.description : item.node === null ? "" : item.node.description
      });
    } else if (datatype === "textarea" || datatype === "input") {
      return /*#__PURE__*/React.createElement(TextInput, {
        isRM: isRM,
        data: isRM && item,
        inputType: datatype,
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
        onTextInputChange: setFieldValue,
        label: label,
        pathLabel: pathLabel,
        optional: item.occurrences.lowerOccurrences === 0,
        sectionOccurrence: itemSection[itemSection.length - 1],
        description: isRM ? item.description : item.node === null ? "" : item.node.description
      });
    }
  } else {
    // Por default é o textInput do tipo input
    return /*#__PURE__*/React.createElement(TextInput, {
      isRM: isRM,
      data: isRM && item,
      inputType: "input",
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
      onTextInputChange: setFieldValue,
      label: label,
      pathLabel: pathLabel,
      optional: item.occurrences.lowerOccurrences === 0,
      sectionOccurrence: itemSection[itemSection.length - 1],
      description: isRM ? item.description : item.node === null ? "" : item.node.description
    });
  }
};

export { buildTextFormDesigner };