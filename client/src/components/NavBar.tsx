import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { Container, Navbar, Nav, Button, Badge } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import { Context } from "../index"
import { ADMIN_ROUTE, CONVERTOR_ROUTE, LOGIN_ROUTE, PERSONAL_AREA_ROUTE, REGISTRATION_ROUTE } from "../utils/consts"

export const NavBar = observer(() => {

  const {user} = useContext(Context)
  const navigate = useNavigate()

  const logOut = () => {
    user.setUser(null)
    user.setIsAuth(false)
    localStorage.removeItem('token')
  }

  return(
    <Navbar bg="dark" variant="light">
      <Container>
        <NavLink to={CONVERTOR_ROUTE}>Convertor</NavLink>
        { user._isAuth ? 
        <Nav className="ml-auto">
          {/* <Button onClick={() => navigate(ADMIN_ROUTE)}>Admin</Button> */}
          <NavLink className="m-2" to={PERSONAL_AREA_ROUTE}>Perosnal area</NavLink>
          <NavLink className="m-2" to={ADMIN_ROUTE}>Admin</NavLink>
          <Button onClick={() => logOut()}>Logout</Button>
          <Badge className="m-2">{ user._user.login }</Badge>
        </Nav>
        :
        <Nav className="ml-auto">
          <NavLink className="m-2" to={LOGIN_ROUTE}>Login</NavLink>
          {/* <NavLink className="m-2" to={REGISTRATION_ROUTE}>Registration</NavLink> */}
        </Nav> } 
      </Container>
    </Navbar>
  )

})