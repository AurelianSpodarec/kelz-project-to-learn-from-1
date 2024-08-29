import styled, { css } from "styled-components"
import { get } from "lodash"

export const Wrapper = styled.div`
  margin: 0 0 2rem;
`

export const CardWrapper = styled.div`
  background: ${({ theme }) => get(theme, "white", "white")};
  border-radius: 0.5rem;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

export const ActionsButton = styled.button`
  margin: 0 0 0 1rem;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`

export const ViewDealHeader = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => get(theme, "veryFaintGrey")};
  border-bottom: 1px solid ${({ theme }) => get(theme, "faintGrey")};
`

export const ViewDealBody = styled.div`
  padding: 2rem;
`

export const DateRangeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 34rem;
`

export const DateWrapper = styled.div`
  display: inline-block;
`

export const ListOuterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ListWrapper = styled.div`
  flex: 1;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  padding: 0 2rem 2rem 2rem;
`

export const ConfirmWrapper = styled.div`
  padding: 2rem;
`

export const ConfirmButtons = styled.div`
  display: flex;
`

export const ModalContentWrapper = styled.div`
  position: relative;
`

export const ModalContentOverlay = styled.div`
  ${({ isVisible }) => {
    if (isVisible) {
      return css`
        position: absolute;
        height: 100%;
        width: 100%;
        background: ${({ theme }) => get(theme, "white", "white")};
        opacity: 0.5;
        border-bottom: 1px solid ${({ theme }) => get(theme, "faintGrey")};
      `
    }
  }}
`

export const AssignButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
