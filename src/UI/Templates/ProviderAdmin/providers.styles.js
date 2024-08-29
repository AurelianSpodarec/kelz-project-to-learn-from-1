import styled from "styled-components"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"

export const PanelWrapper = styled.div`
  padding: 3rem;
`

export const TableActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

export const TableActionsRight = styled.div`
  display: flex;
`

export const TableActionsButton = styled(Button)`
  height: 5rem;
  width: 17.5rem;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`

export const PanelBodyWrapper = styled.div`
  border-bottom: ${({ theme }) => `1px solid ${get(theme, "tints.primary.blue.t20")}`};
  margin-bottom: 2rem;
`
