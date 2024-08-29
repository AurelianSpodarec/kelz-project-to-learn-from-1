import styled from "styled-components"
import { get } from "lodash"

export const ShareCodeActions = styled.div`
  margin: 0 0 2rem;
  display: flex;
  justify-content: space-between;
`

export const AddOrganisationModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

export const AddOrganisationButtonsWrapper = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
`

export const OrganisationsListWrapper = styled.div`
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

export const AddOrganisationFormWrapper = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => get(theme, "veryFaintGrey")};
`

export const ShareButtonsWrapper = styled.div`
  display: flex;
  margin-top: 4rem;
  justify-content: space-between;
`

export const TableActionsWrapper = styled.div`
  display: flex;
  justify-content: ${({ hasAdd }) => (hasAdd ? "space-between" : "flex-end")};
  align-items: center;
  padding: 2rem;
`
