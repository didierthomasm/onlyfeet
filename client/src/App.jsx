import React from 'react';
import {Outlet, useLocation} from "react-router-dom";

// Stripe
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

// Styles
import GlobalStyle from "../src/assets/style/GlobalStyle"
import {AppContainer} from "./assets/style/AppMain/AppStyle.js";

// Components
import {LoginSignup} from "./pages/LoginSignup.jsx";
import {Header} from "./components/Header.jsx";
import {Footer} from "./components/Footer.jsx";
import Auth from "./utils/auth.js";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them

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

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY);

function App() {
  const location = useLocation();
  const isSignUpPage = location.pathname === '/signup';

  return (
    <ApolloProvider client={client}>
      <Elements stripe={stripePromise}>
        <GlobalStyle/>
        {Auth.loggedIn() ? (
          <AppContainer>
            <Header/>
            <Outlet/>
          </AppContainer>
        ) : (
          <LoginSignup mode={isSignUpPage ? 'signup' : 'login'}/>

        )}
      </Elements>
    </ApolloProvider>
  );
}

export default App;
