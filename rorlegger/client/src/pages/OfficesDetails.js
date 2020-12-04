/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  StyledMainContent,
  StyledDetailedOfficeView,
  WorkerCardsContainer,
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
  StyledMainSections,
} from '../styles/Styled.jsx';
import data from '../tempOffices.json';

function OfficesDetails() {
  const { id } = useParams();
  console.log(id);

  const [dataFromJson, setDataFromJson] = useState(data);

  let officeData;

  for (let i = 0; i < dataFromJson.length; i++) {
    for (let j = 0; j < dataFromJson[i].offices.length; j++) {
      if (dataFromJson[i].offices[j].id == id) {
        officeData = dataFromJson[i].offices[j];
        break;
      }
    }
  }

  return (
    <>
      <StyledBanner>
        <h1>Kontor {officeData.name}</h1>
      </StyledBanner>
      <StyledMainContent>
        <StyledDetailedOfficeView>
          <h2>Velkommen til {officeData.name}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed do
            eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum
            dolor sit amet, consectetur.
          </p>
        </StyledDetailedOfficeView>
        <StyledDetailedOfficeView>
          <h2>Våre ansatte</h2>
          <WorkerCardsContainer>
            {officeData.workers.map((worker) => (
              <OfficeCards>
                <figure />
                <p>{worker.workerName}</p>
                <p>{worker.possition}</p>
              </OfficeCards>
            ))}
          </WorkerCardsContainer>
        </StyledDetailedOfficeView>
        <StyledMainSections>
          <h1>Kontakt oss på {officeData.phone}</h1>
        </StyledMainSections>
      </StyledMainContent>
    </>
  );
}

export default OfficesDetails;
