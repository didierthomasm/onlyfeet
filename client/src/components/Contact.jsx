import React, { useState } from 'react';

import { ContactContainer, Title, ContactForm, Input, TextArea, Button } from '../assets/style/Help-Contact/ContactStyle.js';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the form data to the backend
    console.log(formData);
  };

  return (
    <ContactContainer>
      <Title>Contact Us</Title>
      <ContactForm onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />
        <TextArea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
        />
        <Button type="submit">Send Message</Button>
      </ContactForm>
    </ContactContainer>
  );
}

export default Contact;
import { css } from 'styled-components';

const mediaQuery = css`
  @media (max-width: 768px) {
    /* Add your reduced screen styles here */
    /* For example: */
    padding: 10px;
    font-size: 14px;
  }
`;

ContactContainer = styled(ContactContainer)`
  ${mediaQuery}
`;
