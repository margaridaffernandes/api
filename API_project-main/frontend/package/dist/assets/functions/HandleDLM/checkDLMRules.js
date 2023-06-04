import axios from "axios";
import { getEnvUrl } from "../../../environment/index";

const makeDLMRequest = async (token, idJDT, ruleID, inputVariables) => {
  try {
    const res = await axios({
      method: "post",
      url: `${getEnvUrl('aidadlmengine', '4023')}/dlmEngine`,
      // url: 'http://172.21.220.49:4023/dlmEngine',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token
      },
      data: {
        id: idJDT,
        idRule: ruleID,
        inputVariables: inputVariables
      }
    });
    const response = res.data;
    let itemPath, value, action; // 1º Verificar se há regras a cumprir

    if (response && Object.keys(response).length === 0 && response.constructor === Object) {
      return;
    } else {
      let rules = [];
      response.events.forEach(e => {
        let rule; // 2º Ir buscar o itemPath do campo que vai ser afetado

        itemPath = e.item; // 3º Extrair o valor da acção

        action = e.action; // 4º Verificar se é uma acção que está associada a um payload (valor) e nesse caso extrair o valor

        let hasValue = Object.keys(e).length > 2 ? true : false;
        value = hasValue && e.value;
        rule = {
          itemPath,
          action,
          value
        };
        rules.push(rule);
      });
      return rules;
    }
  } catch (e) {
    console.log(e);
    return;
  }
};

const createInputVariables = (itemPath, value, oldInputs) => {
  let inputs = {};
  Object.assign(inputs, oldInputs); // value do tipo Objeto -> envia o objeto

  if (value !== undefined) {
    if (value instanceof Object) {
      inputs[itemPath] = value;
    } // value do tipo Array -> envia um array com cada value
    else if (Array.isArray(value) && value.length > 0) {
        let v = [];
        value.forEach(val => {
          v.push(val);
        });
        inputs[itemPath] = v;
      } // restantes casos
      else {
          inputs[itemPath] = value;
        }
  }

  return inputs;
};

const pathLabeltoNormalPath = pathLabel => {
  let pathLabelParts = pathLabel.split("-");
  let itemPathParts = pathLabelParts.filter(p => p === "items" || !isNaN(p));
  let newItemPath = itemPathParts.join(".");
  return newItemPath;
};

const checkDLMRules = async (token, updateIsDlmFinished, idJDT, dlmRules, templateRules, itemPath, pathLabel, values) => {
  let inputs = {};
  let response = []; // 1º - verificar se existem regras DLM associadas a este item

  if (Array.isArray(dlmRules) && dlmRules.length > 0) {
    for (const rule of dlmRules) {
      for (const r of templateRules) {
        if (r[0].ruleID === rule) {
          // 2º - se existirem regras, ir buscar as respetivas condições
          let conditions = r[0].inputVariables;

          if (Array.isArray(conditions) && conditions.length > 0) {
            // 3º - ir buscar o itemPath e o value actual de cada condição
            inputs = {};
            conditions.forEach(item => {
              let val1 = item.replaceAll(".", "-") + "-value"; //itemPathLabel
              // let val2 = item.replaceAll(".", "-") + "-value-date";
              // let val3 = item.replaceAll(".", "-") + "-value-time";
              // if (values[val1] !== "" && values[val2] !== "" && values[val3] !== "") {

              if (values[val1] !== "") {
                // 4º transformar o pathLabel num path normal e adicionar aos inputs
                let path = pathLabeltoNormalPath(val1);
                inputs = createInputVariables(path, values[val1], inputs);
              }
            }); // só se tiver os inputs todos preenchidos é que faz o pedido

            if (Object.keys(inputs).length === conditions.length) {
              updateIsDlmFinished(false);
              let res = await makeDLMRequest(token, idJDT, rule, inputs);
              res !== undefined && response.push(res);
            }
          }
        }
      }
    }
  }

  return response;
};

export { checkDLMRules };