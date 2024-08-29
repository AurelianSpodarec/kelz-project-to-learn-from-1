import styled, { css } from "styled-components"
import { transparentize } from "polished"
import { get } from "lodash"

export const JourneyWrapper = styled.div`
  display: flex;
  margin-bottom: 7rem;
`

export const StickyNav = styled.div`
  position: absolute;
  bottom: 7rem;
  opacity: 0;
  width: calc(100% - 7.5rem);
  height: 7rem;
  background-color: ${({ theme }) => transparentize(0.1, get(theme, "darkBlue"))};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 4;
  padding: 0 10%;
  flex-direction: ${({ hasSingleButton }) => (hasSingleButton ? "row-reverse" : "row")};

  ${({ isVisible }) => {
    if (isVisible)
      return css`
        opacity: 1;
      `
  }}
`
export const JourneyHeaderWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 4rem;
`
