/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewListIcon from '@material-ui/icons/ViewList';
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
} from '../styles/Styled.jsx';

function OfficesDetails() {
  return (
    <>
      <StyledBanner>
        <h1>Våre kontorer</h1>
      </StyledBanner>
      <StyledMainContent />
    </>
  );
}

export default OfficesDetails;
