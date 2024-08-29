import styled, { css } from "styled-components"
import { get } from "lodash"

// Animations
import {
  openToClosed,
  closedToOpen,
  openToWide,
  wideToOpen,
  closedToWide,
  wideToClosed,
  bodyExpand,
  wideBodyExpand,
  bodyContract,
  wideBodyContract,
  duration
} from "./panel.animations"

export const HeaderComponentWrapper = styled.div`
  position: relative;
  padding: ${({ padding }) => padding || "3rem"};
  width: 100%;

  &:after {
    z-index: 51;
    content: "";
    width: 80rem;
    height: 4rem;
    border-top: ${({ theme }) => `1px solid ${get(theme, "tints.primary.blue.t20")}`};
    background: linear-gradient(180deg, #146483 0%, rgba(20, 100, 131, 0) 100%);
    position: absolute;
    left: ${({ status, padding }) => (status === "wide" ? `-${padding}` || "-3rem" : 0)};
    bottom: -4rem;
  }
  ${({ isDeleted }) =>
    isDeleted
      ? css`
          opacity: 0.5;
          color: "#BAD8E3";
          pointer-events: none;
        `
      : css`
          color: get(theme, "white", "white"));
        `}
`

export const BodyComponentWrapper = styled.div`
  padding: 3rem;

  ${({ isDeleted }) => {
    if (isDeleted) {
      return css`
        opacity: 0.5;
        pointer-events: none;
      `
    }
  }}
`

export const Wrapper = styled.div`
  width: 80rem;
  position: absolute;
  top: 7rem;
  bottom: 0;
  z-index: 3;
  height: calc(100% - 14rem);
  /* TODO: Define flyOutGradTop and flyOutGradBottom in 4c-elements */
  background: linear-gradient(180deg, #21879a 0%, #197da4 39.8%, #4a6db1 100%);
  color: ${({ theme }) => get(theme, "white")};

  /* Animations */
  ${({ panelStatus: nextStatus, prevPanelStatus: prevStatus }) => {
    // Closed > Open
    if (nextStatus === "open" && (prevStatus === "closed" || prevStatus === "open")) {
      return css`
        right: -40rem;
        animation: ${closedToOpen} ${duration / 2}ms ease-in-out;
      `
    }
    // Closed > Wide
    if (nextStatus === "wide" && prevStatus === "closed") {
      return css`
        right: -1rem;
        animation: ${closedToWide} ${duration / 2}ms ease-in-out;
      `
    }
    // Wide > Open
    if (nextStatus === "open" && prevStatus === "wide") {
      return css`
        right: -40rem;
        animation: ${wideToOpen} ${duration}ms ease-in-out;
      `
    }
    // Open > Wide
    if (nextStatus === "wide" && prevStatus === "open") {
      return css`
        right: -1rem;
        animation: ${openToWide} ${duration}ms ease-in-out;
      `
    }
    // Open > Closed
    if (nextStatus === "closed" && prevStatus === "open") {
      return css`
        right: -80rem;
        animation: ${openToClosed} ${duration / 2}ms ease-in-out;
      `
    }
    // Wide > Closed
    if (nextStatus === "closed" && prevStatus === "wide") {
      return css`
        right: -80rem;
        animation: ${wideToClosed} ${duration / 2}ms ease-in-out;
      `
    }
    // Closed > Closed - default state
    if (nextStatus === "closed" && prevStatus === "closed") {
      return css`
        right: -80rem;
      `
    }
  }}

  /* Scroll */
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: white;
    outline: 2px solid gray;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const CloseButton = styled.button`
  z-index: 6;
  border: none;
  background: transparent;
  color: ${({ theme }) => get(theme, "white")};
  width: 4rem;
  height: 4rem;
  font-size: 2.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 1rem;
  right: 1rem;

  &:focus {
    outline: none;
  }
`

export const BodyWrapper = styled.div`
  height: 100%;
  opacity: 1;
  width: 40rem;
  position: relative;

  ${({ scroll }) => {
    // Full scrolling
    if (scroll === "default") {
      return css`
        overflow-y: auto;
        overflow-x: hidden;
      `
    }
    // No scrolling
    if (scroll === "none") {
      return css`
        overflow-y: hidden;
      `
    }
  }}

  ${({ panelStatus: nextStatus, prevPanelStatus: prevStatus }) => {
    // Open > Wide
    if (nextStatus === "wide" && prevStatus === "open") {
      return css`
        opacity: 0;
        animation ${bodyExpand} ${duration}ms ease-in-out;
      `
    }
    // Wide > Open
    if (nextStatus === "open" && prevStatus === "wide") {
      return css`
        opacity: 1;
        animation: ${bodyContract} ${duration}ms ease-in-out;
      `
    }
    // Closed > Wide
    if (nextStatus === "wide" && prevStatus === "closed") {
      return css`
        opacity: 0;
      `
    }

    if (nextStatus === "closed" && prevStatus === "wide") {
      return css`
        opacity: 0;
      `
    }
  }}
`

export const WideBodyWrapper = styled.div`
  opacity: 1;
  width: 80rem;
  height: 100%;
  position: relative;

  ${({ scroll }) => {
    // Full scrolling
    if (scroll === "default") {
      return css`
        overflow-y: auto;
        overflow-x: hidden;
      `
    }
    // No scrolling
    if (scroll === "none") {
      return css`
        overflow-y: hidden;
      `
    }
  }}

  ${({ panelStatus: nextStatus, prevPanelStatus: prevStatus }) => {
    // Open > Wide
    if (nextStatus === "wide" && prevStatus === "open") {
      return css`
        opacity: 1;
        animation ${wideBodyExpand} ${duration}ms ease-in-out;
      `
    }
    // Closed > Wide
    if (nextStatus === "wide" && prevStatus === "closed") {
      return css`
        opacity: 1;
      `
    }
    // Wide > Open
    if (nextStatus === "open" && prevStatus === "wide") {
      return css`
        opacity: 0;
        animation: ${wideBodyContract} ${duration}ms ease-in-out;
      `
    }
    // Wide > Closed
    if (nextStatus === "closed" && prevStatus === "wide") {
      return css`
        opacity: 1;
      `
    }
    // Closed
    if (nextStatus === "closed" || nextStatus === "open") {
      return css`
        opacity: 0;
      `
    }
  }}
`
