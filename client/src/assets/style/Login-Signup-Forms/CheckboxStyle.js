import styled from "styled-components";

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
  cursor: pointer;

  &:checked {
    background-color: cornflowerblue;
  }

  &:checked:after {
    content: '✔';
    font-size: 1.5rem;
    color: white;
    position: absolute;
    top: -2px;
    left: 3px;
  }
`;

export const CheckboxLabel = styled.label`
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }  
`;

export const ShowMoreText = styled.span`
  cursor: pointer;
  color: blue;
  &:hover {
    text-decoration: underline;
  }
`;