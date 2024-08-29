import styled, { css } from "styled-components"
import { get } from "lodash"
import Button from "@4cplatform/elements/Molecules/Button"

export const TableActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

export const TableActionsButton = styled(Button)`
  height: 5rem;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`
export const TableActionsRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const TableActionsLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const PanelActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${({ theme }) => `1px solid ${get(theme, "tints.primary.blue.t20")}`};
  padding-bottom: 2rem;
  margin-bottom: 2rem;
`

export const PanelActionButton = styled(Button)`
  height: 2.4rem;
  font-size: 1.2rem;
  padding: 0 0 0 0.5rem;
  border: ${({ theme }) => `1px solid ${theme.white}`};

  & > div {
    font-size: 1.2rem;

    svg {
      height: 1.5rem;
      width: 1.5rem;
    }
  }

  ${({ isLoading }) => {
    if (!isLoading) {
      return css`
        &:hover {
          background-color: ${({ theme }) => get(theme, "blue", "blue")};
          color: ${({ theme }) => get(theme, "white", "white")};
        }
      `
    }
    if (isLoading) {
      return css`
        cursor: not-allowed;
      `
    }
  }}
`

export const EditUserFormWrapper = styled.div`
  margin-top: 2rem;

  .select__label,
  .input__label {
    color: ${({ theme }) => theme.white};
    font-size: 1.4rem;
  }
`

export const NameWrapper = styled.div`
  width: 20.7rem;
  margin: ${({ margin }) => margin};
`

export const NamesWrapper = styled.div`
  display: flex;
  margin: 0 0 2rem;
`

export const FieldWrapper = styled.div`
  width: 31.5rem;
  margin: 0 0 3rem;
`

export const SimulationModeWrapper = styled.div`
  h3 {
    color: ${({ theme }) => get(theme, "tints.darkBlue.t20")};
    font-size: 1.6rem;
    line-height: 2.2rem;
    font-weight: 400;
  }

  p {
    color: ${({ theme }) => get(theme, "tints.darkBlue.t20")};
    font-size: 1.4rem;
    line-height: 1.7rem;
    font-weight: 400;
  }
`
