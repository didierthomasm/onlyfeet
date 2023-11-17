import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import App from './App.jsx'
import ErrorPage from "./pages/Error.jsx";
import {Home} from "./pages/Home.jsx";
import {LoginSignup} from "./pages/LoginSignup.jsx";
import {Profile} from "./pages/Profile.jsx";
import {Pay} from "./pages/Pay.jsx";
import {Earn} from "./pages/Earn.jsx";
import Help from "./pages/Help.jsx";
import SecureUpload from './components/SecureUpload.jsx';
import Upload from './components/Upload.jsx';


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
        path: 'profile',
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
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
