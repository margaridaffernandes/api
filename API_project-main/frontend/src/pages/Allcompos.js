import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyledButton, StyledSubTitle } from '../components/Styles';
import { Form } from "protected-aidaforms";
import { replaceValuesJDT } from "../ReplaceValuesJDT";

let jdt = require("../jdt.json");
let style = require('../style_admissao.json');

const AllCompositions = () => {
    const [compositions, setCompositions] = useState([]);
    const [selectedComposition, setSelectedComposition] = useState(null);
    const [error, setError] = useState(null);
    const [newjdt, setNewjdt] = useState(null);

    useEffect(() => {
        const getCompositions = async () => {
            try {
                const response = await axios.get('/alljson');
                const compositionData = response.data;
                setCompositions(compositionData);
                setError(null);
            } catch (error) {
                setCompositions([]);
                setError('Error: ' + error.message);
            }
        };

        getCompositions();
    }, []);

    const handleCompositionClick = (composition) => {
        setSelectedComposition(composition);

        let newjdt = replaceValuesJDT(jdt, composition.items);
        setNewjdt(newjdt);
        console.log("CLIQUEI", composition.items);

    };

    return (
        <div>
            <h1 style={{ color: 'white', fontSize: '45px', textAlign: 'center', padding: '5px', marginBottom: '18px' }}>Episodes</h1>
            <div>
                {compositions && compositions.reduce((rows, composition, index) => {
                    if (index % 3 === 0) {
                        rows.push([]);
                    }
                    rows[Math.floor(index / 3)].push(
                        <StyledButton
                            key={index}
                            style={{ border: '2px solid #ccc', borderRadius: '5px', padding: '20px', marginBottom: '10px' }}
                            onClick={() => handleCompositionClick(composition)}
                        >
                            Episode {index + 1}
                        </StyledButton>
                    );
                    return rows;
                }, []).map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {row}
                    </div>
                ))}
            </div>

            <StyledSubTitle style={{ marginTop: '50px', fontSize: '30px' }}>Informations about the episode:</StyledSubTitle>

            <div>
                {newjdt && (
                    <Form
                        onSubmit={(values, changedFields) => console.log("SUBMITTED VALUES: ", values, "CHANGED FIELDS: ", changedFields)}
                        onSave={(values, changedFields) => console.log("SAVED VALUES: ", values, "CHANGED FIELDS: ", changedFields)}
                        onCancel={status => console.log("CANCELLED:", status)}
                        template={newjdt}
                        dlm={{}}
                        showPrint={true}
                        editMode={false}
                        professionalTasks={["Registar Pedido", "Consultar Pedido", "Anular Pedido"]}
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
                )}
            </div>
        </div>
    );
};

export default AllCompositions;