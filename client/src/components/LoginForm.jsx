import { useState } from "react";
import { Eye, EyeClose } from '@styled-icons/remix-line';
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
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
  ModalBackdrop,
  ModalContainer,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "../assets/style/Login-Signup-Forms/Login-SingupStyle.js";

import AuthService from "../utils/auth.js";

export function LoginForm({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isDisabled = formState.email === '' || formState.password === '';

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleModal = () => setShowModal(!showModal);

  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log("Form state updated:", formState);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Attempting to log in with:", formState);
    try {
      const response = await login({
        variables: { ...formState }
      });
      console.log("Login successful:", response);
      await AuthService.login(response.data.login.token);
      setIsLoggedIn(true);
      navigate('/profile'); // Redirect  after successful login
    } catch (e) {
      console.error("Login error:", e);
      // Optionally, you can add UI feedback for the user here
    }
  };

  return (
    <MainWrapper>
      <Form name={'loginForm'} onSubmit={handleLogin}>
        <Title>Login</Title>
        <Input 
          type="email" 
          placeholder="Email" 
          value={formState.email} 
          name={'email'} 
          autoComplete={'email'}
          onChange={handleChange} 
          required 
        />
        <InputWrapper>
          <PasswordInput 
            type={isPasswordVisible ? 'text' : 'password'} 
            placeholder="Password" 
            value={formState.password}
            name={'password'} 
            autoComplete={'current-password'}
            onChange={handleChange} 
            required 
          />
          <TogglePasswordVisibility onClick={e => {
            e.preventDefault();
            handlePasswordVisibility();
          }}>
            {isPasswordVisible ? <Eye size={24} /> : <EyeClose size={24} />}
          </TogglePasswordVisibility>
        </InputWrapper>
        <Button type="submit" disabled={isDisabled}>Login</Button>
        <NotLoggedIn>
          <NotLoggedInSpan>
            <span>Don't have an account?</span>
            <ButtonLink onClick={(e) => {
              e.preventDefault();
            }}><Link to={'/signup'}>Sign Up</Link></ButtonLink>
          </NotLoggedInSpan>
          <NotLoggedInSpan>
            <ButtonLink onClick={(e) => {
              e.preventDefault();
              toggleModal();
            }}>Forgot password?</ButtonLink>
          </NotLoggedInSpan>
        </NotLoggedIn>
      </Form>
      {showModal && (
        <ModalBackdrop onClick={toggleModal}>
          <ModalContainer onClick={e => e.stopPropagation()}>
            <ModalHeader>RESTORE ACCESS</ModalHeader>
            <ModalBody>
              <p>If you have an OnlyFeet account, you will receive a password reset link to this e-mail.</p>
              <Input 
                type="email" 
                placeholder="Email" 
                name={'emailForgot'} 
                autoComplete={'email'} 
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={toggleModal}>Cancel</Button>
              <Button>Send</Button>
            </ModalFooter>
          </ModalContainer>
        </ModalBackdrop>
      )}
    </MainWrapper>
  );
}
