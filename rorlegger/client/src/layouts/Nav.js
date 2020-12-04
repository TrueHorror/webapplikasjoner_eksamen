/* eslint-disable import/no-cycle */
import { NavLink } from 'react-router-dom';
import React from 'react';
import {
  StyledNav,
  NavMenu,
  NavMenuItem,
  StyledNavLink,
} from '../styles/Styled.jsx';
import { userIsLoggedIn } from '../utils/authentication';

function Nav() {
  const LoginLink = () => {
    if (!userIsLoggedIn()) {
      return (
        <NavLink exact to="/login">
          Logg inn
        </NavLink>
      );
    }
    return null;
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
          <LoginLink />
        </NavMenuItem>
      </NavMenu>
    </StyledNav>
  );
}

export default Nav;
