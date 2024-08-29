import styled from "styled-components"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"

export const CancelWrapper = styled.div`
  display: flex;
  justify-content: center;
`

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

export const InviteOrganisationFormWrapper = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => get(theme, "veryFaintGrey")};
`

export const InviteOrganisationButtonsWrapper = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
`

export const InvitesListWrapper = styled.div`
  padding: 2rem;
  max-height: 30rem;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`
