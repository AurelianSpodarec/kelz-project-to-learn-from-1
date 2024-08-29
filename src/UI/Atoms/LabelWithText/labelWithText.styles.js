import styled, { css } from "styled-components"
import { get } from "lodash"
import { Label } from "@4cplatform/elements/Typography"

export const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
  color: ${({ appearance, theme }) =>
    appearance === "light" ? get(theme, "white", "white") : get(theme, "darkBlue", "black")};
`

export const StyledLabel = styled(Label)`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ labelWeight }) => labelWeight};
  color: ${({ appearance, theme, labelColour }) =>
    labelColour ||
    (appearance === "light" ? get(theme, "white", "white") : get(theme, "darkBlue", "black"))};
`

export const TextWrapper = styled.div`
  margin-top: 0.5rem;
  padding-left: ${({ indent }) => indent};
`

export const Text = styled.span`
  display: inline-block;
  width: ${({ isLoading, loadingWidth }) => (isLoading ? loadingWidth : "100%")};
  font-size: ${({ fontSize }) => fontSize};

  ${({ colour }) => {
    if (colour) {
      return css`
        color: ${colour};
      `
    }
  }}
`

export const LoadingWrapper = styled.div`
  margin-bottom: 0.5rem;
`
