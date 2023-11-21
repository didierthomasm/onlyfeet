import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import TermsCheckbox from "./TermsCheckbox.jsx";
import { Eye, EyeClose } from '@styled-icons/remix-line';
import {
  MainWrapper,
  Form,
  Title,
  Input,
  PasswordInput,
  TogglePasswordVisibility,
  InputWrapper,
  Button,
  NotLoggedIn,
  NotLoggedInSpan,
  ButtonLink,
} from "../assets/style/Login-Signup-Forms/Login-SingupStyle.js";

import AuthService from "../utils/auth.js";

export function SignupForm({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [addUser] = useMutation(ADD_USER);

  // Function to check if button should be disabled
  const isDisabled = email === '' || password === '' || firstName === '' || lastName === '' || !termsAndConditions;

  // Function to handle password visibility
  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  //navigate home
  

  // Function to handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Signup attempt with:", { firstName, lastName, email, password });
    
    try {
      const response = await addUser({
        variables: {
          firstName,
          lastName,
          email,
          password,
          // Include other fields check with schemas
        }
      });
      console.log("Signup successful, response:", response);

      await AuthService.login(response.data.addUser.token);
      //console.log("Logged in with token:", response.data.addUser.token);

      setIsLoggedIn(true);
      console.log("Set isLoggedIn to true");

      navigate('/profile');
      console.log("Navigated to root '/'");
      
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <MainWrapper>
      <Form name={'signupForm'} onSubmit={handleSignup}>
        <Title>Sign Up</Title>
        <Input type="text" placeholder="First Name" value={firstName} name={'firstName'}
               onChange={e => setFirstName(e.target.value)} required />
        <Input type="text" placeholder="Last Name" value={lastName} name={'lastName'}
               onChange={e => setLastName(e.target.value)} required />
        <Input type="email" placeholder="Email" value={email} name={'email'} autoComplete={'email'}
               onChange={e => setEmail(e.target.value)} required />
        <InputWrapper>
          <PasswordInput type={isPasswordVisible ? 'text' : 'password'} placeholder="Password" value={password}
                         onChange={e => setPassword(e.target.value)} required />
          <TogglePasswordVisibility onClick={e => {
            e.preventDefault();
            handlePasswordVisibility();
          }}>
            {isPasswordVisible ? <Eye size={24} /> : <EyeClose size={24} />}
          </TogglePasswordVisibility>
        </InputWrapper>
        <TermsCheckbox
          termsAndConditions={termsAndConditions}
          setTermsAndConditions={setTermsAndConditions}
        />
        <Button type="submit" disabled={isDisabled}>Sign Up</Button>
        <NotLoggedIn>
          <NotLoggedInSpan>
            <span>Already have an account?</span>
            <ButtonLink onClick={(e) => {
              e.preventDefault();
            }}><Link to={'/login'}>Login</Link></ButtonLink>
          </NotLoggedInSpan>
        </NotLoggedIn>
      </Form>
    </MainWrapper>
  );
}
