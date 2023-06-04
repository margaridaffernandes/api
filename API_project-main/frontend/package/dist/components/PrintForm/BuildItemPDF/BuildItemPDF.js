import { buildBoolean } from "./BuildBoolean";
import { buildCodedText } from "./BuildCodedText";
import { buildCount } from "./BuildCount";
import { buildDate } from "./BuildDate";
import { buildDateTime } from "./BuildDateTime";
import { buildDateTimeRange } from "./BuildDateTimeRange";
import { buildDuration } from "./BuildDuration";
import { buildIdentifier } from "./BuildIdentifier";
import { buildOrdinal } from "./BuildOrdinal";
import { buildQuantity } from "./BuildQuantity";
import { buildText } from "./BuildText";
import { buildTimeRange } from "./BuildTimeRange";
import { buildDateRange } from "./BuildDateRange";
import { buildCountRange } from "./BuildCountRange";
import { buildTime } from "./BuildTime";
import { buildQuantityRange } from "./BuildQuantityRange";
import { buildMultimedia } from "./BuildMultimedia";
import { buildProportion } from "./BuildProportion";

const buildItemPDF = (datatype, item, widths, isAny, showLabel) => {
  switch (datatype) {
    case "DV_TEXT":
      return buildText(item, widths, isAny, showLabel);

    case "DV_CODED_TEXT":
      return buildCodedText(item, widths, isAny, showLabel);

    case "DV_DURATION":
      return buildDuration(item, widths, isAny, showLabel);

    case "DV_DATE_TIME":
      return buildDateTime(item, widths, isAny, showLabel);

    case "DV_QUANTITY":
      return buildQuantity(item, widths, isAny, showLabel);

    case "DV_BOOLEAN":
      return buildBoolean(item, widths, isAny, showLabel);

    case "DV_DATE":
      return buildDate(item, widths, isAny, showLabel);

    case "DV_TIME":
      return buildTime(item, widths, isAny, showLabel);

    case "DV_COUNT":
      return buildCount(item, widths, isAny, showLabel);

    case "DV_IDENTIFIER":
      return buildIdentifier(item, widths, isAny, showLabel);

    case "DV_MULTIMEDIA":
      return buildMultimedia(item, widths, isAny, showLabel);

    case "DV_ORDINAL":
      return buildOrdinal(item, widths, isAny, showLabel);

    case "DV_INTERVAL<DV_DATE>":
      return buildDateRange(item, widths, isAny, showLabel);

    case "DV_INTERVAL<DV_COUNT>":
      return buildCountRange(item, widths, isAny, showLabel);

    case "DV_INTERVAL<DV_DATE_TIME>":
      return buildDateTimeRange(item, widths, isAny, showLabel);

    case "DV_INTERVAL<DV_TIME>":
      return buildTimeRange(item, widths, isAny, showLabel);

    case "DV_INTERVAL<DV_QUANTITY>":
      return buildQuantityRange(item, widths, isAny, showLabel);

    case "DV_PROPORTION":
      return buildProportion(item, widths, isAny, showLabel);

    default:
      return;
  }
};

export { buildItemPDF };