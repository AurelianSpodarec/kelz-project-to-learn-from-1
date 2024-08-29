import styled from "styled-components"
import { Button } from "@4cplatform/elements/Molecules"
import { get } from "lodash"

export const TableActionsWrapper = styled.div`
  display: flex;
  justify-content: ${({ hasAdd }) => (hasAdd ? "space-between" : "flex-end")};
  align-items: center;
  padding: 2rem;
`

export const TableActionsButton = styled(Button)`
  height: 5rem;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`

export const ShareButtonsWrapper = styled.div`
  display: flex;
  margin-top: 4rem;
  justify-content: space-between;
`

export const ShareCodeActions = styled.div`
  margin: 0 0 2rem;
  display: flex;
  justify-content: space-between;
`

export const AddUserFormWrapper = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => get(theme, "veryFaintGrey")};
`

export const AddUserModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

export const AddUserButtonsWrapper = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
`

export const UsersListWrapper = styled.div`
  padding: 2rem;
  max-height: 30rem;
  overflow: scroll;
  flex: 1;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`

export const ListItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
