import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

// Style and CSS taken from lectures and earlier mandatory exercises

// header
export const StyledHeader = styled.header`
  width: 100%;
  box-shadow: 0px 5px 5px -5px #00000029;
  display: flex;
  flex-wrap: wrap;
  @media only screen and (max-width: 550px) {
    flex-direction: column;
  }
`;

// Styled Logo

export const StyledLogo = styled.h1`
  padding-left: 20px;
  @media only screen and (max-width: 600px) {
    padding: 0;
    margin: 0 auto;
  }
`;

// Nav in header
export const StyledNav = styled.nav`
  margin-left: auto;
  margin-right: 0;

  @media only screen and (max-width: 800px) {
    margin: 0 auto;
  }
`;

export const NavMenu = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const NavMenuItem = styled.li`
  padding: 0 20px;
  display: block;
  float: left;
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: 550px) {
    padding: 0;
    flex-direction: column;
  }

  &:first-child {
    padding-left: 0;
  }

  & > a {
    color: black;
    font-size: 20px;
    font-weight: 700;
    line-height: 3.456;
    padding: 5px 10px;
    text-decoration: none;

    &.active {
      color: #469fb9;
    }

    &:hover {
      border-bottom: 4px solid #469fb9;
    }
  }
`;

export const StyledUserInfo = styled.div`
  border: 3px #00bcd4 dotted;
  margin: 5px;
  padding: 5px;
`;

// Banner, Logo
export const StyledBanner = styled.figure`
  width: 100%;
  margin: 0 auto;
  background-color: #dbdbdb;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
`;

// Main-Content with rom and column. Inspiration from: https://dev.to/drews256/ridiculously-easy-row-and-column-layouts-with-flexbox-1k01 -----------------------------------------------------------------
export const StyledMainContent = styled.main`
  margin: 0 auto;
  padding: 30px 0;
  width: 70%;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  padding: 10px;
`;

export const DoubleColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 2;
  padding: 10px;
`;

export const StyledMainSections = styled.section`
  background-color: #dbdbdb;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledOfficesList = styled.ol``;

export const StyledListItems = styled.li`
  display: flex;
  flex-direction: row;
`;

export const StyledListHeader = styled.h3`
  top: 0;
`;

export const StyledListText = styled.p`
  margin-left: 10px;
  top: 0;
`;

// Aside
export const StyledAside = styled.aside`
  background-color: #dbdbdb;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledNavLink = styled(NavLink)`
  @media only screen and (max-width: 600px) {
    font-size: 50px;
  }
`;

// Main Links

export const StyledLinks = styled(Link)`
  font-size: 20px;
  text-decoration: none;
  color: #000;
  &:hover {
    border-bottom: 4px solid #469fb9;
  }
`;

//------------------------------------------------------------------------------------------

// footer

export const StyledFooter = styled.footer`
  width: 100%;
  display: flex;
  box-shadow: 0 -5px 5px -5px #00000029;
  height: 30px;
`;

export const StyledFooterList = styled.ul`
  list-style-type: none;
  margin: 0 auto;
  padding: 0;
`;

export const StyledFooterListItems = styled.li`
  padding: 0 20px;
  display: block;
  float: left;
  justify-content: space-between;
`;

export const OfficeCards = styled.div`
  border: 1px solid black;
  flex-wrap: wrap;
  padding: 10px;
  margin: 5px 5px;
`;

export const OfficeView = styled.article`
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const StyledDetailedOfficeView = styled(OfficeView)`
  flex-direction: column;
  margin-bottom: 20px;
`;

export const StyledButton = styled.button`
  color: black;
  font-size: 1em;
  border: 1px solid #469fb9;
  background: white;
  &:hover {
    background: #469fb9;
    color: white;
    cursor: pointer;
  }
  margin: 10px auto;
  padding: 15px;
  margin-right: 10px;
  border: 2px #469fb9 solid;
`;

