import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navigation from "./Component/Navigation/Navigation";
import Registration from "./Page/Registration/Registration";
import Login from "./Page/Login/Login";
import PlanetsList from "./Page/PlanetsList/PlanetsList";

import './App.css';

function App() {

  const [username, setUsername] = useState("");
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [isUserLogedIn, setIsUserLogedIn] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigation
        isUserRegistered={isUserRegistered}
        isUserLogedIn={isUserLogedIn}
        setIsUserLogedIn={setIsUserLogedIn}
        username={username} />,
      children: [
        {
          path: "/",
          element: <PlanetsList />
        },
        {
          path: "/register",
          element: <Registration
            isUserRegistered={isUserRegistered}
            setIsUserRegistered={setIsUserRegistered} />
        },
        {
          path: "/login",
          element: <Login
            isUserLogedIn={isUserLogedIn}
            setIsUserLogedIn={setIsUserLogedIn}
            setUsername={setUsername} />
        },
        {
          path: "/logout",
          element: <PlanetsList />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App
