import styled, { css } from "styled-components"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"

export const PremiumWrapper = styled.div`
  display: flex;
`

export const TableActionsWrapper = styled.div`
  display: flex;
  justify-content: ${({ hasLeftActions }) => (hasLeftActions ? "space-between" : "flex-end")};
  align-items: center;
  margin-bottom: 1rem;
`

export const TableActionsLeft = styled.div`
  flex-grow: 1;
`

export const TableActionsRight = styled.div`
  display: flex;
`

export const SectionWrapper = styled.div`
  margin-bottom: 2rem;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: ${({ isWidePanel }) => (isWidePanel ? "flex-start" : "space-between")};
`

export const UserInfoWrapper = styled.div`
  margin: ${({ isEdit }) => `0 ${isEdit ? "20rem" : "0"} 1.5rem 0`};
`

export const EditClientFormWrapper = styled.div`
  margin-top: 2rem;
`

export const EditFieldRow = styled.div`
  display: flex;
  margin: 0 0 2rem;
`

export const HeaderUserDetailsWrapper = styled.div`
  padding-top: 2rem;
  ${({ isEdit }) => {
    if (isEdit) {
      return css`
        display: flex;
      `
    }
  }}
`

export const RoundedButtonsWrapper = styled.div`
  display: flex;
  margin: ${({ margin }) => margin || "0"};
`

export const RoundedButton = styled(Button)`
  border-radius: 15rem;
  margin-right: 1rem;
  font-weight: 400;
  font-size: 1.4rem;
  height: 3rem;
  justify-content: ${({ hasLeftActions }) => (hasLeftActions ? "space-between" : "flex-end")};

  &:focus,
  &:active,
  &.active {
    border: ${({ theme, isLightBackground }) =>
      get(theme, `${isLightBackground ? "blue" : "white"}`)};
    background: ${({ theme, isLightBackground }) =>
      get(theme, `${isLightBackground ? "blue" : "white"}`)};
    color: ${({ theme, isLightBackground }) =>
      get(theme, `${isLightBackground ? "white" : "blue"}`)};
  }
`

export const PolicySummaryUserDetails = styled.div`
  padding: 2rem;
  background: ${({ theme }) => get(theme, "veryFaintGrey")};
  border-top: 1px solid ${({ theme }) => get(theme, "faintGrey", "lightgrey")};
  border-bottom: 1px solid ${({ theme }) => get(theme, "faintGrey", "lightgrey")};
`

export const AddressWrapper = styled.div`
  padding-left: 1rem;
`

export const BodyButtonsWrapper = styled.div`
  padding-left: 2rem;
`
