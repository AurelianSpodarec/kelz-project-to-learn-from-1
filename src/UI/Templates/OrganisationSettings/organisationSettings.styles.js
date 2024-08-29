import styled, { css } from "styled-components"
import { get } from "lodash"

export const SettingsWrapper = styled.div`
  width: 72rem;
`

export const QuickQuoteSettingsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

export const LevelWrapper = styled.div`
  background: ${({ theme }) => get(theme, "white", "white")};
  border: 1px solid ${({ theme }) => get(theme, "tints.secondary.darkBlue.t70", "lightgrey")};
  border-radius: 0.3rem;
  width: 33.33%;
  height: fit-content;
  z-index: ${({ level }) => (level === "standard" ? "2" : "1")};
  ${({ level }) => {
    if (level === "basic") {
      return css`
        border-right: none;
        border-radius: 0.3rem 0 0 0.3rem;
      `
    }
    if (level === "comprehensive") {
      return css`
        border-left: none;
        border-radius: 0 0.3rem 0.3rem 0;
      `
    }
  }};
`

export const Cell = styled.div`
  height: ${({ isEdit }) => (isEdit ? "11rem" : "7rem")};
  border-bottom: 1px solid ${({ theme }) => get(theme, "tints.secondary.darkBlue.t70", "lightgrey")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${({ isFirst, isLast, level, theme }) => {
    const isStandard = level === "standard"
    if (isFirst && isStandard) {
      return css`
        background-color: ${get(theme, "blue", "blue")};
        height: 4.5rem;
      `
    }
    if (isFirst && !isStandard) {
      return css`
        height: 4rem;
        background-color: ${get(theme, level === "basic" ? "paleGreen" : "purple", "blue")};
      `
    }
    if (isLast && isStandard) {
      return css`
        height: 6.5rem;
        border-bottom: none;
        flex-direction: row;
      `
    }
    if (isLast && !isStandard) {
      return css`
        height: 6rem;
        border-bottom: none;
        flex-direction: row;
      `
    }
  }}
`
