import styled from "styled-components"
import { get } from "lodash"

export const ButtonsWrapper = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
`

export const ListWrapper = styled.div`
  padding: 1rem 2rem;
  border-bottom: 1px solid ${({ theme }) => get(theme, "faintGrey", "lightgrey")};
`

export const SelectWrapper = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => get(theme, "veryFaintGrey", "white")};
`
