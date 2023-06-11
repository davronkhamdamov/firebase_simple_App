import { Container } from 'react-bootstrap';
import Signup from './Signup';
import { AuthProvider } from '../context/Auth.context';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import ForgetPassword from './ForgetPassword';
import { PrivateRoutes } from './PrivateRoute'
import UpdateProfile from './UpdateProfile';

export default function Home() {
  const root = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/update-profile' element={<UpdateProfile />} />
        </Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
      </Route>
    )
  )
  return (
    <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
      <div className='w-100' style={{ maxWidth: "400px" }}>
        <AuthProvider>
          <RouterProvider router={root} />
        </AuthProvider>
      </div>
    </Container >
  )
}