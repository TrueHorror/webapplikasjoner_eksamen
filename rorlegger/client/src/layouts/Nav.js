import { NavLink } from 'react-router-dom'

function Nav(){
  return (
    <nav>
      <NavLink to="/">Hjem</NavLink>
      <NavLink to="/offices">Kontorer</NavLink>
      <NavLink to="/articles">Fagartikler</NavLink>
      <NavLink to="/contact">Kontakt</NavLink>
    </nav>
  )
}

export default Nav;