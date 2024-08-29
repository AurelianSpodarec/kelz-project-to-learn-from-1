import styled from "styled-components"
import { get } from "lodash"

export const SectionWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => get(theme, "faintGrey")};
  margin: 0 0 2rem;
  padding: 0 0 2rem;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
