import {Outlet, useLocation} from "react-router-dom";
import {useState} from "react";
import {GlobalProvider} from "./context/GlobalState.jsx";
import styled from "styled-components";
import GlobalStyle from "../src/assets/style/GlobalStyle"

import {Footer} from "./components/Footer.jsx";
import {LoginSignup} from "./pages/LoginSignup.jsx";
import {Header} from "./components/Header.jsx";

// Container for the entire layout
const AppContainer = styled.main`
  display: grid;
  grid-template-columns: .5fr 2fr;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-width: 100vw;
  margin: 0 auto;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();
  const isSignUpPage = location.pathname === '/signup';

  return (
    <>
      <GlobalStyle/>
      <GlobalProvider>
        {isLoggedIn ? (
          <AppContainer>
            <Header/>
            <Outlet />
          </AppContainer>
        ) : (
          <>
            <LoginSignup setIsLoggedIn={setIsLoggedIn} mode={isSignUpPage ? 'signup' : 'login'}/>
            <Footer/>
          </>
        )}
      </GlobalProvider>
    </>

  );
}

export default App;
