import {createBrowserRouter, Outlet, RouterProvider} from 'react-router'
import RootLayout from './components/RootLayout'
import Register from './components/Register'
import Login from './components/Login'

function App() {

  const routeObj = createBrowserRouter([
    {
      path : "/",
      element : <RootLayout />,
      children : [
        {
          path : "/register",
          element : <Register />
        },
        {
          path : "/login",
          element : <Login />
        }
      ]
    }
  ])

  return <RouterProvider router={routeObj} />
}

export default App
