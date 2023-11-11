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
               onChange={e => setEmail(e.target.value)} required />
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
