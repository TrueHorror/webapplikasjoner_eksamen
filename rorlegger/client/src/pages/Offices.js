import {
  StyledMainContent, 
  OfficeView, 
  OfficeCards, 
  StyledButton, 
  Row, 
  StyledBanner,
  StyledFilterButton} from '../styles/Styled.jsx';
import React, {useState} from 'react';
import data from './tempOffices.json';


function Offices(){
 

  const [cities, setCities] = useState(data);

  const [cardView, setCardView] = useState(true);

  //TODO: Få til funksjonalitet, ikoner for ListView og cardView, Sette opp ListView 

  const redirectToDetailedPage = (e) => {
    console.log(e.target.name);
  }

  
  return(
    <>
    <StyledBanner>
      <h1>Våre kontorer</h1>
    </StyledBanner>
    <StyledMainContent>
      <div>
      <StyledFilterButton>filter</StyledFilterButton>
      <button>card</button>
      <button>list</button>
      {cities.map((c) => (
        <OfficeView key={c.city}>
   
            <h2>{`${c.city} (${c.number} kontorer)`}</h2>
            <Row>
            {cardView ? (
              c.offices.map((off) => (
                <OfficeCards key={off.name}>
                    <h3>{off.name}</h3>
                    <p>{off.adress}</p>
                    <p>{off.phone}</p>
                    <p>{off.email}</p>
                    <StyledButton name={off.name} onClick={redirectToDetailedPage}>Detaljer</StyledButton>
                </OfficeCards>
              ))
            ):(
              <section>
                <p>List View</p>
              </section>
            )}
            </Row>

        </OfficeView>
      ))}
      </div>
    </StyledMainContent>
    </>
  )
}

export default Offices;