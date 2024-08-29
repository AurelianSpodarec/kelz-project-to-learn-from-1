import styled, { css } from "styled-components"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"

export const ContactWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const ContactIcon = styled.div`
  margin-right: 0.5rem;
  padding-top: 0.5rem;
  color: ${({ theme }) => get(theme, "blue", "blue")};
  transition: color 0.2s linear;

  ${({ isSelected, theme }) => {
    if (isSelected) {
      return css`
        color: ${get(theme, "white", "white")};
      `
    }
  }}
`

export const TableActionsWrapper = styled.div`
  display: flex;
  ${({ hasShowDeleted }) =>
    hasShowDeleted ? "justify-content: space-between;" : "justify-content: flex-end;"}}
  align-items: flex-end;
  margin-bottom: 1rem;
`

export const TableActionsRight = styled.div`
  display: flex;
`

export const TableActionsButton = styled(Button)`
  height: 5rem;
  width: 15rem;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`

export const HeaderContentWrapper = styled.div`
  display: flex;

  ${({ context }) => {
    if (context === "open") {
      return css`
        flex-direction: column;
      `
    }
  }}
`

export const UserInfoWrapper = styled.div`
  margin: 0 0 1.5rem;
`

export const DispositionWrapper = styled.div`
  margin: 0 0 3rem;

  ${({ context }) => {
    if (context === "wide") {
      return css`
        margin-left: 7rem;
      `
    }
  }}
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const EditFieldRow = styled.div`
  display: flex;
  margin: 0 0 2rem;
`

export const EditFieldWrapper = styled.div`
  width: ${({ width }) => width || "20rem"};
`

export const EditButtonsWrapper = styled.div`
  display: flex;
`
