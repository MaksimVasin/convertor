import { makeAutoObservable } from "mobx"

/* interface IUserStore {
  _isAuth: Boolean
  _user: Boolean
} */

export default class UserStore {
  _isAuth: Boolean
  _user: any
  //_id: Number | null
  
  constructor() {
    this._isAuth = false
    this._user = null
    //this._id = null
    makeAutoObservable(this)
  }

  setIsAuth(auth: Boolean) { this._isAuth = auth }

  setUser(user: any) { this._user = user }

  //setId(id: Number) { this._id = id }

  get isAuth(): Boolean { return this._isAuth }

  get user(): any { return this._user }

  //get id(): Number | null { return this._id }
}