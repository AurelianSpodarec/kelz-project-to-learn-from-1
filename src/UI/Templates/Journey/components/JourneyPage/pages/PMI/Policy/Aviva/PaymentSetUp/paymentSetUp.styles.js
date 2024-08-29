import { get } from "lodash"
import styled from "styled-components"

export const Banner = styled.div`
  background: linear-gradient(180deg, #21879a 0%, #197da4 39.8%, #4a6db1 100%);
  padding: 2rem;
  border-radius: 3px;
  color: ${({ theme }) => get(theme, "white")};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
