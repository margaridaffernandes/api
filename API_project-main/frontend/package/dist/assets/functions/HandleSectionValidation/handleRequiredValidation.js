import { isDefined } from "./isDefined";

const handleRequiredValidation = (fieldValue, values, itemSection) => {
  // Se o lowerOccurrences === 0, então só passa a ser um campo obrigatório quando pelo menos um
  // dos campos da sua secção está preenchido
  if (itemSection[itemSection.length - 1] === 0) {
    let isRequired = false; // Não se liga aos últimos dois elementos da lista pois correspondem ao nome da secção e ao lowerOccurrences

    itemSection.forEach((path, index) => {
      if (index !== itemSection.length - 1 && index !== itemSection.length - 2) {
        const value = values[path]; // Verificar o campo está preenchido

        let checkIsDefined = isDefined(value);

        if (checkIsDefined) {
          isRequired = true;
        }
      }
    });

    if (isRequired) {
      return isDefined(fieldValue);
    } else {
      return true;
    }
  } else {
    // Se o lowerOccurrences !== 0 (1, 2, etc.), então o campo é obrigatório
    // independentemente do resto porque a secção deve ser preenchida (occorrer pelo menos uma vez)
    return isDefined(fieldValue);
  }
};

export { handleRequiredValidation };