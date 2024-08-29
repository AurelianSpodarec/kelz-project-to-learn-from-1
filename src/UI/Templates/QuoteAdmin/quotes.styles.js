import styled from "styled-components"

export const TableActionsWrapper = styled.div`
  display: flex;
  justify-content: ${({ hasLeftActions }) => (hasLeftActions ? "space-between" : "flex-end")};
  align-items: center;
  margin-bottom: 1rem;
`

export const TableActionsRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
