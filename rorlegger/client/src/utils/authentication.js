import { store } from '../index'
import jwtDecode from "jwt-decode";


export function userIsLoggedIn(){
  let userData = store.getState()
  userData = userData.loggedInUser
  let now = Date.now()
  let expires = userData.expires*1000
  if (userData && expires && expires > now){
    return true
  }
  return false
}

export function userIsLoggedInAsAdmin(){
  let userData
  if (userIsLoggedIn()){
    userData = store.getState()
    if (userData.loggedInUser.userType === 0){
      return true
    }
  }
  return false
}

export function checkTokenInStorage(){
  let jwt = sessionStorage.getItem('token')
  if (!jwt){
    return
  }
  let token = jwtDecode(jwt)
  let now = Date.now()
  let exp = token.exp * 1000
  if (token && exp && exp > now){
    setToken(jwt)
  } else {

  }
}

export function setToken(token){
  sessionStorage.setItem('token', token)
  let decoded = jwtDecode(token);
  console.log(decoded)
  store.dispatch({type: 'USER_LOGGED_IN', data: {
      email: decoded.email,
      familyName: decoded.familyName,
      givenName: decoded.givenName,
      expires: decoded.exp,
      id: decoded.sub,
      userType: decoded.userType
    }})
}
