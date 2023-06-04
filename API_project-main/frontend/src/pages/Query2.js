import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StyledButton, ButtonGroup } from "../components/Styles";

const Example = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/stats2')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.log(error));
    }, []);

    const monthFormatter = (month) => {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return monthNames[month - 1];
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold', color: 'white' }}>Number of babies admitted per month</h2>
            <ResponsiveContainer width={800} height={500}>
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tickFormatter={monthFormatter} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {data.length > 0 && (
                        <>
                            <Line type="monotone" dataKey="frequency" stroke="#BE185D" activeDot={{ r: 8 }} />
                        </>
                    )}
                </LineChart>
            </ResponsiveContainer>
            <ButtonGroup>
                <StyledButton to="/data">Back</StyledButton>
            </ButtonGroup>
        </div>
    );
};

export default Example;
