import BuildCountEditMode from "../BuildCount/BuildCount";
import BuildCountRangeEditMode from "../BuildCountRange/BuildCountRange";
import BuildDateRangeEditMode from "../BuildDateRange/BuildDateRange";
import BuildDateTimeEditMode from "../BuildDateTime/BuildDateTime";
import BuildDateTimeRangeEditMode from "../BuildDateTimeRange/BuildDateTimeRange";
import BuildDurationEditMode from "../BuildDuration/BuildDuration";
import BuildIdentifierEditMode from "../BuildIdentifier/BuildIdentifier";
import BuildMultimediaEditMode from "../BuildMultimedia/BuildMultimedia";
import BuildOrdinalEditMode from "../BuildOrdinal/BuildOrdinal";
import BuildQuantityEditMode from "../BuildQuantity/BuildQuantity";
import BuildQuantityRangeEditMode from "../BuildQuantityRange/BuildQuantityRange";
import BuildTimeEditMode from "../BuildTime/BuildTime";
import BuildTimeRangeEditMode from "../BuildTimeRange/BuildTimeRange";
import BuildProportionEditMode from "../BuildProportion/BuildProportion";
import BuildBooleanEditMode from "../BuildBoolean/BuildBoolean";
import BuildDateEditMode from "../BuildDate/BuildDate";
import BuildTextEditMode from "../BuildText/BuildText";
import BuildCodedTextEditMode from "../BuildCodedText/BuildCodedText";

const buildItemEditMode = (datatype, item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order, datatypeOption, templateRules, idJDT, idComposition, userInfo) => {
  switch (datatype) {
    case "DV_TEXT":
      return BuildTextEditMode(item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order, datatypeOption, templateRules, idJDT);

    case "DV_CODED_TEXT":
      return BuildCodedTextEditMode(item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order, datatypeOption, templateRules, idJDT);

    case "DV_DURATION":
      return BuildDurationEditMode(item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order, templateRules, idJDT);

    case "DV_DATE_TIME":
      return BuildDateTimeEditMode(item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order, templateRules, idJDT);

    case "DV_QUANTITY":
      return BuildQuantityEditMode(item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order, templateRules, idJDT);

    case "DV_BOOLEAN":
      return BuildBooleanEditMode(item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order, templateRules, idJDT);

    case "DV_DATE":
      return BuildDateEditMode(item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order, templateRules, idJDT);

    case "DV_TIME":
      return BuildTimeEditMode(item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order, templateRules, idJDT);

    case "DV_COUNT":
      return BuildCountEditMode(item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order, templateRules, idJDT);

    case "DV_IDENTIFIER":
      return BuildIdentifierEditMode(item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order, templateRules, idJDT);

    case "DV_MULTIMEDIA":
      return BuildMultimediaEditMode(item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order, templateRules, idJDT, idComposition, userInfo);

    case "DV_ORDINAL":
      return BuildOrdinalEditMode(item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order, templateRules, idJDT);

    case "DV_INTERVAL<DV_DATE>":
      return BuildDateRangeEditMode(item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order, templateRules, idJDT);

    case "DV_INTERVAL<DV_COUNT>":
      return BuildCountRangeEditMode(item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order, templateRules, idJDT);

    case "DV_INTERVAL<DV_DATE_TIME>":
      return BuildDateTimeRangeEditMode(item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order, templateRules, idJDT);

    case "DV_INTERVAL<DV_TIME>":
      return BuildTimeRangeEditMode(item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order, templateRules, idJDT);

    case "DV_INTERVAL<DV_QUANTITY>":
      return BuildQuantityRangeEditMode(item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order, templateRules, idJDT);

    case "DV_PROPORTION":
      return BuildProportionEditMode(item, itemIndex, pathArray, setFieldValue, values, errors, touched, setFieldTouched, isAny, cardinalityObject, sectionValidation, initialValues, validationSchema, itemSection, multipleSections, professionalTasks, order, templateRules, idJDT);

    default:
      return;
  }
};

export { buildItemEditMode };