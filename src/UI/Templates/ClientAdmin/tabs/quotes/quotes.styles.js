import styled from "styled-components"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"

export const QuoteAgentWrapper = styled.div`
  padding-left: 1rem;
`
export const QuoteClientWrapper = styled.div`
  flex-grow: 1;
`
export const QuoteDetailsHeader = styled.div`
  display: flex;
  justify-content: "space-around";
`

export const OwnershipIconsWrapper = styled.div`
  display: flex;
  justify-content: "space-around";
  border-bottom: 1px solid ${({ theme }) => get(theme, "faintGrey", "lightgrey")};
`
export const IconWrapper = styled.div`
  width: 33%;
  margin-bottom: 2rem;
  h3 {
    text-align: center;
  }
`

export const QuoteDetails = styled.div`
  padding: 2rem;
  background: ${({ theme }) => get(theme, "veryFaintGrey")};
  border-top: 1px solid ${({ theme }) => get(theme, "faintGrey", "lightgrey")};
  border-bottom: 1px solid ${({ theme }) => get(theme, "faintGrey", "lightgrey")};
`

export const QuoteButtonsWrapper = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: ${({ hasLeftButton }) => (!hasLeftButton ? "flex-end" : "space-between")};
`

export const TransferButton = styled(Button)`
  background-color: ${({ theme }) => get(theme, "orange")};
  border: none;
`
export const IconBackground = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  background-color: ${({ success, theme }) => (success ? get(theme, "green") : get(theme, "red"))};
  border-radius: 50%;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`
