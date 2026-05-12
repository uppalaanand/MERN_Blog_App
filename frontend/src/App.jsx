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
import AuthorProfile from './components/AuthorProfile'
import WriteArticle from './components/WriteArticle'
import ErrorBoundary from './components/ErrorBoundary'
import EditArticle from './components/EditArticle'
import Home from './components/Home'

function App() {

  const routeObj = createBrowserRouter([
    {
      path : "/",
      element : <RootLayout />,
      errorElement:<ErrorBoundary />,
      children : [
        {
          path : "/",
          element : <Home />
        },
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
            <AuthorProfile />
          </ProtectedRoute>,
          children : [
            {
              index : true,
              element : <AuthorDashboard />
            },
            {
              path : "articles",
              element : <AuthorDashboard />
            },
            {
              path : "write-article",
              element : <WriteArticle />
            }
          ]
        },
        {
          path : `article/:id`,
          element : <SingleArticle />
        },
        {
          path : "edit-article",
          element : <EditArticle />
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
