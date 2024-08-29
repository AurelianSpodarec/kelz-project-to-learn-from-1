import styled, { css } from "styled-components"
import { Link } from "react-router-dom"
import { get } from "lodash"

export const PageWrapper = styled.div`
  background-color: ${({ theme }) => get(theme, "darkBlue")};
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: row wrap;
  position: relative;
  height: 100vh;
  width: 100vw;
`

export const Content = styled.main`
  transition: padding-right 0.25s ease-in-out;
  z-index: 1;
  border-radius: 0.3rem 0 0 0.3rem;
  overflow-y: auto;
  flex: 2 0px;

  ${({ isLoggedIn }) => {
    if (isLoggedIn) {
      return css`
        background-color: ${({ theme }) => get(theme, "white")};
        height: calc(100% - 14rem);
        width: calc(100% - 7.5rem);
      `
    }
  }}
`

// Navigation
export const NavWrapper = styled.nav`
  height: calc(100% - 14rem);
  width: 7.5rem;
  padding-top: 2rem;
`

export const NavButtons = styled.div`
  &:not(:hover) {
    svg {
      path {
        fill: ${({ theme }) => get(theme, "blue")};
      }
    }
  }

  &:hover > .nav-link {
    &:hover {
      color: ${({ theme }) => get(theme, "blue")};
    }
    &:not(:hover) {
      opacity: 0.25;
      svg {
        path {
          fill: ${({ theme }) => get(theme, "lightBlue")};
        }
      }
    }
  }
`

export const NavItemWrapper = styled.div`
  position: relative;
  transition: opacity 0.2s linear;
  z-index: 50;

  &:hover {
    & > .sub-nav {
      opacity: 1;
      left: 7rem;
    }
  }
`

export const SubNavWrapper = styled.div`
  background-color: ${({ theme }) => get(theme, "darkBlue")};
  position: absolute;
  top: 0;
  left: -23rem;
  width: 23rem;
  opacity: 0;
  transition: left 0s linear 0s, opacity 0.2s linear 0s;
`

export const navItemStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 7rem;
  text-decoration: none;
  transition: background-color 0.2s linear;
  color: inherit;

  &:hover {
    text-decoration: none;
    background-color: ${({ theme }) => get(theme, "blue")};

    & > .icon {
      svg {
        path {
          fill: ${({ theme }) => get(theme, "white")};
        }
      }
    }
  }
`

export const NavItemLink = styled(Link)`
  ${navItemStyles}
`

export const NavItemDiv = styled.div`
  ${navItemStyles}
`

const subNavItemStyles = css`
  display: flex;
  align-items: center;
  height: 5rem;
  color: ${({ theme }) => get(theme, "white")};
  font-size: 1.6rem;
  text-decoration: none;
  padding-left: 2rem;
  padding-right: 2rem;
  transition: background-color 0.2s linear;

  &:hover {
    text-decoration: none;
    background-color: ${({ theme }) => get(theme, "blue")};
  }
`

export const SubNavItemLink = styled(Link)`
  ${subNavItemStyles}
`

export const SubNavItemDiv = styled.div`
  ${subNavItemStyles}
`

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  transition: color 0.2s linear;
`

export const IconLabel = styled.label`
  color: ${({ theme }) => get(theme, "white")};
`

export const Overlay = styled.div`
  position: absolute;
  z-index: 40;
  width: calc(100vw - 7rem);
  background-color: transparent;
  transition: background-color 0.25s linear, opacity 0.25s linear;
  opacity: 0;

  ${({ panelStatus }) => {
    if (panelStatus === "wide" || panelStatus === "open") {
      return css`
        height: calc(100% - 14rem);
        background-color: ${({ theme }) => get(theme, "white")};
        opacity: 0.5;
        z-index: 42;
      `
    }
  }};
`
