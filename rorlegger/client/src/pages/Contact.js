import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  StyledBanner,
  StyledMainContent,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledTextArea,
  StyledButton,
} from '../styles/Styled';
import { sendEmailRequest } from '../utils/apiCalls.js';
import { successToaster, commonErrorHandler } from '../utils/global';
import { userIsLoggedIn } from '../utils/authentication';

function Contact() {
  const user = useSelector((state) => state.loggedInUser);
  const history = useHistory();

  const [message, setMessage] = useState({
    GivenName: '',
    FamilyName: '',
    Email: '',
    Message: '',
  });

  const [messageReady, setMessageReady] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageReady(true);
  };

  const updateValue = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setMessage({
      ...message,
      GivenName: user.givenName,
      FamilyName: user.familyName,
      Email: user.email,
    });
  }, [user]);

  useEffect(() => {
    const sendMessageAtempt = async (body) => {
      if (messageReady) {
        try {
          await sendEmailRequest(body);
          successToaster('Melding mottatt!');

          history.push('/');
        } catch (e) {
          if (!commonErrorHandler(e)) {
            if (e.response && e.response.status === 400) {
              console.log(`Noe gikk galt med lagringen${e.response}`);
            } else {
              console.log(e);
            }
          }
        }
      }
    };
    sendMessageAtempt(message);
  }, [messageReady]);
  return (
    <>
      <StyledBanner>
        <h1>Kontakt oss gjerne</h1>
      </StyledBanner>
      <StyledMainContent>
        <StyledForm
          autoComplete="off"
          id="contactMessage"
          onSubmit={handleSubmit}
        >
          {userIsLoggedIn() ? (
            <>
              <StyledLabel htmlFor="GivenName">Fornavn:</StyledLabel>
              <StyledInput name="GivenName" value={user.givenName} disabled />
              <StyledLabel htmlFor="FamilyName">Etternavn:</StyledLabel>
              <StyledInput name="FamilyName" value={user.familyName} disabled />
              <StyledLabel htmlFor="Email">Epost:</StyledLabel>
              <StyledInput name="Email" value={user.email} disabled />
            </>
          ) : (
            <>
              <StyledLabel htmlFor="GivenName">Fornavn:</StyledLabel>
              <StyledInput
                name="GivenName"
                value={message.GivenName}
                onChange={updateValue}
              />
              <StyledLabel htmlFor="FamilyName">Etternavn:</StyledLabel>
              <StyledInput
                name="FamilyName"
                value={message.FamilyName}
                onChange={updateValue}
              />
              <StyledLabel htmlFor="Email">Epost:</StyledLabel>
              <StyledInput
                name="Email"
                value={message.Email}
                onChange={updateValue}
              />
            </>
          )}

          <StyledLabel htmlFor="Message">Melding:</StyledLabel>
          <StyledTextArea
            name="Message"
            value={message.Message}
            onChange={updateValue}
          />
          <StyledButton type="submit">Send melding</StyledButton>
        </StyledForm>
      </StyledMainContent>
    </>
  );
}

export default Contact;
