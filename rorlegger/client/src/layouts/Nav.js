import { NavLink } from 'react-router-dom';
import { StyledNav, NavMenu, NavMenuItem } from '../styles/Styled.jsx';

function Nav() {
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
          <NavLink exact to="/login">
            Log in
          </NavLink>
        </NavMenuItem>
      </NavMenu>
    </StyledNav>
  );
}

export default Nav;
