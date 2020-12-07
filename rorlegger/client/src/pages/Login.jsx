/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  StyledMainContent,
  StyledLogin,
  StyledInput,
  StyledButton,
  StyledInputWrapper,
  StyledLabel,
} from '../styles/Styled';
import { loginRequest } from '../utils/apiCalls';
import { setToken } from '../utils/authentication';
import {
  commonErrorHandler,
  errorToaster,
  successToaster,
} from '../utils/global';

function Login() {
  const user = useSelector((state) => state.loggedInUser);

  if (user.email) {
    return <p>Du er logget inn</p>;
  } else {
    return (
      <StyledMainContent>
        <StyledLogin>
          <div style={{ width: '50%' }}>
            <StyledInputWrapper>
              <StyledLabel htmlFor="email-input">Epost</StyledLabel>
              <StyledInput id="email-input" type="email" />
            </StyledInputWrapper>
            <StyledInputWrapper>
              <StyledLabel HtmlFor="password-input">Passord</StyledLabel>
              <StyledInput id="password-input" type="password" />
            </StyledInputWrapper>
            <StyledButton onClick={loginAttempt}>Logg inn</StyledButton>
          </div>
          <div
            style={{
              width: '50%',
              borderLeft: 'solid 5px #009688',
              padding: '30px',
            }}
          >
            <Link to="/register">
              <StyledButton style={{ marginRight: '6vw' }}>
                Registrer deg
              </StyledButton>
            </Link>
          </div>
        </StyledLogin>
      </StyledMainContent>
    );
  }

  async function loginAttempt() {
    const email = document.querySelector('#email-input').value;
    const pw = document.querySelector('#password-input').value;
    // Validation
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      errorToaster('Ikke gyldig epost');
      return false;
    }

    let token;
    try {
      token = await loginRequest(email, pw);
      token = token.data.Token;
      setToken(token);
      successToaster('Du er logget inn');
    } catch (e) {
      if (!commonErrorHandler(e)) {
        if (e.response && e.response.status === 401) {
          errorToaster('Feil brukernavn/passord');
          console.error('Feil brukernavn/passord');
        } else {
          errorToaster('Innloggingen gikk galt, kontakt admin!');
          console.error(e);
        }
      }
    }
  }
}

export default Login;
