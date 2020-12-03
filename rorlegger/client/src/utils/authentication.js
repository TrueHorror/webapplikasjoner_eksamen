/* eslint-disable import/no-cycle */
import jwtDecode from 'jwt-decode';
import { store } from '../index';

export function userIsLoggedIn() {
  let userData = store.getState();
  userData = userData.loggedInUser;
  const now = Date.now();
  const expires = userData.expires * 1000;
  if (userData && expires && expires > now) {
    return true;
  }
  return false;
}

export function userIsLoggedInAsAdmin() {
  let userData;
  if (userIsLoggedIn()) {
    userData = store.getState();
    if (userData.loggedInUser.userType === 0) {
      return true;
    }
  }
  return false;
}

export function setToken(token) {
  sessionStorage.setItem('token', token);
  const decoded = jwtDecode(token);
  console.log(decoded);
  store.dispatch({
    type: 'USER_LOGGED_IN',
    data: {
      email: decoded.email,
      familyName: decoded.familyName,
      givenName: decoded.givenName,
      expires: decoded.exp,
      id: decoded.sub,
      userType: decoded.userType,
    },
  });
}

export function checkTokenInStorage() {
  const jwt = sessionStorage.getItem('token');
  if (!jwt) {
    return;
  }
  const token = jwtDecode(jwt);
  const now = Date.now();
  const exp = token.exp * 1000;
  if (token && exp && exp > now) {
    setToken(jwt);
  }
}