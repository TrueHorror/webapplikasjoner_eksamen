/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
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

function Tracking() {
  const [trackViews, setTrackViews] = useState();
  useEffect(() => {
    const getArticleViews = () => {};
    return () => {};
  }, []);
  return (
    <>
      <StyledBanner>
        <h1>Velkommen til FG Rørleggerservice AS</h1>
      </StyledBanner>
      <StyledMainContent />
    </>
  );
}

export default Tracking;
