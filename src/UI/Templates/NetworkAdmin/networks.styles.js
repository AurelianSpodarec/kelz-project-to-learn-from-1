import styled from "styled-components"
import { Button } from "@4cplatform/elements/Molecules"

export const TableActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

export const TableActionsButton = styled(Button)`
  height: 5rem;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`

export const TableActionsRight = styled.div`
  display: flex;
`
