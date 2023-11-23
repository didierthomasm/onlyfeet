import {useState} from "react";
import {Eye, EyeClose} from '@styled-icons/remix-line';
import {Link} from "react-router-dom";

// Items for creating a new user
import {useMutation} from "@apollo/client";
import {ADD_USER} from "../../utils/mutations.js";
import Auth from '../../utils/auth.js';

// Checkbox element for terms and conditions
import TermsCheckbox from "./TermsCheckbox.jsx";
import {
  Button,
  ButtonLink,
  Form,
  Input,
  InputWrapper,
  MainWrapper,
  NotLoggedIn,
  NotLoggedInSpan,
  PasswordInput,
  Title,
  TogglePasswordVisibility,
} from "../../assets/style/Login-Signup-Forms/Login-SingupStyle.js";

export function SignupForm() {
  // State hooks for input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [addUser, {error, data}] = useMutation(ADD_USER);
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Function to check if button should be disabled
  const isDisabled = email === '' || password === '' || firstName === '' || termsAndConditions === false;

  // Function to handle password visibility
  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Function to handle signup
  const handleSignup = async (event) => {
    event.preventDefault();
    console.log({email, firstName, lastName, username, password});

    try {
      const {data} = await addUser({
        variables: {...{email, firstName, lastName, username, password}},
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainWrapper>
      {data ? (
        <p>
          Success! You may now head{' '}
          <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
        <Form name={'signupForm'} onSubmit={handleSignup}>
          <Title>Sign Up</Title>

          <Input type="text" placeholder="First Name" value={firstName} name={'firstName'} autoComplete={'first name'}
                 onChange={e => setFirstName(e.target.value)} required/>

          <Input type="text" placeholder="Last Name" value={lastName} name={'lastName'} autoComplete={'last name'}
                 onChange={e => setLastName(e.target.value)} required/>

          <Input type="text" placeholder="Username" value={username} name={'username'} autoComplete={'username'}
                 onChange={e => setUsername(e.target.value)} required/>

          <Input type="email" placeholder="Email" value={email} name={'email'} autoComplete={'email'}
                 onChange={e => setEmail(e.target.value)} required/>

          <InputWrapper>
            <PasswordInput type={isPasswordVisible ? 'text' : 'password'} placeholder="Password" value={password}
                            name={'password'} autoComplete={'password'}
                           onChange={e => setPassword(e.target.value)} required/>
            <TogglePasswordVisibility onClick={e => {
              e.preventDefault()
              handlePasswordVisibility()
            }}>
              {isPasswordVisible ? <Eye size={24}/> : <EyeClose size={24}/>}
            </TogglePasswordVisibility>
          </InputWrapper>
          <TermsCheckbox
            termsAndConditions={termsAndConditions}
            setTermsAndConditions={setTermsAndConditions}
          />
          <Button type="submit" disabled={isDisabled}>Sign Up</Button>
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
      )}
      {error && (
        <div className="my-3 p-3 bg-danger text-white">
          {error.message}
        </div>
      )}
    </MainWrapper>
  );
}
