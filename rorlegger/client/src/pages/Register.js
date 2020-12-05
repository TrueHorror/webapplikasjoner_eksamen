import React from 'react';
import {
  StyledBanner,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledMainContent,
  StyledButton,
} from '../styles/Styled';
import { errorToaster, successToaster } from '../utils/global';
import { registerUserRequest } from '../utils/apiCalls';

function Register() {
  const validate = () => {
    const givenName = document.querySelector('#givenName').value;
    const familyName = document.querySelector('#familyName').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const repeatedPassword = document.querySelector('#repeated-password').value;

    if (!givenName || !familyName || !email || !password || !repeatedPassword) {
      errorToaster('Du er nødt til å fylle ut alle feltene!');
      return false;
    }
    if (password !== repeatedPassword) {
      errorToaster('Passord ikke like!');
      return false;
    }
    if (password.length < 8) {
      errorToaster('Passord må være 8 tegn!');
      return false;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return false;
    }
    return true;
  };

  const registerUser = async () => {
    let payload;
    if (validate() === true) {
      payload = {
        GivenName: document.querySelector('#givenName').value,
        FamilyName: document.querySelector('#familyName').value,
        Email: document.querySelector('#email').value,
        Password: document.querySelector('#password').value,
      };
      try {
        await registerUserRequest(payload);
        successToaster('Bruker opprettet');
      } catch (e) {
        errorToaster('Noe gikk galt under opprettingen av brukerkontoen');
        console.error(e);
      }
    }
  };

  return (
    <>
      <StyledBanner>
        <h1>Registrer deg</h1>
      </StyledBanner>
      <StyledMainContent>
        <StyledForm>
          <StyledLabel htmlFor="name">Fornavn</StyledLabel>
          <StyledInput id="givenName" />
          <StyledLabel htmlFor="familyName">Etternavn</StyledLabel>
          <StyledInput id="familyName" />
          <StyledLabel htmlFor="email">Epost</StyledLabel>
          <StyledInput id="email" />
          <StyledLabel htmlFor="password">Passord (Minst 8 tegn)</StyledLabel>
          <StyledInput id="password" type="password" />
          <StyledLabel htmlFor="repeated-password">Gjenta passord</StyledLabel>
          <StyledInput id="repeated-password" type="password" />
          <StyledButton type="button" onClick={registerUser}>
            Registrer deg
          </StyledButton>
        </StyledForm>
      </StyledMainContent>
    </>
  );
}

export default Register;
