// import CurrentInternalFunctions from "../CurrentValues/CurrentInternalFunctions";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
// import React from "react";
//
// const handleRemoveItemIF = (type, item) => {
//     let value = [];
//     if (type === "Preenchimento automático de campos") {
//         let currentValue = context.composition.compositionPlanning[context.composition.openCompositionPlanningPath]["InternalFunctions"].filter((obj) => obj.type === type)[0];
//
//         let newDependentFields = Object.keys(currentValue.affectedFields)
//             .filter((x) => x !== item.path)
//             .map((y) => {
//                 return currentValue.affectedFields[y];
//             });
//
//         if (newDependentFields.length > 0) {
//             let newObj = {};
//             newDependentFields.forEach((y) => {
//                 newObj[y.path] = {
//                     ...y,
//                 };
//             });
//             currentValue.affectedFields = {...newObj};
//
//             value = [...context.composition.compositionPlanning[context.composition.openCompositionPlanningPath]["InternalFunctions"].filter((obj) => obj.type !== type),
//                 currentValue];
//         } else {
//             value = [...context.composition.compositionPlanning[context.composition.openCompositionPlanningPath]["InternalFunctions"].filter((obj) => obj.type !== type)];
//         }
//     }
//     context.composition.handleCompositionPlanning(context.composition.openCompositionPlanningPath, "InternalFunctions", value);
// };