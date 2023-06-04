import axios from "axios";
import { ContentState, EditorState } from "draft-js";

const buildNewProps = async (field, body, values) => {
  let props = {};
  Object.keys(body.props[0]).forEach(prop => {
    try {
      const data = field.dependencies.filter(obj => obj.field.path === body.props[0][prop])[0]; // Ver cosoante o datatype e o occurrences => ACRESCENTAR O RESTO

      if (data.field.datatype === "DV_CODED_TEXT" && data.field.upperOccurrences === 1) {
        const path = body.props[0][prop].split(".").join("-");
        props[prop] = values[`${path}-value`].code !== null && values[`${path}-value`].code !== undefined ? values[`${path}-value`].code : "";
      } else if (data.field.datatype === "DV_IDENTIFIER" && data.field.upperOccurrences === 1) {
        const path = body.props[0][prop].split(".").join("-");
        props[prop] = values[`${path}-value`] !== null && values[`${path}-value`] !== undefined ? values[`${path}-value`] : "";
      }
    } catch (e) {
      props[prop] = "";
    }
  });
  const newBody = { ...body,
    props: [props]
  };
  return newBody;
};

const setValue = (field, val, setField, contextFields) => {
  try {
    // Ver cosoante o datatype e o occurrences => ACRESCENTAR O RESTO
    if (field.datatype === "DV_IDENTIFIER" && field.upperOccurrences === 1) {
      const path = `${field.path.split(".").join("-")}-value`;

      if (val[field.resColumn] !== null) {
        const value = val[field.resColumn];
        setField(path, value);
        contextFields.updateValue(path);
      } else {
        setField(path, "");
        contextFields.updateValue(path);
      }
    } else if (field.datatype === "DV_TEXT" && field.upperOccurrences === 1) {
      const path = `${field.path.split(".").join("-")}-value`;

      if (val[field.resColumn] !== null) {
        const value = EditorState.createWithContent(ContentState.createFromText(val[field.resColumn].toString()));
        setField(path, value);
        contextFields.updateValue(path);
      } else {
        const value = EditorState.createEmpty();
        setField(path, value);
        contextFields.updateValue(path);
      }
    } else if (field.datatype === "DV_CODED_TEXT" && field.upperOccurrences === 1) {
      const path = `${field.path.split(".").join("-")}-value`;

      if (val[field.codeColumn] !== null && val[field.textColumn] !== null) {
        const value = {
          code: val[field.codeColumn],
          text: val[field.textColumn]
        };
        setField(path, value);
        contextFields.updateValue(path);
      } else {
        setField(path, "");
        contextFields.updateValue(path);
      }
    }
  } catch (e) {
    if (field.datatype === "DV_IDENTIFIER" && field.upperOccurrences === 1) {
      const path = `${field.path.split(".").join("-")}-value`;
      setField(path, "");
      contextFields.updateValue(path);
    } else if (field.datatype === "DV_TEXT" && field.upperOccurrences === 1) {
      const path = `${field.path.split(".").join("-")}-value`;
      const value = EditorState.createEmpty();
      setField(path, value);
      contextFields.updateValue(path);
    } else if (field.datatype === "DV_CODED_TEXT" && field.upperOccurrences === 1) {
      const path = `${field.path.split(".").join("-")}-value`;
      setField(path, "");
      contextFields.updateValue(path);
    }
  }
};

const handleInternalFunctions = async (functions, setField, token, values, contextFields) => {
  functions.forEach(obj => {
    if (obj.type === "Preenchimento automático de campos") {
      // Vamos fazer o setField de cada campo afetado
      Object.keys(obj.affectedFields).forEach(async path => {
        let body = obj.affectedFields[path].body;
        let newBody = await buildNewProps(obj.affectedFields[path], body, values);
        await axios({
          method: obj.affectedFields[path].method,
          url: `${obj.affectedFields[path].url}${obj.affectedFields[path].serviceName}`,
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: newBody
        }).then(async response => {
          if (response.data.success === true && Array.isArray(response.data.concepts)) {
            const val = response.data.concepts[0];
            await setValue(obj.affectedFields[path], val, setField, contextFields);
          }
        });
      });
    }
  });
};

export { handleInternalFunctions };