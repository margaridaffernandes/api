const mapFileType = value => {
  let type;

  switch (true) {
    case value.text === "Relatório clínico" || value.code === "SNOMED::371531000":
      type = "1";
      break;

    case value.text === "Relatório de MCD" || value.code === "SNOMED::4201000179104":
      type = "2";
      break;

    case value.text === "Informação Social" || value.code === "SNOMED::6":
      type = "4";
      break;

    case value.text === "Consentimento Informado" || value.code === "SNOMED::7":
      type = "5";
      break;

    case value.text === "Impresso de consumo" || value.code === "SNOMED::8":
      type = "6";
      break;

    case value.text === "Telefonema dia seguinte" || value.code === "SNOMED::3":
      type = "8";
      break;

    case value.text === "Registo Anestésico" || value.code === "SNOMED::416779005":
      type = "9";
      break;

    case value.text === "Registo de transfusão" || value.code === "SNOMED::1":
      type = "10";
      break;

    case value.text === "Telefonema do dia anterior" || value.code === "SNOMED::2":
      type = "12";
      break;

    case value.text === "Telefonema dos 30 dias" || value.code === "SNOMED::4":
      type = "13";
      break;

    case value.text === "Medicamentos hemoderivados" || value.code === "SNOMED::5":
      type = "14";
      break;

    case value.text === "Prescrição e Requisição de antídotos" || value.code === "SNOMED::761938008":
      type = "15";
      break;

    case value.text === "Espólio" || value.code === "SNOMED::9":
      type = "16";
      break;

    case value.text === "Avaliação Neuropsicológica" || value.code === "SNOMED::307808008":
      type = "17";
      break;

    default:
      type = "1";
      break;
  }

  return type;
};

export { mapFileType };