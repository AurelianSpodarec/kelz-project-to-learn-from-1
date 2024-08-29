import styled from "styled-components"
import { darken } from "polished"
import { get } from "lodash"

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin: ${({ margin }) => margin};
`

export const ItemWrapper = styled.span`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 1.6rem;
  font-weight: normal;
  letter-spacing: 0;
  text-decoration: none;

  a {
    height: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${({ theme }) => get(theme, "blue", "blue")};
    transition: color 0.3s linear;
    &:hover,
    &:focus {
      color: ${({ theme }) => darken(0.2, get(theme, "blue", "blue"))};
      text-decoration: none;
    }
  }
`

export const Divider = styled.span`
  color: ${({ theme }) => get(theme, "tints.secondary.darkBlue.t70", "lightgrey")};
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
`
