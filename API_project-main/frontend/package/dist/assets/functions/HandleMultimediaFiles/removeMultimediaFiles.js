import { format } from "date-fns";
import axios from "axios";

const parseString = require('xml2js').parseString;

const deleteFile = async xmls => {
  let successfulDelete = false;
  await axios.post("https://chp-aidaws.chporto.min-saude.pt/CHPortoWebService/aida_view_service.asmx?wsdl", xmls, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: 'https://hsa-aida.chporto.min-saude.pt/savePDF'
    }
  }).then(resp => {
    if (resp.status === 200 && resp.statusText === 'OK') {
      parseString(resp.data, function (error, result2) {
        if (result2['soap:Envelope']['soap:Body'][0]['savePDFResponse'][0]['savePDFResult'][0]['string'][0] === 'OK') {
          successfulDelete = true;
        }
      });
    }
  });
  return successfulDelete;
};

const removeMultimediaFiles = async (uid, idComposition, userInfo) => {
  let isCompleted = false; // 1º - Gerar a chave para despublicar o documento

  let jsonData = {
    ID: uid.toString(),
    COMPOSITION: idComposition.toString(),
    EPISODIO: "",
    MODULO: "",
    TIPO: "",
    FORMATO: "",
    NUM_SEQUENCIAL: "",
    RELATORIO: "",
    RESUMO: "",
    OBS: "",
    DATA_REG: "",
    UTILIZADOR: userInfo.toString(),
    DTA_PUB: "",
    ESTADO: "0"
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
      //o serviço retorna o id da chave, uso esse id para chamar o método savePDF
      parseString(res.data, function (err, result) {
        if (result['soap:Envelope']['soap:Body'][0]['createKeyResponse'][0]['createKeyResult'][0]['string'][0] === 'OK') {
          let keyID = result['soap:Envelope']['soap:Body'][0]['createKeyResponse'][0]['createKeyResult'][0]['string'][1];
          let xmls2 = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n' + '<soap:Body>\n' + '<savePDF xmlns="https://hsa-aida.chporto.min-saude.pt/">\n' + '<Id>' + keyID + '</Id>\n' + '<ficheiroBase64></ficheiroBase64>\n' + '</savePDF>\n' + '</soap:Body>\n' + '</soap:Envelope>';
          isCompleted = deleteFile(xmls2).then(val => {
            return val;
          });
        }
      });
    }
  });
  return isCompleted;
};

export { removeMultimediaFiles };