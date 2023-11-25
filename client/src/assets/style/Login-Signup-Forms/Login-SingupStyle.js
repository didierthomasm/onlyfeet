import styled from "styled-components";
import {above, below} from "../Breakpoints.js";

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  ${above.lg`
    position: relative;
    right: 10px;
  `}
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #CCC;
  border-radius: 5px;
  ${above.mm`
    width: 235px;
  `}

  ${above.sm`
    width: 250px;
  `}

  ${above.md`
    width: 270px;
  `}

  ${above.lg`
    width: 300px;
  `}
`;

export const Title = styled.h4`
  margin: 0;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #CCC;
  border-radius: 5px;
`;

export const PasswordInput = styled(Input)`
  flex-grow: 1;
  border: none;

  &:focus {
    outline: none;
  }
`;

export const TogglePasswordVisibility = styled.button`
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  right: 0;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #CCC;
  border-radius: 5px;
`;

export const Button = styled.button`
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

export const NotLoggedIn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const NotLoggedInSpan = styled.span`
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
  ${below.sm`
    font-size: .9rem;
  `}
`;

export const ButtonLink = styled.button`
  background: none;
  border: none;
  color: cornflowerblue;
  text-decoration: none;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }
  ${below.sm`
    font-size: .9rem;
  `}
  
`;

export const ModalBackdrop = styled.div`
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

export const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  z-index: 100;
`;

export const ModalHeader = styled.h4`
  margin: 0;
  margin-bottom: 10px;
`;

export const ModalBody = styled.div`
  margin-bottom: 20px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;
