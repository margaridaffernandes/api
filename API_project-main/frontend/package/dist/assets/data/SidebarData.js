const getItemsList = otherExtension => {
  let itemsList = [{
    id: 0,
    description: "Todos os ficheiros",
    color: "#b38ada",
    text: "ALL",
    isDefault: true,
    extension: ""
  }, {
    id: 1,
    description: "Ficheiros PDF",
    color: "#f68a8b",
    text: "PDF",
    extension: ".pdf"
  }, {
    id: 2,
    description: "Ficheiros de Texto",
    color: "#73c9cf",
    text: "TXT",
    extension: "text/*"
  }, {
    id: 6,
    description: "Ficheiros MS Word",
    color: "#63b3ed",
    text: "DOC",
    extension: ".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  }, {
    id: 7,
    description: "Ficheiros MS Excel",
    color: "#60cc8c",
    text: "CSV",
    extension: ".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
  }, {
    id: 3,
    description: "Ficheiros de Imagem",
    color: "#a7e080",
    text: "IMG",
    extension: "image/*"
  }, {
    id: 4,
    description: "Ficheiros de Video",
    color: "#f898bc",
    text: "MOV",
    extension: "video/*"
  }, {
    id: 8,
    description: "Imagens DICOM",
    color: "#ff987c",
    text: "DCM",
    extension: ".dcm"
  }, {
    id: 5,
    description: "Ficheiros de Áudio",
    color: "#ffaa79",
    text: "MP3",
    extension: "audio/*"
  }, {
    id: 9,
    description: "Outro",
    color: "#ffd58c",
    text: "???",
    extension: otherExtension
  }];
  return itemsList;
};

export { getItemsList };