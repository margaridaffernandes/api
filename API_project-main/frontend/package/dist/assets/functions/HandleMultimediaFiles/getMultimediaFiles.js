import { format } from "date-fns";
import axios from "axios";

const parseString = require('xml2js').parseString;

const getBase64 = async xmls2 => {
  let fileData;
  await axios.post("https://chp-aidaws.chporto.min-saude.pt/CHPortoWebService/aida_view_service.asmx?wsdl", xmls2, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: 'https://hsa-aida.chporto.min-saude.pt/GetPDF'
    }
  }).then(resp => {
    if (resp.status === 200 && resp.statusText === 'OK') {
      parseString(resp.data, function (error, result2) {
        if (result2['soap:Envelope']['soap:Body'][0]['GetPDFResponse'][0]['GetPDFResult'][0]['string'][0] === 'OK') {
          //extrair o ficheiro associado àquele URI
          let fileResult = result2['soap:Envelope']['soap:Body'][0]['GetPDFResponse'][0]['GetPDFResult'][0]['string'][1];
          fileData = fileResult;
        }
      });
    }
  }).catch(e => {
    console.log('O pedido não foi bem sucedido! Erro ao extrair o ficheiro: ', e);
  });
  return fileData;
};

const getMultimediaFile = async (URI, compositionId) => {
  let fileData = ""; // 1º - Gerar a chave para obter o documento -> usar o método createKey

  let jsonData = {
    ID: URI.toString(),
    COMPOSITION: compositionId.toString(),
    EPISODIO: "",
    MODULO: "",
    TIPO: "",
    FORMATO: "",
    NUM_SEQUENCIAL: "",
    RELATORIO: "",
    RESUMO: "",
    OBS: "",
    DATA_REG: "",
    UTILIZADOR: "",
    DTA_PUB: "",
    ESTADO: "2"
  };
  let data = `${JSON.stringify(jsonData)}|${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}|AIDA_FORMBUILDER|DOC_FORMBUILDER`;
  let xmls = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n' + '<soap:Body>\n' + '<createKey xmlns="https://hsa-aida.chporto.min-saude.pt/">\n' + '<chave>' + data + '</chave>\n' + '<NDias>1</NDias>\n' + '<app>AIDA_FORMBUILDER</app>\n' + '<userAplicacao>AidaFormBuilder</userAplicacao>\n' + '<passAplicacao>20Aid@F0rMBu1ldER22</passAplicacao>\n' + '</createKey>\n' + '</soap:Body>\n' + '</soap:Envelope>';
  await axios.post("https://chp-aidaws.chporto.min-saude.pt/CHPortoWebService/aida_view_service.asmx?wsdl", xmls, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: 'https://hsa-aida.chporto.min-saude.pt/createKey'
    }
  }).then(res => {
    if (res.status === 200 && res.statusText === 'OK') {
      // o serviço retorna o id da chave, uso esse id para chamar o método GetPDF que retorna o ficheiro em base64
      parseString(res.data, function (err, result) {
        if (result['soap:Envelope']['soap:Body'][0]['createKeyResponse'][0]['createKeyResult'][0]['string'][0] === 'OK') {
          let keyID = result['soap:Envelope']['soap:Body'][0]['createKeyResponse'][0]['createKeyResult'][0]['string'][1];
          let xmls2 = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n' + '<soap:Body>\n' + '<GetPDF xmlns="https://hsa-aida.chporto.min-saude.pt/">\n' + '<Id>' + keyID + '</Id>\n' + '</GetPDF>\n' + '</soap:Body>\n' + '</soap:Envelope>';
          fileData = getBase64(xmls2);
        }
      });
    }
  }).catch(err => {
    console.log('O pedido não foi bem sucedido! Erro ao gerar a key: ', err);
  });
  return fileData;
};

export { getMultimediaFile };