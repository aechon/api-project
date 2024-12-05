import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation/Navigation.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import SpotPage from './components/SpotPage/SpotPage.jsx';
import CreateSpotPage from './components/CreateSpotPage/CreateSpotPage.jsx';
import ManageSpotsPage from './components/ManageSpotsPage/ManageSpotsPage.jsx';
import UpdateSpotPage from './components/UpdateSpotPage/UpdateSpotPage.jsx';
import TimeAppPage from './components/TimeAppPage/TimeAppPage.jsx';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/spots/:id',
        element: <SpotPage />
      },
      {
        path: '/spots/new',
        element: <CreateSpotPage />
      },
      {
        path: '/spots/current',
        element: <ManageSpotsPage />
      },
      {
        path: '/spots/:id/edit',
        element: <UpdateSpotPage />
      },
      {
        path: '/timeapp',
        element: <TimeAppPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;