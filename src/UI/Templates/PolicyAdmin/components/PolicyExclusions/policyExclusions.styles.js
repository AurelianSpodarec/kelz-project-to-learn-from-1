import styled, { css } from "styled-components"
import { get } from "lodash"

export const SectionWrapper = styled.div`
  :last-child {
    margin: 0;
  }
  ${({ isEditForm }) => {
    if (isEditForm) {
      return css`
        padding: 0;
      `
    }
    return css`
      padding: 2rem;
    `
  }}
`

export const ExclusionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.3rem;
  padding: 2rem;
  margin: 0 0 1rem;
  border: 1px solid ${({ theme }) => get(theme, "tints.secondary.darkBlue.t70")};
`

export const ExclusionBodyWrapper = styled.div`
  ${({ isEditForm }) => {
    if (isEditForm) {
      return css`
        padding: 0;
        margin: 0;
        width: 100%;
      `
    }
    return css`
      padding: 0;
      background-color: ${({ theme }) => get(theme, "veryFaintGrey", "faintGrey")};
      border-top: 1px solid ${({ theme }) => get(theme, "faintGrey", "grey")};
      border-bottom: 1px solid ${({ theme }) => get(theme, "faintGrey", "grey")};
    `
  }}
`

export const ExclusionHeaderActionsWrapper = styled.div`
  display: flex;
`

export const ExclusionHeaderTextWrapper = styled.div``

export const getIconDetails = (deleteModal, isSelected) => {
  if (deleteModal) {
    return "red"
  }
  if (isSelected) {
    return "green"
  }
  return "blue"
}

export const IconWrapper = styled.span`
  svg {
    background-color: ${({ deleteModal, isSelected, theme }) =>
      get(theme, getIconDetails(deleteModal, isSelected))};
    border-radius: 50%;
    padding: 0.5rem;
  }
`

export const ButtonsWrapper = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
`

export const InnerWrapper = styled.div`
  margin-top: 0.5rem;
  width: 100%;
`

export const FieldWrapper = styled.div`
  padding: 2rem;
`

export const LoadingWrapper = styled.p`
  padding: 1rem 2rem;
  margin-bottom: 1rem;
`
