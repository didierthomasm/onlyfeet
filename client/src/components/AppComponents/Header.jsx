import logo from '../../assets/img/Logos/logo-letters.png'
import {Navbar} from "./Navbar.jsx";
import styled from "styled-components";

const MainHeader = styled.header`
  display: flex;  
  flex-direction: column;
  justify-content: start;
  align-items: center;
  position: sticky;
  width: 8rem;
  min-height: 100vh;
  padding: 20px;
  background-color: #F8F8F8;
  border: .1rem solid #E5E5E5;
`

const Image = styled.img`
  width: 6.25rem;
`

export function Header() {
  return (
    <MainHeader>
        <Image src={logo} alt={'Logo'}/>
        <Navbar />
    </MainHeader>
  )
}