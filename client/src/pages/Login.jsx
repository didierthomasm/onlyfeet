import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

const Input = styled.input`
  padding: 10px;
  border: 1px solid #CCC;
  border-radius: 5px;
`;

const Title = styled.h4`
  margin: 0;
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
    &:hover {
      text-decoration: underline;
    }
  }
`;
export function Login() {
  // State hooks for input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to check if button should be disabled
  const isDisabled = email === '' || password === '';

  return (
    <Main>
      <Form>
        <Title>Login</Title>
        <Input type="email" placeholder="Email" value={email} name={'email'} autoComplete={'email'}
               onChange={e => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} name={'password'} autoComplete={'current-password'}
               onChange={e => setPassword(e.target.value)} required />
        <Button type="submit" disabled={isDisabled}>Login</Button>
        <NotLoggedIn>
          <NotLoggedInSpan>
            <span>Don't have an account?</span> <a href={'/signup'}>Sign up</a>
          </NotLoggedInSpan>
          <NotLoggedInSpan>
            <a href={'/forgot-password'}>Forgot password?</a>
          </NotLoggedInSpan>
        </NotLoggedIn>
      </Form>
    </Main>
  );
}
