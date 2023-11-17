import {Link, Outlet, useLocation} from "react-router-dom";
import {useState} from "react";
import {GlobalProvider} from "./context/GlobalState.jsx";

// Styles
import GlobalStyle from "../src/assets/style/GlobalStyle"
import {AppContainer} from "./assets/style/AppMain/AppStyle.js";

// Components
import {LoginSignup} from "./pages/LoginSignup.jsx";
import {Header} from "./components/Header.jsx";
import {Footer} from "./components/Footer.jsx";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();
  const isSignUpPage = location.pathname === '/signup';

// el Link es sólo para prueba

  return (
    <>
      <GlobalStyle/>
      <GlobalProvider>
        {isLoggedIn ? (
          <AppContainer>
            <Header/>
            <h1>Upload Files</h1>
            <Link to="/">Home</Link>|<Link to="upload">Upload</Link>|<Link to="secure-upload">Secure Upload</Link>
            <br/>
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
