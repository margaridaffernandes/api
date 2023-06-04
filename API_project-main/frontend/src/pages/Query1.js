import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StyledButton, ButtonGroup } from "../components/Styles";

const Example = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/stats1')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h2 style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold', color: 'white' }}>Distribution of patients' places of origin</h2>
            <ResponsiveContainer width={800} height={500}>
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="items.items.0.0.items.7.items.0.value.text" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {data.length > 0 && (
                        <Bar dataKey="frequency" fill="#BE185D" />
                    )}
                </BarChart>
            </ResponsiveContainer>
            <ButtonGroup>
                <StyledButton to="/data">Back</StyledButton>
            </ButtonGroup>
        </div>
    );
};

export default Example;