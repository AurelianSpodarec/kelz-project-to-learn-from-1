import styled, { css } from "styled-components"
import { get } from "lodash"

export const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const InnerWrapper = styled.div`
  margin-top: 0.5rem;
  width: 100%;
`

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 2rem;
  height: auto;
  width: 100%;
  border: 0.1rem solid ${({ theme }) => get(theme, "tints.secondary.darkBlue.t70", "lightgrey")};
  border-radius: 0.3rem;
  background-color: ${({ theme }) => get(theme, "white", "white")};
  box-shadow: 0 0 0.5rem 0 ${({ theme }) => get(theme, "faintGrey", "lightgrey")};
  ${({ isLast }) => {
    if (isLast) {
      return css`
        margin: 0;
      `
    }
  }}
`

export const TypeWrapper = styled.div`
  min-height: 11.6rem;
  display: flex;
  padding: 2rem;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.3rem 0.3rem 0 0;
  background-color: ${({ theme }) => get(theme, "veryFaintGrey", "lightgrey")};
`

export const FieldWrapper = styled.div`
  padding: 2rem;
`

export const SelectWrapper = styled.div`
  flex-grow: 4;
`

export const CancelButton = styled.button`
  width: 3rem;
  height: 3rem;
  margin-top: 4.1rem;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: ${({ theme }) => get(theme, "red", "red")};
  border-radius: 50%;
  color: ${({ theme }) => get(theme, "white", "white")};
  margin-left: 1rem;
  cursor: pointer;
  align-self: baseline;
  &:focus,
  &:active {
    outline: none;
  }
`
