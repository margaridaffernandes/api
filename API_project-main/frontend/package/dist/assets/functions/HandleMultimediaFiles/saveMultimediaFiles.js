import { format } from "date-fns";
import axios from "axios";
import { mapFileType } from "./mapFileType";

const parseString = require('xml2js').parseString;

const getURI = async xmls => {
  let value = "";
  await axios.post("https://chp-aidaws.chporto.min-saude.pt/CHPortoWebService/aida_view_service.asmx?wsdl", xmls, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: 'https://hsa-aida.chporto.min-saude.pt/savePDF'
    }
  }).then(resp => {
    if (resp.status === 200 && resp.statusText === 'OK') {
      parseString(resp.data, function (error, result2) {
        if (result2['soap:Envelope']['soap:Body'][0]['savePDFResponse'][0]['savePDFResult'][0]['string'][0] === 'OK') {
          //extrair o ID do ficheiro que foi carregado
          let fileID = result2['soap:Envelope']['soap:Body'][0]['savePDFResponse'][0]['savePDFResult'][0]['string'][1]; //percorrer o array e ver se o index que estamos a trabalhar corresponde ao índice do multimediaArray
          // se sim acrescentar o campo URI com o fileID atual

          value = fileID;
        }
      });
    }
  });
  return value;
};

const saveMultimediaFiles = async (file, formTitle, patientData, userInfo, values) => {
  let uriValue = ""; // 1º - Gerar a chave para publicar o documento pela 1ª vez -> usar o método createKey

  let jsonData = {
    ID: "",
    COMPOSITION: "",
    EPISODIO: patientData.episodio.toString(),
    MODULO: patientData.modulo.toString(),
    TIPO: values["items-0-1-items-1-value"] !== undefined && values["items-0-1-items-1-value"] !== null ? mapFileType(values["items-0-1-items-1-value"]) : "1",
    FORMATO: file['format'].toString(),
    NUM_SEQUENCIAL: patientData.numSequencial.toString(),
    RELATORIO: "",
    RESUMO: "Documento carregado em " + formTitle,
    OBS: "",
    DATA_REG: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    UTILIZADOR: userInfo.toString(),
    DTA_PUB: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    ESTADO: "1"
  };
  let data = `${JSON.stringify(jsonData)}|${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}|AIDA_FORMBUILDER|AIDA_INSERT_PDF`;
  let xmls = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n' + '<soap:Body>\n' + '<createKey xmlns="https://hsa-aida.chporto.min-saude.pt/">\n' + '<chave>' + data + '</chave>\n' + '<NDias>1</NDias>\n' + '<app>AIDA_FORMBUILDER</app>\n' + '<userAplicacao>AidaFormBuilder</userAplicacao>\n' + '<passAplicacao>20Aid@F0rMBu1ldER22</passAplicacao>\n' + '</createKey>\n' + '</soap:Body>\n' + '</soap:Envelope>';
  await axios.post("https://chp-aidaws.chporto.min-saude.pt/CHPortoWebService/aida_view_service.asmx?wsdl", xmls, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: 'https://hsa-aida.chporto.min-saude.pt/createKey'
    }
  }).then(res => {
    if (res.status === 200 && res.statusText === 'OK') {
      //o serviço retorna o id da chave, uso esse id para chamar o método savePDF que retorna o id do documento carregado
      parseString(res.data, function (err, result) {
        if (result['soap:Envelope']['soap:Body'][0]['createKeyResponse'][0]['createKeyResult'][0]['string'][0] === 'OK') {
          let keyID = result['soap:Envelope']['soap:Body'][0]['createKeyResponse'][0]['createKeyResult'][0]['string'][1];
          let fileBase64 = Object.values(file)[0];
          let xmls2 = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n' + '<soap:Body>\n' + '<savePDF xmlns="https://hsa-aida.chporto.min-saude.pt/">\n' + '<Id>' + keyID + '</Id>\n' + '<ficheiroBase64>' + fileBase64 + '</ficheiroBase64>\n' + '</savePDF>\n' + '</soap:Body>\n' + '</soap:Envelope>';
          uriValue = getURI(xmls2).then(val => {
            return val;
          });
        }
      });
    }
  });
  return uriValue;
};

export { saveMultimediaFiles };