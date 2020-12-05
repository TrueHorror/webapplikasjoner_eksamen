/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-cycle */
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Modal from './components/Modal';
import Nav from './layouts/Nav';
import Routes from './routes/Routes';
import Footer from './layouts/Footer';
import { StyledHeader, StyledFooter, StyledLogo } from './styles/Styled.jsx';

function App() {
  // from TODO obligen
  const [overlay, setOverlay] = useState(false);

  const handleOverlay = () => {
    setOverlay((so) => !so);
  };

  return (
    <div className="App">
      <Router>
        {overlay && <Modal handleOverlay={handleOverlay} />}
        <StyledHeader>
          <StyledLogo>FG</StyledLogo>
          <Nav />
        </StyledHeader>
        <Routes handleOverlay={handleOverlay} />
        <StyledFooter>
          <Footer />
        </StyledFooter>
      </Router>
    </div>
  );
}

export default App;
