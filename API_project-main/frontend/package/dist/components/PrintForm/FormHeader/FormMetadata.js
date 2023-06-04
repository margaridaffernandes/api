const formMetadata = formData => {
  let data = {
    table: {
      dontBreakRows: true,
      widths: ["20%", "20%", "60%"],
      body: [[[{
        text: "Encerrada em ",
        style: "formData"
      }, {
        text: formData.dtaEncerrada,
        style: "formData"
      }], [{
        text: "Criada em ",
        style: "formData"
      }, {
        text: formData.dtaCriada,
        style: "formData"
      }], [{
        text: ["Realizada por: ", formData.realizada],
        style: "formData"
      }, {
        text: ["Responsável: ", formData.responsavel],
        style: "formData"
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

export { formMetadata };