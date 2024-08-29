import styled from "styled-components"
import { get } from "lodash"

export const StatusWrapper = styled.div`
  border-bottom: ${({ theme }) => `1px solid ${get(theme, "tints.primary.blue.t20")}`};
  padding-bottom: 2rem;
  margin-bottom: 2rem;
`

export const TableActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

export const TableActionsRight = styled.div`
  display: flex;
`