export const StyledDetailsButton = styled(Link)`
  color: black;
  font-size: 1em;
  margin: 10px;
  text-decoration: none;
  border: 1px solid #469fb9;
  border-radius: 3px;
  background: white;
  &:hover {
    background: #469fb9;
    color: white;
    cursor: pointer;
  }

  margin: 10px auto;
`;

export const StyledFilterOptions = styled.div`
  float: right;
`;

export const StyledFilterButton = styled(StyledButton)`
  background-color: #dbdbdb;
  border: none;
  border-radius: 0px;
  padding: 20px;
  font-weight: 600;
`;

export const StyledSelect = styled.select`
  background-color: #dbdbdb;
  border: none;
  border-radius: 0px;
  margin-bottom: 15px;
`;

export const StyledMaterialIcon = styled.i`
  margin: 5px;
  color: ${(props) => (props.primary ? '#469fb9' : 'black')};

  &:hover {
    cursor: pointer;
    color: #469fb9;
  }
`;

export const WorkerCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

// Loginpage

export const StyledLogin = styled.div`
  display: flex;
  margin: 100px;
  label {
    width: 200px;
  }
`;

export const StyledLabel = styled.label`
  display: inline-block;
  width: 100px;
`;

export const StyledInput = styled.input`
  border: 1px solid #469fb9;
  border-radius: 3px;
  margin-bottom: 15px;
  height: 30px;
`;

export const StyledInputWrapper = styled.div`
  ${StyledLabel}
`;

// Article list

export const StyledButtonGroupArticles = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledArticleListItem = styled.div`
  display: flex;
  max-height: 232px;
`;

export const StyledArticleListItemImage = styled.div`
  background-color: gray;
  width: 20rem;
  height: 12rem;
  margin: 20px;
`;

export const StyledArticleListItemContent = styled.div`
  width: 70%;
  text-align: left;
`;

// Form
export const StyledForm = styled.form`
  margin: 0 auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledTextArea = styled.textarea`
  resize: none;
  height: 200px;
`;
export const StyledArticleListItemContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledArticleListItemContentText = styled.div`
  max-height: 129px;
  overflow: hidden;
`;

export const StyledArticleListItemContentHeaderCategory = styled.div`
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Article page

export const StyledArticleContentDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
`;

export const StyledArticleContentDetailsWriter = styled.div``;

export const StyledArticleContentDetailsDate = styled.div``;

export const StyledArticleContentDetailsReadTime = styled.div``;

export const StyledRedButton = styled(StyledButton)`
  color: white;
  background-color: #e91e63;
  &:hover {
    background: #469fb9;
  }
`;

export const StyledGreenButton = styled(StyledButton)`
  color: white;
  background-color: #8bc34a;
  &:hover {
    background: #469fb9;
  }
`;

export const StyledAdminButtons = styled.div`
  text-align: left;
`;

export const StyledLinkButton = styled(Link)`
  color: black;
  font-size: 1em;
  margin-right: 10px;
  border: 1px solid #469fb9;
  text-decoration: none;
  &:hover {
    background: #469fb9;
    color: white;
    cursor: pointer;
  }

  background-color: #dbdbdb;
  border: none;
  border-radius: 0px;
  padding: 20px;
  font-weight: 600;
`;

export const StyledPaginateButton = styled(StyledButton)`
  padding: 5px;
  &.active {
    background: bisque;
  }
`;

export const StyledArticleHeader = styled.h1`
  color: #ecc2c2;
  /* mix-blend-mode: unset; */
  font-size: 2em;
  text-shadow: 1px 5px black;
`;

// Overlay Styling
export const StyledOverlay = styled.div`
  // Tatt fra TODO oblig og https://www.w3schools.com/howto/howto_css_overlay.asp
  position: fixed; /* Sit on top of the page content */
  display: flex; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
`;

export const StyledOverlayForm = styled(StyledForm)`
  // From TODO oblig
  display: flex;
  padding: 10px 20px 10px 20px;
  top: 195px;
  left: 520px;
  width: 326px;
  height: 378px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 1px 8px #00000029;
  border-radius: 8px;
  opacity: 1;
  margin: auto auto;
`;
