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
  ModalBackdrop,
  ModalContainer,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "../assets/style/Login-Signup/Login-Singup.js";

export function Login() {
  // State hooks for input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Function to check if button should be disabled
  const isDisabled = email === '' || password === '';

  // Function to handle password visibility
  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Function to toggle modal visibility
  const toggleModal = () => setShowModal(!showModal);

  return (
    <Main>
      <Form name={'loginForm'}>
        <Title>Login</Title>
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
            <span>Don't have an account?</span>
            <ButtonLink onClick={(e) => {
              e.preventDefault()

            }}><Link to={'/signup'}>Sign up</Link></ButtonLink>
          </NotLoggedInSpan>
          <NotLoggedInSpan>
            <ButtonLink onClick={(e) => {
              e.preventDefault()
              toggleModal()
            }}>Forgot password?</ButtonLink>
          </NotLoggedInSpan>
        </NotLoggedIn>
      </Form>
      {showModal && (
        <ModalBackdrop onClick={toggleModal}> {/* Clicking on the backdrop will close the modal */}
          <ModalContainer onClick={e => e.stopPropagation()}> {/* Stops click from propagating to the backdrop */}
            <ModalHeader>RESTORE ACCESS</ModalHeader>
            <ModalBody>
              <p>If you have an OnlyFeet account, you will receive a password reset link to this e-mail.</p>
              <Input type="email" placeholder="Email" name={'emailForgot'} autoComplete={'email'} />
            </ModalBody>
            <ModalFooter>
              <Button onClick={toggleModal}>Cancel</Button>
              <Button>Send</Button>
            </ModalFooter>
          </ModalContainer>
        </ModalBackdrop>
      )}
    </Main>
  );
}
