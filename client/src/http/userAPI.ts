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

export const addUserImage = async (id: Number, filename: string, dataSVG: string, dataPNG: string) => {
  const {data} = await $authHost.post(`api/user/${id}/createImage`, {filename, dataSVG, dataPNG})
  console.log(data)
  return data
}

export const deleteUserImage = async(userId: Number, imageId: Number) => {
  await $authHost.delete(`api/user/${userId}/images/${imageId}`)
}