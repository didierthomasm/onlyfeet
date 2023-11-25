import styled from 'styled-components';
import {LoginForm} from "../components/LoginSignupComponents/LoginForm.jsx";
import {SignupForm} from "../components/LoginSignupComponents/SignupForm.jsx";
import logo from "../assets/img/Logos/logo-letters.png";
import {above, below} from '../assets/style/Breakpoints'

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  max-width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
  ${above.mm`
    grid-template-columns: 1fr; // Change layout for small screens
  `}
  
  ${above.sm`
    grid-template-columns: 1fr; // Change layout for small screens
  `}

  ${above.md`
    grid-template-columns: 1fr 1fr; // Change layout for medium screens
  `}

  ${above.lg`
    grid-template-columns: 1fr 1fr; // Change layout for large screens
  `} \`;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${above.lg`
    position: relative;
    left: 10px;
  `}
`;

const Image = styled.img`
  height: 70%;
  object-fit: cover;
  margin: 0 auto;
  ${above.mm`
    height: 55%; // Adjust size for small screens
    width: 55%;
  `}
  
  ${above.sm`
    height: 58%; // Adjust size for small screens
    width: 58%;
  `}

  ${above.md`
    height: 60%; // Adjust size for medium screens
    width: 60%;
  `}

  ${above.lg`
    height: 70%; // Adjust size for large screens
  `} 
`;

const Slogan = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  color: #555;
  text-align: center; // Center the slogan text under the image
  margin: 0 auto; // Adjust the margin as needed
  margin-bottom: 20px;
  ${above.mm`
    font-size: 1rem; // Smaller font for small screens
  `}
  
  ${above.sm`
    font-size: 1.4rem; // Smaller font for small screens
  `}

  ${above.md`
    font-size: 1.5rem; // Default font for medium screens
  `}

  ${above.lg`
    font-size: 2rem; // Larger font for large screens
  `} \`;
`;

export function LoginSignup({setIsLoggedIn, mode}) {
  const isSignUp = mode === 'signup';

  return (
    <>
      <MainContainer>
        <LeftContainer>
          <Image src={logo}/>
          <Slogan>Step into Style:<br/> Where Every Footprint Tells a Story</Slogan>
        </LeftContainer>
        {isSignUp ? (
          <SignupForm setIsLoggedIn={setIsLoggedIn}/>
        ) : (
          <LoginForm setIsLoggedIn={setIsLoggedIn}/>
        )}
      </MainContainer>
    </>
  )
}