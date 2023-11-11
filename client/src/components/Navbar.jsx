import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    padding: 0;
  }
  
  li {
    margin: 0 1rem;
  }
  
  a {
    text-decoration: none;
    color: #000;
  }
  
  a:hover {
    color: #333;
  }
`

export function Navbar() {
  return (
    <Nav>
      <ul>
        <li>
          <NavLink to={'/'}>Home</NavLink>
        </li>
        <li>
          <NavLink to={'/about'}>About</NavLink>
        </li>
        <li>
          <NavLink to={'/contact'}>Contact</NavLink>
        </li>
      </ul>
    </Nav>
  )
}