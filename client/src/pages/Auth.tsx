import { Container, Form, Card } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import Button from "react-bootstrap/esm/Button";
import { CONVERTOR_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { useState, useContext } from 'react'
import { observer } from "mobx-react-lite"
import { Context } from "../index";

const AuthPage = observer(function(): JSX.Element {
  const {user} = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE

  const [userLogin, setUserLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const send = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(userLogin, email, password); // ?
        console.log('Логин')
      }
      else {
        data = await registration(userLogin, email, password); // ?
        console.log('Регистрация')
      }
      console.log('Кинул в стор', data)
      user.setUser(data)
      user.setIsAuth(true)
      navigate(CONVERTOR_ROUTE)
    }
    catch(e: any) {
      console.log(e)
      alert(e.response.message)
      //console.log(e.response.data.message)
      //alert(e)
    }
    
  }

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
          <Form.Control 
            className="mt-2"
            placeholder="login"
            value={userLogin}
            onChange={e => setUserLogin(e.target.value)}
          />
          <Form.Control
            className="mt-2"
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}  
          />
          <Form.Control
            className="mt-2"
            placeholder="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {
            isLogin ? 
            <Button className="mt-2" variant="success" onClick={send}>Login</Button>
            :
            <Button className="mt-2" variant="success" onClick={send}>Registration</Button>
          }
          {
            isLogin && <NavLink to={REGISTRATION_ROUTE} className="m-auto mt-2">Registration</NavLink>
          }

        </Form>
      </Card>
    </Container>
  )
})

export default AuthPage