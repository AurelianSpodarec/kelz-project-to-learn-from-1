import styled from "styled-components"
import { get } from "lodash"

export const ToggleWrapper = styled.div`
  border-top: ${({ theme }) => `1px solid ${get(theme, "faintGrey", "black")}`};
  padding-top: 2rem;
`
