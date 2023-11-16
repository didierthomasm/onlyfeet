import styled from 'styled-components';

// Styled components
export const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  margin-top: 2rem;
`;

export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
`;

export const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const TextArea = styled.textarea`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 150px;
`;

export const Button = styled.button`
  padding: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Title = styled.h2`
  margin-bottom: 1rem;
`;