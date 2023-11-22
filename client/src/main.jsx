import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import App from './App';
import ErrorPage from "./pages/Error";
import { Home } from "./pages/Home";
import { LoginSignup } from "./pages/LoginSignup";
import { Profile } from "./pages/Profile";
import { Pay } from "./pages/Pay";
import { Earn } from "./pages/Earn";
import Help from "./pages/Help";
import SecureUpload from './components/SecureUpload';
import Upload from './components/Upload';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'login',
        element: <LoginSignup />
      },
      {
        path: 'signup',
        element: <LoginSignup />
      },
      {
        path: 'profile/:profileId',
        element: <Profile />
      },
      {
        path: '/me',
        element: <Profile />
      },
      {
        path: 'payment',
        element: <Pay />
      },
      {
        path: 'earnings',
        element: <Earn />
      },
      {
        path: 'help',
        element: <Help />
      },
      {
        path: 'upload',
        element: <Upload/>
      },
      {
        path: 'secure-upload',
        element: <SecureUpload/>
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
