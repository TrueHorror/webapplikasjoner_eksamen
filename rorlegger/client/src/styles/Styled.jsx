import { Link } from "react-router-dom"
import styled from "styled-components"

// Style and CSS taken from lectures and earlier mandatory exercises

// header
export const StyledHeader = styled.header`
  width: 100%;
  box-shadow: 0px 5px 5px -5px #00000029;
  display: flex;
`

// Styled Logo

export const StyledLogo = styled.h1`
  padding-left: 20px;
`

// Nav in header
export const StyledNav = styled.nav`
  margin-left: auto;
  margin-right: 0;
`

export const NavMenu = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
`

export const NavMenuItem = styled.li`
  padding: 0 20px;
  display: block;
  float: left;

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
`

// Banner, Logo
export const StyledBanner = styled.figure`
  width: 100%;
  margin: 0 auto;
  background-color: #dbdbdb;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`

// Main-Content with rom and column. Inspiration from: https://dev.to/drews256/ridiculously-easy-row-and-column-layouts-with-flexbox-1k01 -----------------------------------------------------------------
export const StyledMainContent = styled.main`
  margin: 0 auto;
  width: 70%;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  padding: 10px;
`

export const DoubleColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 2;
  padding: 10px;
`

export const StyledMainSections = styled.section`
  background-color: #dbdbdb;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`

// Aside
export const StyledAside = styled.aside`
  background-color: #dbdbdb;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`

// Main Links

export const StyledLinks = styled(Link)`
  font-size: 20px;
  text-decoration: none;
  color: #000;
  &:hover {
    border-bottom: 4px solid #469fb9;
  }
`

//------------------------------------------------------------------------------------------

// footer

export const StyledFooter = styled.footer`
  width: 100%;
  display: flex;
  box-shadow: 0 -5px 5px -5px #00000029;
  height: 30px;
`

export const StyledFooterList = styled.ul`
  list-style-type: none;
  margin: 0 auto;
  padding: 0;
`

export const StyledFooterListItems = styled.li`
  padding: 0 20px;
  display: block;
  float: left;
  justify-content: space-between;
`

export const OfficeCards = styled.div`
  border: 1px solid black;
  flex-wrap: wrap;
  padding: 10px;
  margin: 5px 5px;
`

export const OfficeView = styled.article`
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`

export const StyledButton = styled.button`
  color: black;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 1px solid #469fb9;
  border-radius: 3px;
  background: white;
  &:hover {
    background: #469fb9;
    color: white;
    cursor: pointer;
  }

  margin: 10px auto;
`

export const StyledFilterButton = styled(StyledButton)`
  background-color: #dbdbdb;
  border: none;
  border-radius: 0px;
`

// Loginpage

export const StyledLogin = styled.div`
  margin: 100px;
  label {
    width: 200px;
  }
`

export const StyledLabel = styled.label``

export const StyledInput = styled.input`
  border: 1px solid #469fb9;
  border-radius: 3px;
`

export const StyledInputWrapper = styled.div`
  ${StyledLabel}
`
