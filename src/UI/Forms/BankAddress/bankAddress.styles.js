import styled, { css } from "styled-components"

export const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`

export const LookupWrapper = styled.div`
  display: flex;
  margin: 0 0 1rem;
`

export const ManualWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1rem;

  ${({ isHorizontal }) => {
    if (!isHorizontal) {
      return css`
        margin-top: 2.1rem;
      `
    }
  }}
`
