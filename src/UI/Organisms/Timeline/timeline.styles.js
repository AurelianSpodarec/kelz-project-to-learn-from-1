import styled, { css } from "styled-components"
import { get } from "lodash"

export const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`

export const EventWrapper = styled.div`
  padding: 0 0 3rem 2rem;
  position: relative;

  ${({ isLast, theme }) => {
    if (!isLast) {
      return css`
        border-left: 2px solid ${get(theme, "darkBlue", "black")};
      `
    }
  }}
`

export const IconWrapper = styled.div`
  background-color: ${({ iconColour }) => iconColour};
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: -1rem;
`

export const Text = styled.p`
  margin: 0;
  font-size: 1.4rem;
  line-height: 1.9rem;
  font-weight: thin;
  word-break: break-all;
  color: ${({ theme }) => get(theme, "white", "white")};
`

export const EventButton = styled.button`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  line-height: 1.9rem;
  color: ${({ theme }) => get(theme, "white", "white")};
  border: none;
  background: transparent;
  cursor: pointer;
  text-decoration: underline;
  font-weight: bold;
`

export const EventButtonIconWrapper = styled.div`
  margin-left: 0.5rem;
`
