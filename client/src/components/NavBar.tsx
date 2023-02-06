import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { Container, Navbar, Nav, Button } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import { Context } from "../index"
import { ADMIN_ROUTE, CONVERTOR_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts"

export const NavBar = observer(() => {

  const {user} = useContext(Context)
  const navigate = useNavigate()

  return(
    <Navbar bg="dark" variant="light">
      <Container>
        <NavLink to={CONVERTOR_ROUTE}>Convertor</NavLink>
        { user._isAuth ? 
        <Nav className="ml-auto">
          <NavLink className="m-2" to={ADMIN_ROUTE}>Admin</NavLink>
          <Button onClick={() => navigate(LOGIN_ROUTE)}>Выйти</Button>
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