/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  StyledMainContent,
  OfficeView,
  OfficeCards,
  StyledButton,
  Row,
  StyledBanner,
  StyledFilterButton,
  StyledOfficesList,
  StyledListItems,
  StyledFilterOptions,
  StyledMaterialIcon,
  StyledListHeader,
  StyledListText,
  StyledDetailsButton,
  StyledSelect,
} from '../styles/Styled.jsx';
import data from '../tempOffices.json';

function Offices() {
  const [cities, setCities] = useState(data);

  const [cardView, setCardView] = useState(true);

  const [filterOption, setFilterOption] = useState('Alle');

  const redirectToDetailedPage = (e) => {
    console.log(e.target.name);
  };

  const updateView = (e) => {
    console.log(e.target.innerHTML);
    if (e.target.innerHTML === 'view_list') {
      setCardView(false);
    } else {
      setCardView(true);
    }
  };

  const filterOffices = (e) => {
    console.log(e.target.value);
    setFilterOption(e.target.value);
    console.log(filterOption);
  };

  return (
    <>
      <StyledBanner>
        <h1>Våre kontorer</h1>
      </StyledBanner>
      <StyledMainContent>
        <StyledFilterOptions>
          <StyledSelect readOnly value={filterOption} onChange={filterOffices}>
            <option value="Alle">Alle</option>
            <option value="Fredrikstad">Fredrikstad</option>
            <option value="Sarpsborg">Sarpsborg</option>
            <option value="Moss">Moss</option>
            <option value="Oslo">Oslo</option>
          </StyledSelect>
          {cardView ? (
            <>
              <StyledMaterialIcon primary className="material-icons">
                view_module
              </StyledMaterialIcon>
              <StyledMaterialIcon
                onClick={updateView}
                className="material-icons"
              >
                view_list
              </StyledMaterialIcon>
            </>
          ) : (
            <>
              <StyledMaterialIcon
                onClick={updateView}
                className="material-icons"
              >
                view_module
              </StyledMaterialIcon>
              <StyledMaterialIcon primary className="material-icons">
                view_list
              </StyledMaterialIcon>
            </>
          )}
        </StyledFilterOptions>
        {filterOption === 'Alle'
          ? cities.map((c) => (
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
                        <StyledDetailsButton
                          name={off.name}
                          to={`/office/${off.id}`}
                        >
                          Detaljer
                        </StyledDetailsButton>
                      </OfficeCards>
                    ))
                  ) : (
                    <StyledOfficesList>
                      {c.offices.map((off) => (
                        <StyledListItems>
                          <StyledListHeader>{off.name}</StyledListHeader>
                          <StyledListText>{off.adress}</StyledListText>
                          <StyledListText>{off.phone}</StyledListText>
                          <StyledListText>{off.email}</StyledListText>
                          <StyledDetailsButton name={off.name}>
                            Detaljer
                          </StyledDetailsButton>
                        </StyledListItems>
                      ))}
                    </StyledOfficesList>
                  )}
                </Row>
              </OfficeView>
            ))
          : cities.map((c) =>
              c.city === filterOption ? (
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
                          <StyledDetailsButton
                            name={off.name}
                            to={`/office/${off.id}`}
                          >
                            Detaljer
                          </StyledDetailsButton>
                        </OfficeCards>
                      ))
                    ) : (
                      <StyledOfficesList>
                        {c.offices.map((off) => (
                          <StyledListItems>
                            <StyledListHeader>{off.name}</StyledListHeader>
                            <StyledListText>{off.adress}</StyledListText>
                            <StyledListText>{off.phone}</StyledListText>
                            <StyledListText>{off.email}</StyledListText>
                            <StyledDetailsButton name={off.name}>
                              Detaljer
                            </StyledDetailsButton>
                          </StyledListItems>
                        ))}
                      </StyledOfficesList>
                    )}
                  </Row>
                </OfficeView>
              ) : (
                console.log('Easter Egg')
              )
            )}
      </StyledMainContent>
    </>
  );
}

export default Offices;
