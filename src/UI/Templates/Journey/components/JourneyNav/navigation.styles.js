import styled, { css } from "styled-components"

export const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 17.77%;
`

export const NavigationLink = styled.button`
  padding: 0.4rem 0rem 0.4rem 1rem;
  font-size: 1.6rem;
  letter-spacing: 0;
  line-height: 2.2rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  background: transparent;
  text-align: left;
  color: ${({ theme }) => theme.blue};
  border: none;
  cursor: pointer;
  border-left: 2px solid ${({ theme }) => theme.blue};

  &:hover {
    text-decoration: none;
  }

  ${({ isCurrent, hasErrors }) => {
    if (isCurrent) {
      return css`
        color: ${({ theme }) => theme.black};
        border-color: ${({ theme }) => theme.black};
        cursor: not-allowed;
      `
    }
    if (hasErrors) {
      return css`
        color: ${({ theme }) => theme.red};
        border-color: ${({ theme }) => theme.red};
      `
    }
  }}
`
