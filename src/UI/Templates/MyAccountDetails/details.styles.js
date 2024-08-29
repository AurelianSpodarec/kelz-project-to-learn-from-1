import styled, { css } from "styled-components"
import { get } from "lodash"
import { Row } from "@4cplatform/elements/Atoms"

export const DetailsRow = styled(Row)`
  border-bottom: 1px solid ${({ theme }) => get(theme, "faintGrey", "lightgrey")};
  padding-bottom: 3rem;
  margin: 0 0 2rem;
`

export const FieldWrapper = styled.div`
  color: ${({ theme }) => get(theme, "tints.secondary.darkBlue.t20", "black")};
`

export const FieldLabel = styled.p`
  font-weight: bold;
  font-size: 1.6rem;
  letter-spacing: 0;
  line-height: 2rem;
  margin-bottom: 1rem;
`

export const FieldValue = styled.p`
  margin-left: 1rem;
`

export const SettingWrapper = styled.div`
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  width: 62rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => get(theme, "faintGrey", "lightgrey")};

  ${({ isLast }) => {
    if (isLast) {
      return css`
        border-bottom: none;
      `
    }
  }}
`

export const SettingLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  color: ${({ theme }) => get(theme, "tints.secondary.darkBlue.t20", "black")};
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
