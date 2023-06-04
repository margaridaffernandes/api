import { convertToRaw } from "draft-js";
import ob from "object-path";
import { handleRules } from "../HandleRules/handleRules";

const handleSubmit = (template, values, formRM) => {
  let value;
  let jsonValues = {};
  let rmValues = {};

  for (value in values) {
    if (value.split("-").indexOf("value") !== -1) {
      const index = value.split("-").indexOf("value");
      const itemPath = value.split("-").slice(0, index);
      const isRM = itemPath[0] === "rm" ? true : false;
      let item;

      if (isRM) {
        let rmPath = [...itemPath].splice(1).join(".");
        formRM.forEach(el => {
          if (el.itemPath === rmPath) {
            item = el;
          }
        });
      } else {
        item = ob.get(template, itemPath);
      }

      const visible = handleRules(item, values, "visibility");
      let newValue;

      if (visible) {
        if (values[value] === "") {
          newValue = null;
        } else if (Array.isArray(values[value])) {
          if (values[value].length === 0) {
            newValue = null;
          } else if (values[value][0].textId !== undefined) {
            newValue = values[value].filter(obj => obj.value.getCurrentContent().hasText());

            if (newValue.length === 0) {
              newValue = null;
            } else {
              let array = [];
              array = newValue.map(obj => {
                return {
                  textId: obj.textId,
                  value: JSON.stringify(convertToRaw(obj.value.getCurrentContent()))
                };
              });
              newValue = array;
            }
          } else if (values[value][0].identifierId !== undefined) {
            newValue = values[value].filter(obj => obj.value !== "");

            if (newValue.length === 0) {
              newValue = null;
            } else {
              let array = [];
              array = newValue.map(obj => {
                return {
                  identifierId: obj.identifierId,
                  value: !isNaN(Number(obj.value)) ? Number(obj.value) : obj.value
                };
              });
              newValue = array;
            }
          } else {
            newValue = values[value];
          }
        } else if (values[value]._immutable !== undefined) {
          if (values[value].getCurrentContent().hasText()) {
            newValue = JSON.stringify(convertToRaw(values[value].getCurrentContent()));
          } else {
            newValue = null;
          }
        } else if (!isNaN(Number(values[value]))) {
          newValue = Number(values[value]);
        } else {
          newValue = values[value];
        }
      } else {
        newValue = null;
      }

      const label = isRM ? value.split("-").splice(1).join(".") : value.split("-").join(".");

      if (isRM) {
        rmValues[label] = newValue;
        jsonValues["rm"] = rmValues;
      } else {
        jsonValues[label] = newValue;
      }
    }
  }

  let sortedKeys = Object.keys(jsonValues).sort();
  const sortedJsonValues = {};
  sortedKeys.forEach(key => {
    sortedJsonValues[key] = jsonValues[key];
  });
  return sortedJsonValues;
};

export { handleSubmit };