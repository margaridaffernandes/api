//Pages
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Formu from "./pages/Forms";


import Mapeamento from "./pages/Mapeamento";
import GetComposition from "./pages/Getcompos";
import AllCompos from "./pages/Allcompos";

import Data from "./pages/Stats";
import Stats1 from "./pages/Query1";
import Stats2 from "./pages/Query2";
import Stats3 from "./pages/Query3";
import Stats4 from "./pages/Query4";

//Styled components
import { StyledContainer } from "./components/Styles";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <Router>
      <StyledContainer>
        <Routes>

          <Route path="/signup" caseSensitive={false} element={<SignupPage />} />
          <Route path="/login" caseSensitive={false} element={<LoginPage />} />
          <Route path="/dashboard" caseSensitive={false} element={<Dashboard />} />
          <Route path="/forms" caseSensitive={false} element={<Formu />} />
          
          <Route path="/" caseSensitive={false} element={<Home />} />

          <Route path="/savejson" caseSensitive={false} element={<Mapeamento />} />
          <Route path="/findjson" caseSensitive={false} element={<GetComposition />} />
          <Route path="/alljson" caseSensitive={false} element={<AllCompos />} />

          <Route path="/data" caseSensitive={false} element={<Data />} />
          <Route path="/stats1" caseSensitive={false} element={<Stats1 />} />
          <Route path="/stats2" caseSensitive={false} element={<Stats2 />} />
          <Route path="/stats3" caseSensitive={false} element={<Stats3 />} />
          <Route path="/stats4" caseSensitive={false} element={<Stats4 />} />

        </Routes>

      </StyledContainer>
    </Router>
  );
}

export default App;
