import styled from 'styled-components';
import {LoginForm} from "../components/LoginForm.jsx";
import {SignupForm} from "../components/SignupForm.jsx";
import logo from "../assets/img/Logos/logo-letters.png";

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  max-width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
`;

const Image = styled.img`  
  height: 80%;
  object-fit: cover;
  margin: 0 auto;
`

export function LoginSignup({setIsLoggedIn, mode}) {
  const isSignUp = mode === 'signup';

  return (
    <>
      <MainContainer>
        <Image src={logo}/>
        {isSignUp ? (
          <SignupForm setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        )}
      </MainContainer>
    </>
  )
}