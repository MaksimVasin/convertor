import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode"

export const registration = async (login: string, email: string, password: string) => {
  const {data} = await $host.post('api/user/registration', {login, email, password, role: 'ADMIN'})
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token);
}

export const login = async (login: string, email: string, password: string) => {
  const {data} = await $host.post('api/user/login', {login, email, password})
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token);
}

export const check = async () => {
  const {data} = await $authHost.get('api/user/auth')
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token);
}