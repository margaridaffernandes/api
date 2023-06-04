import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import Form from "./containers/Form/Form";
import "./index.css";
import './assets/fonts/fonts.css';
/*import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import json from "./JSON2";
import design from "./FORMDESIGN";
import dlm from "./DLMteste2";
import rmJDT from "./rmJDT";

// Considerações do form builder:
// - Não considero as tasks como não tem nada a ver com edição e visualização de dados
// - Não considero as rules 
// - Não considero os campos com +. Estes ficam todos corridos sendo acho que iria ficar uma confusão

ReactDOM.render(
    <div>
  <Form
    onSaveFormDesigner={(formDesign, formRM) => console.log("FORM DESIGN: ", formDesign, formRM)}
    onCreateFormDesigner={(formDesign, formRM) => console.log("FORM CREATED: ", formDesign, formRM)}
    onSubmit={(values, changedFields) => console.log("SUBMITTED VALUES: ", values, "CHANGED FIELDS: ", changedFields)}
    onSave={(values, changedFields) => console.log("SAVED VALUES: ", values, "CHANGED FIELDS: ", changedFields)}
    onCancel={status => console.log("CANCELLED:", status)}
    template={json}
    idJDT={1740198}
    dlm={dlm}
    idComposition={19795}
    showPrint={true}
    editMode={true}
    professionalTasks={["Registar Pedido", "Consultar Pedido", "Anular Pedido"]}
    canSubmit={true}
    canSave={true}
    canCancel={true}
    canSaveFD={true}
    canCreateFD={true}
    token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODg2MDI4MTIsInN1YiI6InRlc3RlcyJ9.V2njHN64FeAM5RjhJ-xgkVOZmjAXjKXk9TmTrrf3GH0"}
    codigosDependencia={["7", "3007", "4"]}
    userInfo={'288'}
    patientData={{
        "numSequencial": 1904865,
        "episodio": 21016848,
        "modulo": "INT",
        "processo": 99998888,
        "nome": "Manuel Utente Teste Teste Teste",
        "dtaNascimento": "1945-08-15",
        "idade": 77,
        "sexo": "Masculino"
    }}
    reportData={{
      dtaEncerrada: "22-05-2019 13:02",
      dtaCriada: "10-05-2019 18:47",
      realizada: "Joana Pascoal",
      responsavel: "José Costa"
    }}
    formDesign={JSON.stringify(design)}
    formDesignerMode={true}
    // formRM={[
    //     {
    //         "Functions": [],
    //         "InternalFunctions": [],
    //         "Refset": [],
    //         "TaskEditable": [],
    //         "TaskInReport": [],
    //         "TaskVisible": ["All"],
    //         "dataType": "DV_TEXT",
    //         "description": "teste.",
    //         "internalPath": "/ADMIN_ENTRY/ENTRY/OTHER_PARTICIPATIONS/PERFORMER/EXTERNAL_REF/OBJECT_REF/NAMESPACE",
    //         "itemName": "PERFORMER",
    //         "itemPath": "items.0.items.5.items.3.items.0.items.0.items.1",
    //         "items": null,
    //         "occurrences": {
    //             "lowerOccurrences": 1,
    //             "upperOccurrences": 1
    //         },
    //         "ruleMandatory": [],
    //         "ruleVisibility": [],
    //         "value": null,
    //         "parentPath": "items.0.0.items.0",
    //         "groupID": 3
    //     },
    //     {
    //         "Functions": [],
    //         "InternalFunctions": [],
    //         "Refset": [],
    //         "TaskEditable": [],
    //         "TaskInReport": [
    //             "All"
    //         ],
    //         "TaskVisible": [
    //             "All"
    //         ],
    //         "dataType": "DV_TEXT",
    //         "description": "teste",
    //         "internalPath": "/ADMIN_ENTRY/ENTRY/SUBJECT/EXTERNAL_REF/OBJECT_REF/NAMESPACE",
    //         "itemName": "SUBJECT",
    //         "itemPath": "items.0.items.3.items.0.items.0.items.1",
    //         "items": null,
    //         "occurrences": {
    //             "lowerOccurrences": 1,
    //             "upperOccurrences": 1
    //         },
    //         "ruleMandatory": [],
    //         "ruleVisibility": [],
    //         "value": null,
    //         "parentPath": "items.0.0.items.0",
    //         "groupID": 3
    //     }
    // ]}
    referenceModel={[
      {"itemName": "Número mecanográfico",
      "item": "num_mecanografico",
       "value": "123456",
       "formVisible": true
      },
      {"itemName": "Número sequencial",
       "item": "num_seq",
       "value": 1347095,
       "formVisible": true
      },
      {"itemName": "Nome",
       "item": "Nome",
       "value": "José da Silva Pinto",
       "formVisible": true
      }
    ]}
    rmJDT={rmJDT}
    submitButtonDisabled={false}
    saveButtonDisabled={false}
    saveFDButtonDisabled={false}
    createFDButtonDisabled={false}
  />
    </div>,
  document.getElementById("root")
);

serviceWorker.unregister();*/

export { Form };