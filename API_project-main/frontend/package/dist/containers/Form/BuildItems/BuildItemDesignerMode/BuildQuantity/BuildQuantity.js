import React from "react";
import Quantity from "../../../../../components/FormDesigner/Datatypes/Quantity/Quantity";
import QuantitySingleUnit from "../../../../../components/FormDesigner/Datatypes/QuantitySingleUnit/QuantitySingleUnit";
import { buildInitialValueEditMode } from "../../../FormInitialValues/BuildInitialValue/BuildInitialValue";
import { firstAnyItem } from "../../../../../assets/functions/FirstAnyItem/FirstAnyItem";

const buildQuantityFormDesigner = (item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder) => {
  const isRM = pathArray[0] === "rm" ? true : false;
  const label = isRM ? item.itemName : item.node === null ? item.text : item.node.text;
  let arrayUnit = [];
  let arrayQuantity = [];
  arrayUnit.push("value", "unit");
  arrayQuantity.push("value", "value");
  const pathLabelUnit = pathArray.concat(arrayUnit).join("-");
  const pathLabelQuantity = pathArray.concat(arrayQuantity).join("-");
  buildInitialValueEditMode(item, pathLabelUnit, initialValues);
  buildInitialValueEditMode(item, pathLabelQuantity, initialValues);
  let unitsList = [];

  if (Array.isArray(item.units)) {
    item.units.forEach(obj => {
      unitsList.push(obj.unit);
    });
  } else {
    unitsList.push(item.units.unit);
  }

  if (unitsList.length > 1) {
    return /*#__PURE__*/React.createElement(Quantity, {
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
      valueUnit: values[pathLabelUnit],
      valueQuantity: values[pathLabelQuantity],
      onQuantityChange: setFieldValue,
      label: label,
      pathLabelUnit: pathLabelUnit,
      pathLabelQuantity: pathLabelQuantity,
      unitsList: unitsList,
      optional: item.occurrences.lowerOccurrences === 0,
      sectionOccurrence: itemSection[itemSection.length - 1],
      description: isRM ? item.description : item.node === null ? "" : item.node.description
    });
  } else {
    return /*#__PURE__*/React.createElement(QuantitySingleUnit, {
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
      valueQuantity: values[pathLabelQuantity],
      onQuantityChange: setFieldValue,
      label: label,
      pathLabelUnit: pathLabelUnit,
      pathLabelQuantity: pathLabelQuantity,
      unitsList: unitsList,
      optional: item.occurrences.lowerOccurrences === 0,
      sectionOccurrence: itemSection[itemSection.length - 1],
      description: isRM ? item.description : item.node === null ? "" : item.node.description
    });
  }
};

export { buildQuantityFormDesigner };