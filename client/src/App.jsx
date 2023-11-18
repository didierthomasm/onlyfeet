import {Link, Outlet, useLocation} from "react-router-dom";
import {useState} from "react";
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import Carrusel from './components/Carrusel.jsx';
//solo para prueba
import logo from './assets/img/Logos/logo-letters-bgwhite.png';
import logo2 from './assets/img/Logos/logo-letters.png';
import logo3 from './assets/img/Logos/patas-feas-fondo-circle.png'


// Context
import {GlobalProvider} from "./context/GlobalState.jsx";

// Styles
import GlobalStyle from "../src/assets/style/GlobalStyle"
import {AppContainer} from "./assets/style/AppMain/AppStyle.js";

// Components
import {LoginSignup} from "./pages/LoginSignup.jsx";
import {Header} from "./components/Header.jsx";
import {Footer} from "./components/Footer.jsx";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

  const images = [
  logo, logo2, logo3
  ];

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  console.log(token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Instantiate Apollo Client
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();
  const isSignUpPage = location.pathname === '/signup';
//el link abajo de header es sólo para prueba
  return (
    <ApolloProvider client={client}>
      <GlobalStyle/>
      <GlobalProvider>
        {isLoggedIn ? (
          <AppContainer>
            <Header/>
            <div>
              <h2>Image Carrusel</h2>
               <Carrusel images={images} />
            </div>
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
    </ApolloProvider>
  );
}

export default App;
