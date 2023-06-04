import { buildBoolean } from "../BuildBoolean/BuildBoolean";
import { buildCodedText } from "../BuildCodedText/BuildCodedText";
import { buildCount } from "../BuildCount/BuildCount";
import { buildCountRange } from "../BuildCountRange/BuildCountRange";
import { buildDate } from "../BuildDate/BuildDate";
import { buildDateRange } from "../BuildDateRange/BuildDateRange";
import { buildDateTime } from "../BuildDateTime/BuildDateTime";
import { buildDateTimeRange } from "../BuildDateTimeRange/BuildDateTimeRange";
import { buildDuration } from "../BuildDuration/BuildDuration";
import { buildIdentifier } from "../BuildIdentifier/BuildIdentifier";
import { buildMultimedia } from "../BuildMultimedia/BuildMultimedia";
import { buildOrdinal } from "../BuildOrdinal/BuildOrdinal";
import { buildQuantity } from "../BuildQuantity/BuildQuantity";
import { buildQuantityRange } from "../BuildQuantityRange/BuildQuantityRange";
import { buildText } from "../BuildText/BuildText";
import { buildTime } from "../BuildTime/BuildTime";
import { buildTimeRange } from "../BuildTimeRange/BuildTimeRange";
import { buildProportion } from "../BuildProportion/BuildProportion";

const buildItemConsultMode = (datatype, item, itemIndex, isAny, professionalTasks, order, pathArray, idComposition) => {
  switch (datatype) {
    case "DV_TEXT":
      return buildText(item, itemIndex, isAny, professionalTasks, order, pathArray);

    case "DV_CODED_TEXT":
      return buildCodedText(item, itemIndex, isAny, professionalTasks, order, pathArray);

    case "DV_DURATION":
      return buildDuration(item, itemIndex, isAny, professionalTasks, order, pathArray);

    case "DV_DATE_TIME":
      return buildDateTime(item, itemIndex, isAny, professionalTasks, order, pathArray);

    case "DV_QUANTITY":
      return buildQuantity(item, itemIndex, isAny, professionalTasks, order, pathArray);

    case "DV_BOOLEAN":
      return buildBoolean(item, itemIndex, isAny, professionalTasks, order, pathArray);

    case "DV_DATE":
      return buildDate(item, itemIndex, isAny, professionalTasks, order, pathArray);

    case "DV_TIME":
      return buildTime(item, itemIndex, isAny, professionalTasks, order, pathArray);

    case "DV_COUNT":
      return buildCount(item, itemIndex, isAny, professionalTasks, order, pathArray);

    case "DV_IDENTIFIER":
      return buildIdentifier(item, itemIndex, isAny, professionalTasks, order, pathArray);

    case "DV_MULTIMEDIA":
      return buildMultimedia(item, itemIndex, isAny, professionalTasks, order, pathArray, idComposition);

    case "DV_ORDINAL":
      return buildOrdinal(item, itemIndex, isAny, professionalTasks, order, pathArray);

    case "DV_INTERVAL<DV_DATE>":
      return buildDateRange(item, itemIndex, isAny, professionalTasks, order, pathArray);

    case "DV_INTERVAL<DV_COUNT>":
      return buildCountRange(item, itemIndex, isAny, professionalTasks, order, pathArray);

    case "DV_INTERVAL<DV_DATE_TIME>":
      return buildDateTimeRange(item, itemIndex, isAny, professionalTasks, order, pathArray);

    case "DV_INTERVAL<DV_TIME>":
      return buildTimeRange(item, itemIndex, isAny, professionalTasks, order, pathArray);

    case "DV_INTERVAL<DV_QUANTITY>":
      return buildQuantityRange(item, itemIndex, isAny, professionalTasks, order, pathArray);

    case "DV_PROPORTION":
      return buildProportion(item, itemIndex, isAny, professionalTasks, order, pathArray);

    default:
      return;
  }
};

export { buildItemConsultMode };