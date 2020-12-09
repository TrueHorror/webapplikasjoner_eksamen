/* eslint-disable import/no-cycle */
import { NavLink } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  StyledNav,
  NavMenu,
  NavMenuItem,
  StyledNavLink,
  StyledUserInfo,
} from '../styles/Styled.jsx';
import Auth from '../utils/authentication';

function Nav() {
  const user = useSelector((state) => state.loggedInUser);

  const LoginArea = () => {
    const logoutUser = () => {
      Auth.userLogout().then(() => {
        window.location.reload();
      });
    };
    let userType = '';
    if (user.userType === 0) {
      userType = 'admin';
    } else if (user.userType === 1) {
      userType = 'bruker';
    } else if (user.userType === 2) {
      userType = 'ansatt';
    } else if (user.userType === 3) {
      userType = 'partner';
    } else {
      userType = 'ukjent';
    }

    if (!Auth.userIsLoggedIn()) {
      return (
        <NavLink exact to="/login">
          Logg inn
        </NavLink>
      );
    } else {
      return (
        <StyledUserInfo>
          <div>
            Logget inn som:{' '}
            <span style={{ fontWeight: '600' }}>{user.givenName}</span> (
            {userType})
          </div>
          <div>{user.email}</div>
          <button type="button" onClick={logoutUser}>
            Logg ut
          </button>
        </StyledUserInfo>
      );
    }
  };

  return (
    <StyledNav>
      <NavMenu>
        <NavMenuItem>
          <StyledNavLink exact to="/">
            Hjem
          </StyledNavLink>
          <StyledNavLink exact to="/offices">
            Kontorer
          </StyledNavLink>
          <StyledNavLink exact to="/articles">
            Fagartikler
          </StyledNavLink>
          <StyledNavLink exact to="/contact">
            Kontakt
          </StyledNavLink>
          <LoginArea />
        </NavMenuItem>
      </NavMenu>
    </StyledNav>
  );
}

export default Nav;
