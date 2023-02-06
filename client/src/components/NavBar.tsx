import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { Context } from "../index"
import { ADMIN_ROUTE, CONVERTOR_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts"

export const NavBar = observer(() => {

  const {user} = useContext(Context)

  return(
    <Navbar bg="dark" variant="light">
      <Container>
        <NavLink to={CONVERTOR_ROUTE}>Convertor</NavLink>
        { user._isAuth ? 
        <Nav className="ml-auto">
          <NavLink to={ADMIN_ROUTE}>Admin</NavLink>
        </Nav>
        :
        <Nav className="ml-auto">
          <NavLink className="m-2" to={LOGIN_ROUTE}>Login</NavLink>
          <NavLink className="m-2" to={REGISTRATION_ROUTE}>Registration</NavLink>
        </Nav> } 
      </Container>
    </Navbar>
  )

})