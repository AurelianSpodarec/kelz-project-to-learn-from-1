import styled from "styled-components"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const AnswerWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 0 2rem;
`

export const AliasWrapper = styled.div`
  width: 38rem;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => get(theme, "tints.secondary.darkBlue.t70", "lightgrey")};
  border-radius: 0.3rem;
  margin-top: 2rem;
`

export const AliasContent = styled.div``

export const AliasButtons = styled.div`
  display: flex;
  align-items: center;
`

export const AliasButton = styled(Button)`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const AliasOuterWrapper = styled.div``
