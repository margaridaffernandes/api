import { buildBooleanInitialValue } from "../BuildBooleanInitialValue/BuildBooleanInitialValue";
import { buildCodedTextInitialValue } from "../BuildCodedTextInitialValue/BuildCodedTextInitialValue";
import { buildCountInitialValue } from "../BuildCountInitialValue/BuildCountInitialValue";
import { buildCountRangeInitialValue } from "../BuildCountRangeInitialValue/BuildCountRangeInitialValue";
import { buildDateInitialValue } from "../BuildDateInitialValue/BuildDateInitialValue";
import { buildDateRangeInitialValue } from "../BuildDateRangeInitialValue/BuildDateRangeInitialValue";
import { buildDateTimeInitialValue } from "../BuildDateTimeInitialValue/BuildDateTimeInitialValue";
import { buildDateTimeRangeInitialValue } from "../BuildDateTimeRangeInitialValue/BuildDateTimeRangeInitialValue";
import { buildDurationInitialValue } from "../BuildDurationInitialValue/BuildDurationInitialValue";
import { buildIdentifierInitialValue } from "../BuildIdentifierInitialValue/BuildIdentifierInitialValue";
import { buildMultimediaInitialValue } from "../BuildMultimediaInitialValue/BuildMultimediaInitialValue";
import { buildOrdinalInitialValue } from "../BuildOrdinalInitialValue/BuildOrdinalInitialValue";
import { buildQuantityInitialValue } from "../BuildQuantityInitialValue/BuildQuantityInitialValue";
import { buildQuantityRangeInitialValue } from "../BuildQuantityRangeInitialValue/BuildQuantityRangeInitialValue";
import { buildTextInitialValue } from "../BuildTextInitialValue/BuildTextInitialValue";
import { buildTimeInitialValue } from "../BuildTimeInitialValue/BuildTimeInitialValue";
import { buildTimeRangeInitialValue } from "../BuildTimeRangeInitialValue/BuildTimeRangeInitialValue";
import { buildProportionInitialValue } from "../BuildProportionInitialValue/BuildProportionInitialValue";

const buildInitialValueEditMode = (item, pathLabel, initialValues) => {
  switch (item.dataType) {
    case "DV_TEXT":
      return buildTextInitialValue(item, pathLabel, initialValues);

    case "DV_CODED_TEXT":
      return buildCodedTextInitialValue(item, pathLabel, initialValues);

    case "DV_DURATION":
      return buildDurationInitialValue(item, pathLabel, initialValues);

    case "DV_DATE_TIME":
      return buildDateTimeInitialValue(item, pathLabel, initialValues);

    case "DV_QUANTITY":
      return buildQuantityInitialValue(item, pathLabel, initialValues);

    case "DV_BOOLEAN":
      return buildBooleanInitialValue(item, pathLabel, initialValues);

    case "DV_DATE":
      return buildDateInitialValue(item, pathLabel, initialValues);

    case "DV_TIME":
      return buildTimeInitialValue(item, pathLabel, initialValues);

    case "DV_COUNT":
      return buildCountInitialValue(item, pathLabel, initialValues);

    case "DV_IDENTIFIER":
      return buildIdentifierInitialValue(item, pathLabel, initialValues);

    case "DV_MULTIMEDIA":
      return buildMultimediaInitialValue(item, pathLabel, initialValues);

    case "DV_ORDINAL":
      return buildOrdinalInitialValue(item, pathLabel, initialValues);

    case "DV_INTERVAL<DV_DATE>":
      return buildDateRangeInitialValue(item, pathLabel, initialValues);

    case "DV_INTERVAL<DV_COUNT>":
      return buildCountRangeInitialValue(item, pathLabel, initialValues);

    case "DV_INTERVAL<DV_DATE_TIME>":
      return buildDateTimeRangeInitialValue(item, pathLabel, initialValues);

    case "DV_INTERVAL<DV_TIME>":
      return buildTimeRangeInitialValue(item, pathLabel, initialValues);

    case "DV_INTERVAL<DV_QUANTITY>":
      return buildQuantityRangeInitialValue(item, pathLabel, initialValues);

    case "DV_PROPORTION":
      return buildProportionInitialValue(item, pathLabel, initialValues);

    default:
      return;
  }
};

export { buildInitialValueEditMode };