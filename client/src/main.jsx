import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import App from './App.jsx'
import {Home} from "./pages/Home.jsx";
import ErrorPage from "./pages/Error.jsx";
import {LoginSignup} from "./pages/LoginSignup.jsx";
import {Profile} from "./pages/Profile.jsx";

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
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
