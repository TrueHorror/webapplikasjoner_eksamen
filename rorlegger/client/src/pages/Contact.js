import React, { useState } from 'react';
import {
  StyledBanner,
  StyledMainContent,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledTextArea,
  StyledButton,
} from '../styles/Styled';

function Contact() {
  const [message, setMessage] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const updateValue = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  return (
    <>
      <StyledBanner>
        <h1>Våre kontorer</h1>
      </StyledBanner>
      <StyledMainContent>
        <StyledForm
          autoComplete="off"
          id="contactMessage"
          onSubmit={handleSubmit}
        >
          <StyledLabel htmlFor="name">Navn:</StyledLabel>
          <StyledInput
            name="name"
            value={message.name}
            onChange={updateValue}
          />
          <StyledLabel htmlFor="email">Epost:</StyledLabel>
          <StyledInput
            name="email"
            value={message.email}
            onChange={updateValue}
          />
          <StyledLabel htmlFor="message">Melding:</StyledLabel>
          <StyledTextArea
            name="message"
            value={message.message}
            onChange={updateValue}
          />
          <StyledButton>Send melding</StyledButton>
        </StyledForm>
      </StyledMainContent>
    </>
  );
}

export default Contact;
