import styled from "styled-components"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"

export const ButtonsWrapper = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
`

export const ListWrapper = styled.div`
  padding: 1rem 2rem;
  border-bottom: 1px solid ${({ theme }) => get(theme, "faintGrey", "lightgrey")};
`

export const BodyWrapper = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => get(theme, "veryFaintGrey", "white")};
`

export const StyledSmallButton = styled(Button)`
  font-weight: normal;
  font-size: 1.4rem;
`
