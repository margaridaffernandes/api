const handleSubForm = (path, subForm) => {
  let value = undefined;
  subForm.forEach(obj => {
    Object.keys(obj.values).forEach(p => {
      const newp = p.split(".").join("-"); // Vejo se é o campo em questão

      if (newp === path) {
        // Verifico o valor se o campo ainda está a undefined
        // Ao voltar do subForm, os valores vêm limpos no handleSubmit, ou seja, não há editorState, arrays com campos vazios, etc. => o que tiver vazio vem a null
        if (value === undefined) {
          // Só quero atualizar se o valor do campo não estiver a null, senão não me interessa e fica como está
          if (obj.values[p] !== null) {
            // Ponho um valor qualquer para dizer que está definido => assim não precisa de ver se é array, editorState, etc.
            value = "defined";
          }
        }
      } else if (Array.isArray(obj.values[p])) {
        const newSubform = obj.values[p];

        if (newSubform.length > 0) {
          if (newSubform[0].id) {
            // Vou verificar se não será outro subForm o path em questão
            value = handleSubForm(path, newSubform); // Volto a fazer o mesmo processo
          }
        }
      }
    });
  });
  return value;
};

const getFieldValue = (values, path, subForms) => {
  let value = values[path]; // Verificar se está no subform

  if (value === undefined) {
    subForms.forEach(obj => {
      obj.values.forEach(section => {
        Object.keys(section.values).forEach(p => {
          const newp = p.split(".").join("-"); // Vejo se é o campo em questão

          if (newp === path) {
            // Verifico o valor se o campo ainda está a undefined
            // Ao voltar do subForm, os valores vêm limpos no handleSubmit, ou seja, não há editorState, arrays com campos vazios, etc. => o que tiver vazio vem a null
            if (value === undefined) {
              // Só quero atualizar se o valor do campo não estiver a null, senão não me interessa e fica como está
              if (section.values[p] !== null) {
                // Ponho um valor qualquer para dizer que está definido => assim não precisa de ver se é array, editorState, etc.
                value = "defined";
              }
            }
          } else if (Array.isArray(section.values[p])) {
            const newSubform = section.values[p];

            if (newSubform.length > 0) {
              if (newSubform[0].id) {
                // Vou verificar se não será outro subForm o path em questão
                value = handleSubForm(path, newSubform); // Verifico o subform
              }
            }
          }
        });
      });
    });
  }

  return value;
};

const handleRequiredSection = (objectValidation, pathLabel, values, multipleSections) => {
  let arrayFieldValues = [];
  let sectionsError = [];
  let object = { ...objectValidation
  };

  if (Object.keys(object).length !== 0) {
    for (let i = 0; i < Object.keys(object).length; i++) {
      let key = Object.keys(object)[i];
      let array = object[key];

      if (array.indexOf(pathLabel) > -1) {
        let fieldValues = [];
        let arrayPaths = [...array];
        arrayPaths.pop();
        arrayPaths.pop();

        for (let j = 0; j < arrayPaths.length; j++) {
          let path = arrayPaths[j];
          const obtainedValue = getFieldValue(values, path, multipleSections);
          fieldValues.push(obtainedValue); // Antigamento quando não precessava dentro de subsecções
          //fieldValues.push(values[path]);
        }

        arrayFieldValues.push([...fieldValues, array[array.length - 2], array[array.length - 1]]);
      }
    }

    if (arrayFieldValues.length !== 0) {
      arrayFieldValues.forEach(function (array) {
        let arrayPaths = [...array];
        arrayPaths.pop();
        arrayPaths.pop();

        if (arrayPaths.filter(function (value) {
          if (value !== undefined) {
            if (Array.isArray(value)) {
              let textIds = value.filter(obj => obj.textId !== undefined);
              let identifierIds = value.filter(obj => obj.identifierId !== undefined);

              if (textIds.length > 0) {
                let writtenFields = value.filter(obj => obj.value.getCurrentContent().hasText());

                if (writtenFields.length > 0) {
                  return true;
                }

                return false;
              } else if (identifierIds.length > 0) {
                let writtenIdentifiers = value.filter(obj => obj.value !== "");

                if (writtenIdentifiers.length > 0) {
                  return true;
                }

                return false;
              } else {
                if (value.length > 0) {
                  return true;
                }

                return false;
              }
            } else if (value._immutable !== undefined) {
              if (value.getCurrentContent().hasText()) {
                return true;
              }

              return false;
            }

            return true;
          }

          return false;
        }).length < array[array.length - 1]) {
          const textError = array[array.length - 2] + " (Número de campos a preencher: " + array[array.length - 1] + ")";
          sectionsError.push(textError);
        }
      });

      if (sectionsError.length >= 1) {
        return sectionsError;
      }

      return true;
    }

    return true;
  }

  return true;
};

export { handleRequiredSection };