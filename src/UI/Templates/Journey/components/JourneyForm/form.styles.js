import styled, { css } from "styled-components"
import { get } from "lodash"

export const SectionsWrapper = styled.div``

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;

  ${({ isLast }) => {
    if (!isLast) {
      return css`
        border-bottom: 1px solid ${({ theme }) => get(theme, "faintGrey")};
        margin-bottom: 2rem;
        padding-bottom: 1rem;
      `
    }
  }}
`
