import {createBrowserRouter, Outlet, RouterProvider} from 'react-router'
import RootLayout from './components/RootLayout'
import Register from './components/Register'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import AuthorDashboard from './components/AuthorDashboard'
import UserDashbourd from './components/UserDashbourd'
import {Toaster} from 'react-hot-toast'
import SingleArticle from './components/SingleArticle'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  const routeObj = createBrowserRouter([
    {
      path : "/",
      element : <RootLayout />,
      children : [
        {
          path : "register",
          element : <Register />
        },
        {
          path : "login",
          element : <Login />
        },
        {
          path : "user-profile",
          element : 
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserDashbourd />
            </ProtectedRoute>
        },
        {
          path : "admin-profile",
          element: 
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
        },
        {
          path : "author-profile",
          element : 
          <ProtectedRoute allowedRoles={["AUTHOR"]}>
            <AuthorDashboard />
          </ProtectedRoute>
        },
        {
          path : `article/:id`,
          element : <SingleArticle />
        }
      ]
    }
  ])

  return <>
  <Toaster position='top-center' reverseOrder={false} />
  <RouterProvider router={routeObj} />
  </>
}

export default App
