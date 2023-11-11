import { useState } from "react";
import styled from "styled-components";
import { Eye, EyeClose } from '@styled-icons/remix-line';
import { Link } from "react-router-dom";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #CCC;
  border-radius: 5px;
`;

const Title = styled.h4`
  margin: 0;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #CCC;
  border-radius: 5px;
`;

const PasswordInput = styled(Input)`
  flex-grow: 1;
  border: none;
  &:focus {
    outline: none;
  }
`;

const TogglePasswordVisibility = styled.button`
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  right: 0;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #CCC;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007BFF;
  color: white;
  cursor: pointer;
  &:disabled {
    background-color: #CCC;
    cursor: default;
  }
`;

const NotLoggedIn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const NotLoggedInSpan = styled.span`
  color: cornflowerblue;
  span {
    color: #333;
  }
  a {
    color: cornflowerblue;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ButtonLink = styled.button`
  background: none;
  border: none;
  color: cornflowerblue;
  text-decoration: none;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  z-index: 100;
`;

const ModalHeader = styled.h4`
  margin: 0;
  margin-bottom: 10px;
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

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
