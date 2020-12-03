import './App.css';
import Nav from './layouts/Nav'
import { BrowserRouter as Router} from 'react-router-dom'
import Routes from './routes/Routes'
import Footer from './layouts/Footer'
import {StyledHeader, StyledFooter, StyledLogo } from './styles/Styled.jsx'


function App() {
  return (
    <div className="App">
  
      <Router>
        <StyledHeader>
        <StyledLogo>FG</StyledLogo>
          <Nav/>
        </StyledHeader>
        <Routes />
        <StyledFooter>
          <Footer />
        </StyledFooter>
        </Router>
    
    </div>
  );
}

export default App;
