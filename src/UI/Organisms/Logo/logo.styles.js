import styled, { css } from "styled-components"
import { get } from "lodash"

export const LogoWrapper = styled.div`
  margin: ${({ margin }) => margin};
`
export const LogoImage = styled.img`
  max-width: 30rem;
  width: auto;
  height: auto;

  ${({ isEdit, theme }) => {
    const colour = get(theme, "faintGrey")
    if (isEdit) {
      return css`
        background-image: linear-gradient(45deg, ${colour} 25%, transparent 25%),
          linear-gradient(-45deg, ${colour} 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, ${colour} 75%),
          linear-gradient(-45deg, transparent 75%, ${colour} 75%);
        background-size: 20px 20px;
        background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
      `
    }
  }}
`
