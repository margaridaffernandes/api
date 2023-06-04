import React from 'react';
import "../style.css";
import { StyledButton, ButtonGroup } from "../components/Styles";


const App = () => {
  return (
    <div>
      <h2 style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold', color: 'white' }}>Statistics</h2>
      <ButtonGroup>
        <StyledButton to="/stats1">Distribution of patients' places of origin</StyledButton>
        <StyledButton to="/stats2">Number of babies admitted per month</StyledButton>
        <StyledButton to="/stats3">1st most common reasons for patient hospitalization</StyledButton>
        <StyledButton to="/stats4">Overall distribution of patients' weight and age</StyledButton>
      </ButtonGroup>
    </div>
  );
};

export default App;