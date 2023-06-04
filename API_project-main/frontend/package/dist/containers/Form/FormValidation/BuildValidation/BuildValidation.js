import { buildBooleanValidation } from "../BuildBooleanValidation/BuildBooleanValidation";
import { buildCodedTextValidation } from "../BuildCodedTextValidation/BuildCodedTextValidation";
import { buildCountRangeValidation } from "../BuildCountRangeValidation/BuildCountRangeValidation";
import { buildCountValidation } from "../BuildCountValidation/BuildCountValidation";
import { buildDateRangeValidation } from "../BuildDateRangeValidation/BuildDateRangeValidation";
import { buildDateTimeRangeValidation } from "../BuildDateTimeRangeValidation/BuildDateTimeRangeValidation";
import { buildDateTimeValidation } from "../BuildDateTimeValidation/BuildDateTimeValidation";
import { buildDateValidation } from "../BuildDateValidation/BuildDateValidation";
import { buildDurationValidation } from "../BuildDurationValidation/BuildDurationValidation";
import { buildIdentifierValidation } from "../BuildIdentifierValidation/BuildIdentifierValidation";
import { buildMultimediaValidation } from "../BuildMultimediaValidation/BuildMultimediaValidation";
import { buildOrdinalValidation } from "../BuildOrdinalValidation/BuildOrdinalValidation";
import { buildQuantityRangeValidation } from "../BuildQuantityRangeValidation/BuildQuantityRangeValidation";
import { buildQuantityValidation } from "../BuildQuantityValidation/BuildQuantityValidation";
import { buildTextValidation } from "../BuildTextValidation/BuildTextValidation";
import { buildTimeRangeValidation } from "../BuildTimeRangeValidation/BuildTimeRangeValidation";
import { buildTimeValidation } from "../BuildTimeValidation/BuildTimeValidation";
import { buildProportionValidation } from "../BuildProportionValidation/BuildProportionValidation";

const buildValidationEditMode = (item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections, ruleMandatory, fileMaxSize) => {
  switch (item.dataType) {
    case "DV_TEXT":
      return buildTextValidation(item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections, ruleMandatory);

    case "DV_CODED_TEXT":
      return buildCodedTextValidation(item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections, ruleMandatory);

    case "DV_DURATION":
      return buildDurationValidation(item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections, ruleMandatory);

    case "DV_DATE_TIME":
      return buildDateTimeValidation(item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections, ruleMandatory);

    case "DV_QUANTITY":
      return buildQuantityValidation(item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections, ruleMandatory);

    case "DV_BOOLEAN":
      return buildBooleanValidation(item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections, ruleMandatory);

    case "DV_DATE":
      return buildDateValidation(item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections, ruleMandatory);

    case "DV_TIME":
      return buildTimeValidation(item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections, ruleMandatory);

    case "DV_COUNT":
      return buildCountValidation(item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections, ruleMandatory);

    case "DV_IDENTIFIER":
      return buildIdentifierValidation(item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections, ruleMandatory);

    case "DV_MULTIMEDIA":
      return buildMultimediaValidation(item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections, ruleMandatory, fileMaxSize);

    case "DV_ORDINAL":
      return buildOrdinalValidation(item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections, ruleMandatory);

    case "DV_INTERVAL<DV_DATE>":
      return buildDateRangeValidation(item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections, ruleMandatory);

    case "DV_INTERVAL<DV_COUNT>":
      return buildCountRangeValidation(item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections, ruleMandatory);

    case "DV_INTERVAL<DV_DATE_TIME>":
      return buildDateTimeRangeValidation(item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections, ruleMandatory);

    case "DV_INTERVAL<DV_TIME>":
      return buildTimeRangeValidation(item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections, ruleMandatory);

    case "DV_INTERVAL<DV_QUANTITY>":
      return buildQuantityRangeValidation(item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections, ruleMandatory);

    case "DV_PROPORTION":
      return buildProportionValidation(item, pathLabel, cardinalityObject, validationSchema, itemSection, sectionValidation, multipleSections, ruleMandatory);

    default:
      return;
  }
};

export { buildValidationEditMode };