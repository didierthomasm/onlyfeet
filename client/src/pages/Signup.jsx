import { useState } from "react";
import { Eye, EyeClose } from '@styled-icons/remix-line';
import { Link } from "react-router-dom";
import {
  Main,
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
} from "../assets/style/Login-Signup/Login-Singup.js";

export function Signup() {
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

  return (
    <Main>
      <Form name={'signupForm'}>
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
        <NotLoggedIn>
          <NotLoggedInSpan>
            <span>Already have an account?</span>
            <ButtonLink onClick={(e) => {
              e.preventDefault()

            }}><Link to={'/login'}>Login</Link></ButtonLink>
          </NotLoggedInSpan>
        </NotLoggedIn>
      </Form>
    </Main>
  );
}
