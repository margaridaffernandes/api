import { totalPoints } from "./totalPoints";
/*

Estrutura do data

data : {
    totalPoints: {
        total,
        newValue,
        oldValue
    }
}

 */

const processInternalFunctions = (functionName, data) => {
  let value;

  switch (functionName) {
    case "totalPoints":
      value = totalPoints(data.totalPoints.total, data.totalPoints.newValue, data.totalPoints.oldValue);
      break;

    default:
      value = null;
  }

  return value;
};

export { processInternalFunctions };