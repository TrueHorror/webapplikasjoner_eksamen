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
import { errorToaster, successToaster } from '../utils/global';

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
              <label htmlFor="email-input">
                Epost
                <StyledInput id="email-input" type="email" />
              </label>
            </StyledInputWrapper>
            <StyledInputWrapper>
              <StyledLabel HtmlFor="password-input">
                Passord
                <StyledInput id="password-input" type="password" />
              </StyledLabel>
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
              <StyledButton>Registrer deg</StyledButton>
            </Link>
          </div>
        </StyledLogin>
      </StyledMainContent>
    );
  }

  async function loginAttempt() {
    const email = document.querySelector('#email-input').value;
    const pw = document.querySelector('#password-input').value;
    let token;
    try {
      token = await loginRequest(email, pw);
      token = token.data.Token;
      setToken(token);
      successToaster('Du er logget inn');
    } catch (e) {
      if (e.response && e.response.status === 401) {
        errorToaster('Feil brukernavn/passord');
        console.log('Feil brukernavn/passord');
      } else {
        console.error(e);
      }
    }
  }
}

export default Login;
