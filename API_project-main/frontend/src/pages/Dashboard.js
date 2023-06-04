import React from 'react';
import { Avatar, StyledButton, ButtonGroup } from "../components/Styles";

// Logo
import Logo from '../assets/logo.png';

function Dashboard() {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "transparent",
          width: "100%",
          padding: "15px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Avatar image={Logo} />
      </div>
      <form style={{ border: '2px solid #ccc', borderRadius: '5px', padding: '20px' }}>
        <h2 style={{ color: 'white', fontSize: '45px', textAlign: 'center', padding: '5px' }}>Welcome, doctor admin</h2>
        <ButtonGroup>
          <StyledButton to="/savejson">Upload a patient's Excel</StyledButton>
          <StyledButton to="/findjson">View a patient's form</StyledButton>
          <StyledButton to="/alljson">Get all compositions from the database</StyledButton>
          <StyledButton to="/data">View statistics of the clinic's patients</StyledButton>
        </ButtonGroup>
      </form>
      <div style={{ marginTop: '105px', display: 'flex', justifyContent: 'center' }}>
        <StyledButton to="/">Logout</StyledButton>
      </div>
    </div>
  );
}

export default Dashboard;