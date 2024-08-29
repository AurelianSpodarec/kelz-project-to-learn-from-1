import styled, { css } from "styled-components"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"

export const Wrapper = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => get(theme, "tints.secondary.darkBlue.t70")};
  border-radius: 0.3rem;
  margin: ${({ margin }) => margin};
`

export const Header = styled.div`
  border-bottom: 1px solid ${({ theme }) => get(theme, "tints.secondary.darkBlue.t70")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.5rem 1rem 1rem;
  background-color: ${({ theme }) => get(theme, "veryFaintGrey")};
`

export const Content = styled.div`
  padding: 2rem;

  ${({ isEditor, contentLabel }) => {
    if (isEditor) {
      return css`
        padding: ${contentLabel ? "2rem" : "0"};
      `
    }
  }}
`

export const ButtonsWrapper = styled.div`
  display: flex;
  ${({ hasLabel }) => {
    if (hasLabel) {
      return css`
        margin-top: 1.8rem;
      `
    }
  }}
`

export const HeaderButton = styled(Button)`
  padding: 0.5rem;
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`

export const LoadingWrapper = styled.p`
  margin-bottom: 1rem;
`

export const TitleInputWrapper = styled.div`
  flex: 1;
  padding-right: 1.5rem;
`
