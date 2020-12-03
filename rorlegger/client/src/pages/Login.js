import {StyledMainContent, StyledLogin, StyledInput, StyledButton} from "../styles/Styled";

function Login(){

  function login(){
    console.log('logg inn')
  }

  return (
    <StyledMainContent>
      <StyledLogin>
        <div>
          <label>Epost</label>
          <StyledInput type="email"/>
        </div>
        <div>
          <label>Passord</label>
          <StyledInput type="password"/>
        </div>
        <StyledButton onClick={login}>Logg inn</StyledButton>
      </StyledLogin>
    </StyledMainContent>
  )
}

export default Login
