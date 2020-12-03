import React from 'react';
import { useDispatch } from "react-redux";
import {
  StyledMainContent,
  StyledLogin,
  StyledInput,
  StyledButton,
  StyledInputWrapper,
  StyledLabel,
} from '../styles/Styled';
import {loginRequest} from "../utils/apiCalls";
import {setToken, userIsLoggedIn} from "../utils/authentication";

function Login() {

  const dispatch = useDispatch()

  if (!userIsLoggedIn()) {
    return (
      <StyledMainContent>
        <StyledLogin>
          <div>
            <label htmlFor="email-input">
              Epost
              <StyledInput id="email-input" type="email"/>
            </label>
          </div>
          <StyledInputWrapper>
            <StyledLabel HtmlFor="password-input">
              Passord
              <StyledInput id="password-input" type="password"/>
            </StyledLabel>
          </StyledInputWrapper>
          <StyledButton onClick={loginAttempt}>Logg inn</StyledButton>
        </StyledLogin>
      </StyledMainContent>
    );
  } else {
    return <p>Du er logget inn</p>
  }

  async function loginAttempt(){
    let email = document.querySelector('#email-input').value
    let pw = document.querySelector('#password-input').value
    let token
    try {
      token = await loginRequest(email, pw)
      token = token.data.Token
      setToken(token)
    } catch (e) {
      if (e.response && e.response.status === 401){
        console.log('Feil brukernavn/passord')
      } else {
        console.error(e)
      }
    }
  }
}

export default Login;
