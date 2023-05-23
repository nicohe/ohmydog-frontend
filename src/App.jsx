import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useState, useContext } from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './components/Home'
import PetListPage from './pages/PetList'
import PetDetailPage from './pages/PetDetail'
import AppointmentListPage from './pages/AppointmentList'
import AppointmentDetailPage from './pages/AppointmentDetail'
import LoginPage from './pages/Login'

import UsersContext from './contexts/UsersContext'

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

function App() {
  const [count, setCount] = useState(0)
  const {
    userDetail,
    } = useContext(UsersContext)

  const isLogged = Object.keys(userDetail).length

  return (
    <>
    <Navbar />
    <div className='container'>
        <Routes>
          <Route path="/login" element={!isLogged ? <LoginPage /> : <Navigate replace to={'/home'} /> } />
          <Route path="/home" element={<Home />} />
          {isLogged &&
          <>
            <Route path="/pets" element={<PetListPage />} />
            <Route path="/pets/:petId" element={<PetDetailPage />} />
          </>
          }
          {/* <ProtectedRoute user={userDetail.is_staff}/> */}
          <Route
            element={<ProtectedRoute user={userDetail.is_staff}/>}>
                <Route path="/appointments" element={<AppointmentListPage />} />
                <Route path="/appointments/:appointmentId" element={<AppointmentDetailPage />} />
          </Route>
        </Routes>
      </div>
      </>
  )
}

export default App
