import styled from "styled-components"
import { Button } from "@4cplatform/elements/Molecules"

export const TableActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
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

export const DateRangeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 0 2rem;
  max-width: 34rem;
`

export const DateWrapper = styled.div`
  display: inline-block;
`

export const ListOuterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 2rem;
`

export const ListWrapper = styled.div`
  flex: 1;
`

export const EditFieldRow = styled.div`
  display: flex;
  margin: 0 0 2rem;
`

export const EditFieldWrapper = styled.div`
  width: ${({ width }) => width || "20rem"};
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
