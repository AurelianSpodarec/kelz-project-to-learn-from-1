import styled, { css } from "styled-components"
import { get } from "lodash"

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: ${({ margin }) => margin};
  color: ${({ appearance, theme }) =>
    appearance === "light" ? get(theme, "white", "white") : get(theme, "darkBlue", "black")};
`

export const Text = styled.span`
  font-size: ${({ fontSize }) => fontSize};
  transition: color 0.2s linear;

  ${({ isLoading, fontSize, loadingWidth }) => {
    if (isLoading) {
      return css`
        line-height: ${fontSize};
        margin: 0;
        display: inline-flex;
        align-items: center;
        width: ${loadingWidth};
      `
    }
  }}

  ${({ fontColour }) => {
    if (fontColour) {
      return css`
        color: ${fontColour};
      `
    }
  }}
`

export const IconWrapper = styled.div`
  margin-right: ${({ iconSpacing }) => iconSpacing};
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ iconBackgroundColour }) => {
    if (iconBackgroundColour) {
      return css`
        background-color: ${iconBackgroundColour};
        border-radius: 50%;
      `
    }
  }}
`
