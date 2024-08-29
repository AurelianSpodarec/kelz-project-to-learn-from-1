import styled, { css } from "styled-components"
import { get } from "lodash"
import { Input } from "@4cplatform/elements/Forms"

export const Wrapper = styled.div`
  position: relative;
  margin: ${({ margin }) => margin};
`

export const StyledInput = styled(Input)`
  ${({ isOpen }) => {
    if (isOpen) {
      return css`
        border: 1px solid ${({ theme }) => get(theme, "blue", "black")};
        border-radius: 0.3rem 0.3rem 0 0;
        border-bottom: none;
        padding-bottom: 0.1rem;
        &:hover,
        &:focus {
          border: 1px solid ${({ theme }) => get(theme, "blue", "black")};
          border-radius: 0.3rem 0.3rem 0 0;
          border-bottom: none;
        }
      `
    }
  }}
`

export const DropWrapper = styled.div`
  position: absolute;
  top: ${({ hasError }) => (hasError ? "calc(100% - 2.5rem)" : "100%")};
  border: 1px solid ${({ theme }) => theme.blue};
  background: ${({ theme }) => get(theme, "white")};
  border-top: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 9;
  overflow-y: scroll;
  max-height: 40rem;

  ${({ labelWidth, margin }) => `
    ${labelWidth ? `width: calc(100% - ${labelWidth});` : ""}
    ${margin ? `margin: ${margin};` : ""}
  `}
`

export const DropOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 8;
  background-color: ${({ overlayBg }) => overlayBg || "transparent"};
  opacity: ${({ transparent }) => transparent};
  width: 100%;
  height: 100%;
`

export const Item = styled.button`
  height: ${({ suggestion }) => (get(suggestion, "subHeader", false) ? "6rem" : "5rem")};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.5rem;
  background: transparent;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  border-top: 1px solid ${({ theme }) => get(theme, "faintGrey")};
  color: ${({ theme }) => get(theme, "blue", "blue")};
  font-weight: bold;
  transition: background-color 0.2s linear, color 0.2s linear;

  &:focus,
  &:active {
    outline: none;
    cursor: pointer;
  }

  ${({ isLoading }) => {
    // Apply hover styles if the Typeahead isn't loading
    if (!isLoading) {
      return css`
        &:hover {
          background-color: ${({ theme }) => get(theme, "blue", "blue")};
          color: ${({ theme }) => get(theme, "white", "white")};
        }
      `
    }
    if (isLoading) {
      return css`
        cursor: not-allowed;
      `
    }
  }}
`

export const ItemMainText = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  height: 100%;
`

export const ItemHelperText = styled.div`
  color: black;
`
