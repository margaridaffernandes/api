import { Form } from "protected-aidaforms";
import { replaceValuesJDT } from "../ReplaceValuesJDT";

import { useLocation} from "react-router-dom";


let jdt = require("../jdt.json");
let style = require('../style_admissao.json');

function Formu() {
    const location = useLocation();
    const composition = location.state;
    let newjdt = replaceValuesJDT(jdt, composition)

    return (
        <Form
            onSubmit={(values, changedFields) => console.log("SUBMITTED VALUES: ", values, "CHANGED FIELDS: ", changedFields)}
            onSave={(values, changedFields) => console.log("SAVED VALUES: ", values, "CHANGED FIELDS: ", changedFields)}
            onCancel={status => console.log("CANCELLED:", status)}
            template={newjdt}
            dlm={{}}
            showPrint={true}
            editMode={false} // colocar assim porque não vamos editar os formulários
            professionalTasks={
                ["Registar Pedido", "Consultar Pedido",
                    "Anular Pedido"]}
            canSubmit={true}
            canSave={true}
            canCancel={true}
            patientData={{}}
            reportData={{}}
            referenceModel={[]}
            submitButtonDisabled={false}
            saveButtonDisabled={false}
            formDesign={JSON.stringify(style)}
        />
    )
};

export default Formu;