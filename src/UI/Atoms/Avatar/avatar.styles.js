import styled from "styled-components"
import { get } from "lodash"

export const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`
export const Initials = styled.div`
  height: 100%;
  width: 100%;
  color: ${({ theme }) => get(theme, "tints.secondary.darkBlue.t20", "darkblue")};
  font-size: ${({ size }) => `calc(${size} / 2)`};
  letter-spacing: 0;
  text-align: center;
  background-color: ${({ theme }) => get(theme, "faintGrey", "lightgray")};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
