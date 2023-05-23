import { Link } from "react-router-dom"
import { useContext } from 'react'
import UsersContext from '../../contexts/UsersContext'

const handleSignOut = setUserDetail => {
  localStorage.removeItem('user')
  setUserDetail({})
}

function Navbar() {
  const {
    userDetail,
    setUserDetail,
    } = useContext(UsersContext)


  const isLogged = Object.keys(userDetail).length
  
  return (
    <div className='navbar'>
      <ul>
        <li><Link className="active" to="/home">Home</Link></li>
        {isLogged && <li><Link to="/pets">Mascotas</Link></li>}
        {isLogged && userDetail.is_staff && <li><Link to="/appointments">Turnos</Link></li>}
        {!isLogged 
          ? <li><Link to="/login">Iniciar sesion</Link></li> 
          : <li><Link to="/home" 
                      onClick={() => handleSignOut(setUserDetail)}>Cerrar Sesion</Link></li>
        }
      </ul>
    </div> 
  )
}

export default Navbar
