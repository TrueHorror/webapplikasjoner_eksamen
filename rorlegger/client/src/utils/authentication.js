import jwtDecode from 'jwt-decode';
import Store from './store';

const Auth = {
  userIsLoggedIn: () => {
    let userData = Store.getState();
    userData = userData.loggedInUser;
    const now = Date.now();
    if (userData && userData.expires) {
      const expires = userData.expires * 1000;
      if (userData && expires && expires > now) {
        return true;
      }
    }
    return false;
  },

  userIsLoggedInAsAdmin: () => {
    let userData;
    if (Auth.userIsLoggedIn()) {
      userData = Store.getState();
      if (userData.loggedInUser.userType === 0) {
        return true;
      }
    }
    return false;
  },

  setToken: (token) => {
    sessionStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    console.log(decoded);
    Store.dispatch({
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
  },

  checkTokenInStorage: () => {
    const jwt = sessionStorage.getItem('token');
    if (!jwt) {
      return;
    }
    const token = jwtDecode(jwt);
    const now = Date.now();
    const exp = token.exp * 1000;
    if (token && exp && exp > now) {
      Auth.setToken(jwt);
    }
  },

  userLogout: async () => {
    await sessionStorage.setItem('token', '');
    Store.dispatch({ type: 'USER_LOGOUT' });
  },
};

export default Auth;
