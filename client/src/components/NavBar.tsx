import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import { Context } from "../index"

export const NavBar = observer(() => {

  const {user} = useContext(Context)

  return(
    <Navbar bg="success" variant="light">
      <Container>
        <Navbar.Brand href="/">Convertor</Navbar.Brand>
        { user._isAuth ? 
        <Nav className="ml-auto">
          <Nav.Link href="/admin">Admin</Nav.Link>
          {/* <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/registration">Registration</Nav.Link> */}
        </Nav>
        :
        <Nav className="ml-auto">
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/registration">Registration</Nav.Link>
        </Nav> } 
      </Container>
    </Navbar>
  )

})