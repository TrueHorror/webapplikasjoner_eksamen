/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  StyledTopTenLink,
} from '../styles/Styled.jsx';
import {
  getTrackingDataViews,
  getTrackingDataTopTen,
  getTrackingDataViewsPerUser,
} from '../utils/apiCalls';
import { commonErrorHandler, errorToaster } from '../utils/global';

function Tracking() {
  const [trackViewData, setTrackViewData] = useState('');
  const [totalViews, setTotalViews] = useState(0);

  const [trackTopTenData, setTrackTopTenData] = useState('');

  const [trackUserViewsData, setTrackUserViewsData] = useState('');

  // Total views data
  useEffect(() => {
    const getArticleViews = async () => {
      try {
        const res = await getTrackingDataViews();
        setTrackViewData(res.data);
      } catch (e) {
        if (!commonErrorHandler(e)) {
          errorToaster('Noe gikk galt under henting av data');
          console.error(e);
        }
      }
    };
    getArticleViews();
  }, []);

  // Count total views
  useEffect(() => {
    if (trackViewData) {
      let total = 0;
      trackViewData.views.forEach((art) => {
        total += art.Count;
      });
      setTotalViews(total);
    }

    console.log(trackViewData.views);
  }, [trackViewData]);

  // Top Ten Articles
  useEffect(() => {
    const getArticleViews = async () => {
      try {
        const res = await getTrackingDataTopTen();
        setTrackTopTenData(res.data);
      } catch (e) {
        if (!commonErrorHandler(e)) {
          errorToaster('Noe gikk galt under henting av data');
          console.error(e);
        }
      }
    };
    getArticleViews();
  }, []);

  // Views per user
  useEffect(() => {
    const getArticleViews = async () => {
      try {
        const res = await getTrackingDataViewsPerUser();
        setTrackUserViewsData(res.data);
      } catch (e) {
        if (!commonErrorHandler(e)) {
          errorToaster('Noe gikk galt under henting av data');
          console.error(e);
        }
      }
    };
    getArticleViews();
  }, []);

  // Count per user
  useEffect(() => {
    console.log(trackUserViewsData);
  }, [trackUserViewsData]);
  return (
    <>
      <StyledBanner>
        <h1>User tracking</h1>
      </StyledBanner>
      <StyledMainContent>
        <h2>Totale visninger: {totalViews}</h2>
        <h2>Top 10 Artikler med visninger:</h2>
        <StyledOfficesList>
          <StyledListItems style={{ flexDirection: 'column' }}>
            {trackTopTenData ? (
              trackTopTenData.views.map((art) => (
                <StyledTopTenLink
                  to={{ pathname: `/article/${art._id}` }}
                  style={{
                    fontSize: '20px',
                    textDecoration: 'none',
                    color: 'black',
                    hover: { cursor: 'pointer' },
                  }}
                >
                  {`${art.Title}: ${art.Count}`}
                </StyledTopTenLink>
              ))
            ) : (
              <span />
            )}
          </StyledListItems>
        </StyledOfficesList>
        <h2>Brukere og antall artikler lest:</h2>
        <StyledOfficesList>
          <StyledListItems style={{ flexDirection: 'column' }}>
            {trackUserViewsData ? (
              trackUserViewsData.views.map((usr) => (
                <StyledListText>
                  {`${usr.GivenName} ${usr.FamilyName}: ${usr.Count}`}
                </StyledListText>
              ))
            ) : (
              <span />
            )}
          </StyledListItems>
        </StyledOfficesList>
      </StyledMainContent>
    </>
  );
}

export default Tracking;
