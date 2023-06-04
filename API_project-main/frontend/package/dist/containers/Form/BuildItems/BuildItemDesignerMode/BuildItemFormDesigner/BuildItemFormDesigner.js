import { buildIdentifierFormDesigner } from "../BuildIdentifier/BuildIdentifier";
import { buildBooleanFormDesigner } from "../BuildBoolean/BuildBoolean";
import { buildCountFormDesigner } from "../BuildCount/BuildCount";
import { buildCountRangeFormDesigner } from "../BuildCountRange/BuildCountRange";
import { buildDateFormDesigner } from "../BuildDate/BuildDate";
import { buildDateRangeFormDesigner } from "../BuildDateRange/BuildDateRange";
import { buildDateTimeFormDesigner } from "../BuildDateTime/BuildDateTime";
import { buildDateTimeRangeFormDesigner } from "../BuildDateTimeRange/BuildDateTimeRange";
import { buildCodedTextFormDesigner } from "../BuildCodedText/BuildCodedText";
import { buildDurationFormDesigner } from "../BuildDuration/BuildDuration";
import BuildMultimediaFormDesigner from "../BuildMultimedia/BuildMultimedia";
import { buildOrdinalFormDesigner } from "../BuildOrdinal/BuildOrdinal";
import { buildQuantityFormDesigner } from "../BuildQuantity/BuildQuantity";
import { buildQuantityRangeFormDesigner } from "../BuildQuantityRange/BuildQuantityRange";
import { buildTextFormDesigner } from "../BuildText/BuildText";
import { buildTimeFormDesigner } from "../BuildTime/BuildTime";
import { buildTimeRangeFormDesigner } from "../BuildTimeRange/BuildTimeRange";
import { buildProportionFormDesigner } from "../BuildProportion/BuildProportion";

const buildItemFormDesigner = (datatype, item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder, datatypeOption) => {
  switch (datatype) {
    case "DV_IDENTIFIER":
      return buildIdentifierFormDesigner(item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder);

    case "DV_BOOLEAN":
      return buildBooleanFormDesigner(item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder);

    case "DV_COUNT":
      return buildCountFormDesigner(item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder);

    case "DV_INTERVAL<DV_COUNT>":
      return buildCountRangeFormDesigner(item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder);

    case "DV_DATE":
      return buildDateFormDesigner(item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder);

    case "DV_INTERVAL<DV_DATE>":
      return buildDateRangeFormDesigner(item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder);

    case "DV_DATE_TIME":
      return buildDateTimeFormDesigner(item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder);

    case "DV_INTERVAL<DV_DATE_TIME>":
      return buildDateTimeRangeFormDesigner(item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder);

    case "DV_CODED_TEXT":
      return buildCodedTextFormDesigner(item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder, datatypeOption);

    case "DV_DURATION":
      return buildDurationFormDesigner(item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder);

    case "DV_MULTIMEDIA":
      return BuildMultimediaFormDesigner(item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder);

    case "DV_ORDINAL":
      return buildOrdinalFormDesigner(item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder);

    case "DV_QUANTITY":
      return buildQuantityFormDesigner(item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder);

    case "DV_INTERVAL<DV_QUANTITY>":
      return buildQuantityRangeFormDesigner(item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder);

    case "DV_TEXT":
      return buildTextFormDesigner(item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder, datatypeOption);

    case "DV_TIME":
      return buildTimeFormDesigner(item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder);

    case "DV_INTERVAL<DV_TIME>":
      return buildTimeRangeFormDesigner(item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder);

    case "DV_PROPORTION":
      return buildProportionFormDesigner(item, itemIndex, pathArray, setFieldValue, values, isAny, itemSection, initialValues, handleFormOrder, formOrder);

    default:
      return;
  }
};

export { buildItemFormDesigner };