import chpLogo from "../../../assets/logos/chp_logo.jpg";

const patientMetadata = patientData => {
  let data = {
    table: {
      dontBreakRows: true,
      widths: ["30%", "70%"],
      body: [[{
        image: chpLogo,
        width: 140,
        height: 80,
        style: "image",
        border: [false, false, false, false]
      }, [{
        text: [{
          text: "Episódio nº ",
          style: "bold"
        }, patientData.episodio, {
          text: ".           Processo nº ",
          style: "bold"
        }, patientData.processo],
        style: "patientData"
      }, {
        text: [{
          text: "Nome: ",
          style: "bold"
        }, patientData.nome],
        style: "patientData"
      }, {
        text: [{
          text: "Data Nascimento: ",
          style: "bold"
        }, patientData.dtaNascimento, ", ", patientData.idade, {
          text: ". Sexo: ",
          style: "bold"
        }, patientData.sexo],
        style: "patientData"
      }, {
        text: [{
          text: "Adm. Hospital: ",
          style: "bold"
        }, patientData.admHospital, {
          text: " Adm. Serviço: ",
          style: "bold"
        }, patientData.admServico],
        style: "patientData"
      }]]]
    },
    layout: {
      hLineWidth: function (i, node) {
        return 0.5;
      },
      vLineWidth: function (i, node) {
        return 0.5;
      },
      hLineColor: function (i, node) {
        return "black";
      },
      vLineColor: function (i, node) {
        return "black";
      }
    }
  };
  return data;
};

export { patientMetadata };