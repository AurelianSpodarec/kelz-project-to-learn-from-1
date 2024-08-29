import styled, { css, keyframes } from "styled-components"
import { get } from "lodash"

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

export const FooterWrapper = styled.footer`
  height: 7rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

  &:before {
    position: absolute;
    content: "";
    background: ${({ theme }) =>
      `linear-gradient(45deg, rgba(255, 255, 255, 0) 0%, ${get(
        theme,
        "tints.primary.blue.t20"
      )} 50%, ${get(theme, "blue")} 100%)`};
    height: 0.4rem;
    width: calc(100vw - 7.5rem);
    right: 0;
    bottom: 7rem;
    z-index: 2;

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
export const FooterText = styled.p`
  color: ${({ theme }) => get(theme, "faintGrey")};
  margin: 0;
  font-size: 1.2rem;
`
