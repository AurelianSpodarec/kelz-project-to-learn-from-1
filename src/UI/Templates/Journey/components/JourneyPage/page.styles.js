import styled from "styled-components"

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 17.7%);
  margin-left: 10rem;
`
export const LockedWrapper = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.black};
  padding: 1rem;
  border-radius: 0.3rem;
  margin-bottom: 3rem;
`
export const LockedIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`
