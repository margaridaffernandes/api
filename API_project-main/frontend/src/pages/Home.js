import { StyledTitle, StyledSubTitle, Avatar, StyledButton, ButtonGroup } from "../components/Styles";

// Logo
import Logo from '../assets/logo.png';

const Home = () => {
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
            <StyledTitle size={65}>Pediatric Clinic XPTO</StyledTitle>
            <StyledSubTitle size={27}>This clinic is the best of all, already with fully computerized clinical support. Take advantage of this platform!</StyledSubTitle>
            <ButtonGroup>
                <StyledButton to="/login">Login</StyledButton>
                <StyledButton to="/signup">Signup</StyledButton>
            </ButtonGroup>
        </div>
    );
}

export default Home;