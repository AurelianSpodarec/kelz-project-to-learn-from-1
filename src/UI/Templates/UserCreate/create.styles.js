import styled from "styled-components"
import { get } from "lodash"

export const Wrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => get(theme, "faintGrey", "grey")};
  margin: 0 0 2rem;
`
