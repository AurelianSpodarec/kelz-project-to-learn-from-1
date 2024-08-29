import styled from "styled-components"
import { get } from "lodash"

export const TableActionsWrapper = styled.div`
  display: flex;
  justify-content: ${({ hasAdd }) => (hasAdd ? "space-between" : "flex-end")};
  align-items: center;
  padding: 2rem;
`

export const SectionWrapper = styled.div`
  padding-bottom: ${({ isLast }) => (isLast ? 0 : "2rem")};
  border-bottom: ${({ theme, isLast }) =>
    isLast ? "none" : `1px solid ${get(theme, "tints.primary.blue.t20")}`};
`

export const ButtonsWrapper = styled.div`
  padding-top: 3rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`
