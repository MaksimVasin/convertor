import { makeAutoObservable } from "mobx"

/* interface IUserStore {
  _isAuth: Boolean
  _user: Boolean
} */

export default class UserStore {
  _isAuth: Boolean
  _user: Boolean
  
  constructor() {
    this._isAuth = false
    this._user = false
    makeAutoObservable(this)
  }

  setIsAuth(auth: Boolean) { this._isAuth = auth }

  setUser(user: Boolean) { this._user = user }

  get isAuth(): Boolean { return this._isAuth }

  get user(): Boolean { return this._user }
}