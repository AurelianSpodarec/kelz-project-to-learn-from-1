import styled, { css, keyframes } from "styled-components"
import { get } from "lodash"
import { Link } from "react-router-dom"

/**
 * These animations broadly mirror the panel.animations.js file in the FlyOutPanel component
 * Animation style and duration should match those found in that file.
 */

const duration = 500

const openToClosed = keyframes`
  0% {
    width: calc(100vw - 47rem);
    right: 40rem;
  }
  100% {
    width: calc(100vw - 7rem);
    right: 0rem;
  }
`

const closedToOpen = keyframes`
  0% {
    width: calc(100vw - 7rem);
    right: 0rem;
  }
  100% {
    width: calc(100vw - 47rem);
    right: 40rem;
  }
`

const openToWide = keyframes`
  0% {
    width: calc(100vw - 47rem);
    right: 40rem;
  }
  50% {
    width: calc(100vw - 47rem);
    right: 40rem;
  }
  100% {
    width: calc(100vw - 87rem);
    right: 79rem;
  }
`

const wideToOpen = keyframes`
  0% {
    width: calc(100vw - 87rem);
    right: 79rem;
  }
  50% {
    width: calc(100vw - 87rem);
    right: 79rem;
  }
  100% {
    width: calc(100vw - 47rem);
    right: 40rem;
  }
`

const closedToWide = keyframes`
  0% {
    width: calc(100vw - 7rem);
    right: 0rem;
  }
  100% {
    width: calc(100vw - 87rem);
    right: 79rem;  
  }
`

const wideToClosed = keyframes`
  0% {
    width: calc(100vw - 87rem);
    right: 79rem;  
  }
  100% {
    width: calc(100vw - 7rem);
    right: 0rem;
  }
`

export const HeaderWrapper = styled.header`
  height: 7rem;
  width: 100%;
  display: flex;
  justify-content: space-between;

  &:after {
    content: "";
    position: absolute;
    top: 7rem;
    z-index: 2;
    height: 0.4rem;
    width: calc(100vw - 7.5rem);
    right: 0;
    background: ${({ theme }) =>
      `linear-gradient(45deg, rgba(255, 255, 255, 0) 0%, ${get(
        theme,
        "tints.primary.blue.t20"
      )} 50%, ${get(theme, "blue")} 100%)`};

    ${({ panelStatus: nextStatus, prevPanelStatus: prevStatus }) => {
      // Closed > Open
      if (nextStatus === "open" && prevStatus === "closed") {
        return css`
          right: 40rem;
          width: calc(100vw - 47rem);
          animation: ${closedToOpen} ${duration / 2}ms ease-in-out;
        `
      }
      // Closed > Wide
      if (nextStatus === "wide" && prevStatus === "closed") {
        return css`
          right: 79rem;
          width: calc(100vw - 87rem);
          animation: ${closedToWide} ${duration / 2}ms ease-in-out;
        `
      }
      // Wide > Open
      if (nextStatus === "open" && prevStatus === "wide") {
        return css`
          right: 40rem;
          width: calc(100vw - 47rem);
          animation: ${wideToOpen} ${duration}ms ease-in-out;
        `
      }
      // Open > Wide
      if (nextStatus === "wide" && prevStatus === "open") {
        return css`
          right: 79rem;
          width: calc(100vw - 87rem);
          animation: ${openToWide} ${duration}ms ease-in-out;
        `
      }
      // Open > Closed
      if (nextStatus === "closed" && prevStatus === "open") {
        return css`
          right: 0rem;
          width: calc(100vw - 7rem);
          animation: ${openToClosed} ${duration / 2}ms ease-in-out;
        `
      }
      // Wide > Closed
      if (nextStatus === "closed" && prevStatus === "wide") {
        return css`
          right: 0rem;
          width: calc(100vw - 7rem);
          animation: ${wideToClosed} ${duration / 2}ms ease-in-out;
        `
      }
      // Closed > Closed - default state
      if (nextStatus === "closed" && prevStatus === "closed") {
        return css`
          right: 0rem;
          width: calc(100vw - 7rem);
        `
      }
    }}
  }
`

export const Logo = styled.img`
  width: 7.8rem;
`
export const LogoWrapper = styled(Link)`
  height: 7rem;
  display: inline-flex;
  align-items: center;
  margin-left: 2rem;
`

export const SelfServiceWrapper = styled.div`
  display: flex;
`

export const UserInfoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 1rem;
  position: relative;
  cursor: pointer;
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: none;
  }

  &::after {
    content: "";
    position: absolute;
    width: 0.1rem;
    height: 4rem;
    background: ${({ theme }) => get(theme, "tints.secondary.darkBlue.t10", "white")};
    right: 0;
  }
`

export const WarningsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 1rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 0.1rem;
    height: 4rem;
    background: ${({ theme }) => get(theme, "tints.secondary.darkBlue.t10", "white")};
    right: 0;
  }
`

export const UserTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const Name = styled.p`
  color: ${({ theme }) => get(theme, "white", "white")};
  font-size: 1.4rem;
  letter-spacing: 0;
  line-height: 1.7rem;
  margin: 0;
`

export const Email = styled.p`
  color: ${({ theme }) => get(theme, "tints.secondary.darkBlue.t50", "white")};
  font-size: 1.3rem;
  line-height: 2rem;
  margin: 0;
`

export const NotificationsWrapper = styled.div`
  height: 100%;
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover,
  &:focus {
    opacity: 0.8;
  }

  &::after {
    content: "";
    position: absolute;
    width: 0.1rem;
    height: 4rem;
    background: ${({ theme }) => get(theme, "tints.secondary.darkBlue.t10", "white")};
    right: 0;
  }
`

export const NotificationsIcon = styled.div`
  position: relative;
  font-size: 3rem;
  height: 4rem;
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Indicator = styled.div`
  background: ${({ theme }) => get(theme, "red", "red")};
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  position: absolute;
  top: 1rem;
  right: 1.2rem;
`

export const LogoutWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 9rem;

  &:hover,
  &:focus {
    opacity: 0.8;
  }
`

export const LoadingWrapper = styled.div`
  width: 20rem;
`

export const SkeletonWrapper = styled.div`
  margin-bottom: 0.5rem;
`
