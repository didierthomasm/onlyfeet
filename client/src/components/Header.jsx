import logo from '../assets/img/Logos/patas-feas-fondo-circle.png'
import {Navbar} from "./Navbar.jsx";
import styled from "styled-components";

const Image = styled.img`
  width: 100px;
  height: 100px;
`

const MainHeader = styled.header`
  display: flex;  
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`

export function Header() {
  return (
    <MainHeader>
        <Image src={logo} alt={'Logo'}/>
        <Navbar />
    </MainHeader>
  )
}