import * as Yup from "yup";

const buildSectionValidation = (minOccurrences, pathLabel, validationSchema) => {
  validationSchema[pathLabel] = Yup.number().min(minOccurrences, minOccurrences === 1 ? "Campo inválido: deve existir pelo menos " + minOccurrences + " secção" : "Campo inválido: devem existir pelo menos " + minOccurrences + " secções");
};

export { buildSectionValidation };