import { NavLink } from 'react-router-dom';
import React from 'react';
import { StyledNav, NavMenu, NavMenuItem } from '../styles/Styled.jsx';
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
          <NavLink exact to="/">
            Hjem
          </NavLink>
          <NavLink exact to="/offices">
            Kontorer
          </NavLink>
          <NavLink exact to="/articles">
            Fagartikler
          </NavLink>
          <NavLink exact to="/contact">
            Kontakt
          </NavLink>
          <LoginLink />
        </NavMenuItem>
      </NavMenu>
    </StyledNav>
  );
}

export default Nav;
