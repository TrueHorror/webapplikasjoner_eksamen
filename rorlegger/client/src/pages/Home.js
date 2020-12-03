import {
  StyledBanner, 
  StyledMainContent, 
  StyledMainSections, 
  StyledAside, 
  Row, 
  Column, 
  DoubleColumn,
  StyledLinks
} from '../styles/Styled.jsx';

function Home(){
  return(
  <section>
    <StyledBanner>
      <h1>Velkommen til FG Rørleggerservice AS</h1>
    </StyledBanner>
    <StyledMainContent>
      <Row>
        <Column>
          <StyledAside><StyledLinks exact to="/offices">kontorer</StyledLinks></StyledAside>
        </Column>
        <DoubleColumn>
        <StyledMainSections><StyledLinks exact to="/contact">kontakt</StyledLinks></StyledMainSections> 
        </DoubleColumn>
      </Row>
      <Row>         
        <Column>
          <StyledMainSections>
            <StyledLinks exact to="/articles">Fagartikler</StyledLinks>
          </StyledMainSections> 
        </Column>
      </Row>
    </StyledMainContent>
  </section>

    
  )
}

export default Home