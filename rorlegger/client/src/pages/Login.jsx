import React from "react"
import {
  StyledMainContent,
  StyledLogin,
  StyledInput,
  StyledButton,
  StyledInputWrapper,
  StyledLabel,
} from "../styles/Styled"

function Login() {
  function login() {}

  return (
    <StyledMainContent>
      <StyledLogin>
        <div>
          <label htmlFor="email-input">
            Epost
            <StyledInput id="email-input" type="email" />
          </label>
        </div>
        <StyledInputWrapper>
          <StyledLabel HtmlFor="password-input">
            Passord
            <StyledInput id="password-input" type="password" />
          </StyledLabel>
        </StyledInputWrapper>
        <StyledButton onClick={login}>Logg inn</StyledButton>
      </StyledLogin>
    </StyledMainContent>
  )
}

export default Login
