import styled, { css } from "styled-components"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"

export const SectionWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => get(theme, "faintGrey")};
  margin: 0 0 2rem;
  padding: ${({ padding }) => padding || "0"};
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const DetailsWrapper = styled.div`
  width: 80rem;
`

export const OrganisationNetworkWrapper = styled.div`
  width: 20rem;
`

export const OrgNetworkButton = styled(Button)`
  font-size: 1.4rem;
`

export const Sidebar = styled.div`
  margin-left: 5rem;
`

export const SidebarSection = styled.div`
  margin: 0 0 1rem;
  ${({ isLast, theme }) => {
    if (!isLast) {
      return css`
        padding-bottom: 1rem;
        border-bottom: 1px solid ${get(theme, "faintGrey")};
      `
    }
  }}
`
