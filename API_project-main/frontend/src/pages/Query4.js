import React, { useEffect, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StyledButton, ButtonGroup } from "../components/Styles";

const Example = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/stats4')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h2 style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold', color: 'white' }}>Overall distribution of patients' weight and temperature</h2>
            <ResponsiveContainer width={800} height={500}>
                <ScatterChart
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid />
                    <YAxis type="number" dataKey="peso" name="weight" unit="kg" />
                    <XAxis type="number" dataKey="temperatura" name="temperature" unit="ºC" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="A school" data={data} fill="#BE185D" />
                </ScatterChart>
            </ResponsiveContainer>
            <ButtonGroup>
                <StyledButton to="/data">Back</StyledButton>
            </ButtonGroup>
        </div>
    );
}

// #8884d8

export default Example;