import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
`

export const SideWrapper = styled.div`
  width: 27.7rem;
  display: flex;
  flex-direction: column;
`

export const StatusWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

export const BypassWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

export const DiligenceWrapper = styled.div`
  width: calc(100% - (27.7rem + 12.2rem));
  margin-left: 12.2rem;
  display: flex;
  flex-direction: column;
`

export const DiligenceBodyWrapper = styled.div`
  display: flex;
  align-items: center;

  & > div {
    margin-bottom: 0;
  }
`

export const ActivateOrganisationWrapper = styled.div`
  margin-top: 3rem;

  button {
    margin: 0;
  }
`
