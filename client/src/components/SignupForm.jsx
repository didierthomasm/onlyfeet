import { useState } from "react";
import { Eye, EyeClose } from '@styled-icons/remix-line';
import { Link, useNavigate } from "react-router-dom";
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

export function SignupForm({setIsLoggedIn}) {
  // State hooks for input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Function to check if button should be disabled
  const isDisabled = email === '' || password === '' || name === '';

  // Function to handle password visibility
  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Function to navigate to home page
  const navigate = useNavigate();

  // Function to handle signup
  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    navigate('/')
  };

  return (
    <MainWrapper>
      <Form name={'signupForm'} onSubmit={handleSignup}>
        <Title>Sign Up</Title>
        <Input type="text" placeholder="Name" value={name} name={'name'} autoComplete={'name'}
               onChange={e => setName(e.target.value)} required />
        <Input type="email" placeholder="Email" value={email} name={'email'} autoComplete={'email'}
               onChange={e => setEmail(e.target.value)} required />
        <InputWrapper>
          <PasswordInput type={isPasswordVisible ? 'text' : 'password'} placeholder="Password" value={password}
                         onChange={e => setPassword(e.target.value)} required />
          <TogglePasswordVisibility onClick={e => {
            e.preventDefault()
            handlePasswordVisibility()
          }}>
            {isPasswordVisible ? <Eye size={24} /> : <EyeClose size={24} />}
          </TogglePasswordVisibility>
        </InputWrapper>
        <Button type="submit" disabled={isDisabled}>Login</Button>

        {/*Section if the user already has an account*/}
        <NotLoggedIn>
          <NotLoggedInSpan>
            <span>Already have an account?</span>
            <ButtonLink onClick={(e) => {
              e.preventDefault()
            }}><Link to={'/login'}>Login</Link></ButtonLink>
          </NotLoggedInSpan>
        </NotLoggedIn>
      </Form>
    </MainWrapper>
  );
}
