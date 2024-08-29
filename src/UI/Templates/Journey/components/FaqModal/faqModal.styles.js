import styled from "styled-components"
import { get } from "lodash"

export const Divider = styled.span`
  display: flex;
  padding: 0 1rem;
  height: 0.1rem;
  width: 100%;
  margin: 1rem 0 1.5rem;
  background: ${({ theme }) => get(theme, "faintGrey")};
`

export const ResultsContainer = styled.div`
  height: ${({ height }) => height};
  overflow-y: auto;
  padding: 2rem;
  transition: height 0.2s;
`
