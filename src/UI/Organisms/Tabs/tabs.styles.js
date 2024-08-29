import styled, { css } from "styled-components"
import { get } from "lodash"

export const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
  width: 100%;
  display: flex;
  flex-direction: ${({ type }) => (type === "vertical" ? "row" : "column")};
`

export const Links = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: flex-end;
  margin-bottom: 5rem;

  /* Vertical tabs */
  ${({ type, theme }) => {
    if (type === "vertical") {
      return css`
        width: 22.2rem;
        flex-direction: column;
        height: fit-content;
        box-shadow: 0 0 5px 0 ${theme.faintGrey};
      `
    }
    if (type === "table") {
      return css`
        margin-bottom: 0;
      `
    }
    if (type === "panel") {
      return css`
        flex-wrap: wrap;
        margin-left: -0.5rem;
        margin-top: -0.5rem;
        margin-bottom: 1rem;
      `
    }
  }}
`

export const TabLink = styled.li`
  margin-right: ${({ isLast, type }) =>
    !isLast && type !== "vertical" && type !== "table" ? "3rem" : "0"};
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover,
  &:focus {
    opacity: ${({ isActive }) => (isActive ? 1 : 0.8)};
  }

  ${({ type, isFirst, isLast, theme, isActive }) => {
    if (type === "vertical") {
      return css`
        height: 6rem;
        width: 22.2rem;
        border-top: ${isFirst
          ? `1px solid ${get(theme, "tints.secondary.darkBlue.t70", "lightgrey")}`
          : "0"};
        border-bottom: 1px solid ${get(theme, "tints.secondary.darkBlue.t70", "lightgrey")};
        border-left: 1px solid ${get(theme, "tints.secondary.darkBlue.t70", "lightgrey")};
        border-right: 1px solid ${get(theme, "tints.secondary.darkBlue.t70", "lightgrey")};
        border-radius: ${() => {
          if (isFirst) {
            return "0.5rem 0.5rem 0 0"
          }
          if (isLast) {
            return "0 0 0.5rem 0.5rem"
          }
          return "0"
        }};
        position: relative;
        ${() => {
          if (isActive) {
            return css`
              &::after {
                content: "";
                position: absolute;
                top: -0.1rem;
                left: -0.1rem;
                width: 1rem;
                height: calc(100% + 0.2rem);
                background-color: ${get(theme, "darkBlue", "black")};
                border: 1px solid ${get(theme, "darkBlue", "black")};
                border-radius: ${() => {
                  if (isFirst) {
                    return "0.5rem 0 0 0"
                  }
                  if (isLast) {
                    return "0 0 0 0.5rem"
                  }
                  return "0"
                }};
              }
            `
          }
        }}
      `
    }
    /* Table type styles */
    if (type === "table") {
      return css`
        padding: 0 1.5rem;
        height: 4rem;
        border: 0.1rem solid ${get(theme, "blue", "blue")};
        border-bottom: 0;
        ${() => {
          if (isFirst && !isActive) {
            return css`
              border-right: 0;
              border-top-left-radius: 0.5rem;
              border-top-right-radius: 0;
            `
          }
          if (isLast && !isActive) {
            return css`
              border-top-left-radius: 0;
              border-top-right-radius: 0.5rem;
            `
          }
          if (!isActive)
            return css`
              border-right: 0;
              border-radius: 0;
            `
        }};
        ${() => {
          if (isActive) {
            return css`
              background-color: ${get(theme, "darkBlue", "black")};
              border-color: ${get(theme, "darkBlue", "black")};
              height: 4.5rem;
              border-top-left-radius: 0.5rem;
              border-top-right-radius: 0.5rem;
            `
          }
        }}};
      `
    }

    /* Panel type styles */
    if (type === "panel") {
      return css`
        padding: 0 1rem;
        flex: 0 0 auto;   
        margin:0.5rem  0  0 0.5rem;
        border-color: ${get(theme, "white", "white")};
        border: 0.2rem solid ${get(theme, "white", "white")};
        border-radius: 1.5rem;
        ${() => {
          if (isActive) {
            return css`
              background-color: ${get(theme, "white", "white")};
            `
          }
        }}};
      `
    }

    /* Modal type styles */
    if (type === "modal") {
      return css`
        padding: 0 1rem;
        flex: 0 0 auto;
        background-color: ${get(theme, "blue")};
        border: 0.2rem solid ${get(theme, "blue")};
        border-radius: 1.5rem;
        ${() => {
          if (isActive) {
            return css`
              background-color: ${get(theme, "white", "white")};
            `
          }
        }};
      `
    }
  }}
`

export const Anchor = styled.a`
  transition: ${({ type }) =>
    type === "vertical" || type === "table"
      ? "color 0.2s linear"
      : "color 0.2s linear, border-bottom 0.2s linear"};
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: none;
    opacity: 1;
  }
  /* Active appearance */
  ${({ appearance, theme, type }) => {
    if (appearance === "active") {
      return css`
        color: ${() => {
          if (type === "table") {
            return get(theme, "white", "white")
          }
          if (type === "modal") {
            return get(theme, "blue")
          }
          return get(theme, "darkBlue", "black")
        }};
        border-bottom: ${type !== "anchors"
          ? "1px solid transparent"
          : `1px solid ${get(theme, "darkBlue", "black")}`};
        cursor: default;
      `
    }
  }}

  ${({ type, theme, appearance }) => {
    /* Vertical type styles */
    if (type === "vertical") {
      return css`
        margin-left: 2rem;
      `
    }
    /* Panel type styles */
    if (type === "panel") {
      return css`
        color: ${appearance === "active"
          ? get(theme, "blue", "blue")
          : get(theme, "white", "white")};
        font-size: 1.4rem;
      `
    }

    /* Modal type styles */
    if (type === "modal" && appearance !== "active") {
      return css`
        color: ${get(theme, "white", "white")};
      `
    }
  }}
`

export const Content = styled.div`
  ${({ type, theme }) => {
    if (type === "vertical") {
      return css`
        width: 100%;
        margin-left: 10rem;
      `
    }
    if (type === "table") {
      return css`
        border: 1px solid ${get(theme, "darkBlue", "black")};
        border-radius: 0 0.5rem 0.5rem 0.5rem;
      `
    }
  }}
`

export const LoadingWrapper = styled.div`
  width: 10rem;
  margin: 0.5rem;
`
