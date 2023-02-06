import { Container, Form, Card } from "react-bootstrap";
import { NavLink, useLocation } from 'react-router-dom'
import Button from "react-bootstrap/esm/Button";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

export function AuthPage(): JSX.Element {
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE

  return (
    <Container className="d-flex justify-content-center align-items-center mt-4">
      <Card style={{width: 500}} className="p-5">
        {
          isLogin ? 
          <h2 className="m-auto">Login</h2>
          :
          <h2 className="m-auto">Registration</h2>
        }
        
        <Form className="d-flex flex-column">
          <Form.Control className="mt-2" placeholder="login"/>
          <Form.Control className="mt-2" placeholder="email"/>
          <Form.Control className="mt-2" placeholder="password"/>
          {
            isLogin ? 
            <Button className="mt-2" variant="success">Login</Button>
            :
            <Button className="mt-2" variant="success">Registration</Button>
          }
          {
            isLogin && <NavLink to={REGISTRATION_ROUTE} className="m-auto mt-2">Registration</NavLink>
          }

        </Form>
      </Card>
    </Container>
  )
}