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
  height: 70%;
  object-fit: cover;
  margin: 0 auto;
`

const Slogan = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  color: #555;
  text-align: center; // Center the slogan text under the image
  margin: 0 auto; // Adjust the margin as needed
  margin-bottom: 20px;
`;

export function LoginSignup({setIsLoggedIn, mode}) {
  const isSignUp = mode === 'signup';
  console.log(setIsLoggedIn)
  return (
    <>
      <MainContainer>
        {/*<div>*/}
        <Image src={logo}/>
        {/*<Slogan>"Step into Style:<br/> Where Every Footprint Tells a Story"</Slogan>*/}
        {/*</div>*/}
        {isSignUp ? (
          <SignupForm setIsLoggedIn={setIsLoggedIn}/>
        ) : (
          <LoginForm setIsLoggedIn={setIsLoggedIn}/>
        )}
      </MainContainer>
    </>
  )
}