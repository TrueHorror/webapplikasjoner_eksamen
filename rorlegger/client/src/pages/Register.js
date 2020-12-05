import React from 'react';
import {
  StyledBanner,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledMainContent,
} from '../styles/Styled';

function Register() {
  return (
    <>
      <StyledBanner>
        <h1>Registrer deg</h1>
      </StyledBanner>
      <StyledMainContent>
        <StyledForm>
          <StyledLabel htmlFor="name">Fornavn:</StyledLabel>
          <StyledInput id="givenName" />
          <StyledLabel htmlFor="familyName">Etternavn:</StyledLabel>
          <StyledInput id="familyName" />
          <StyledLabel htmlFor="email">Epost</StyledLabel>
          <StyledInput id="email" />
        </StyledForm>
      </StyledMainContent>
    </>
  );
}

export default Register;
