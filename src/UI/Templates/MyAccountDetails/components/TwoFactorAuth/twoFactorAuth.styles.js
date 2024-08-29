import styled from "styled-components"
import { get } from "lodash"
import { P } from "@4cplatform/elements/Typography"
import { Button } from "@4cplatform/elements/Molecules"

export const CompleteOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => get(theme, "veryFaintGrey", "lightgrey")};
  padding: 2rem;
`

export const GoogleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`

export const BadgesWrapper = styled.div`
  display: flex;
  margin-bottom: 3rem;
`

export const BadgeLink = styled.a`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => get(theme, "black")};
`

export const StoreBadge = styled.img`
  height: 4.5rem;
  margin-right: 2rem;
  width: auto;
  margin-bottom: 0.5rem;
`

export const QRWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const QRCode = styled.div`
  min-width: 17.5rem;
  width: 17.5rem;
  min-height: 17.5rem;
  height: 17.5rem;
  margin-right: 2rem;
  overflow: hidden;
`
export const QRCodeImage = styled.img`
  width: 19.5rem;
  height: 19.5rem;
  margin-top: -1rem;
  margin-left: -1rem;
`

export const GoogleSecret = styled(P)`
  font-weight: bold;
  letter-spacing: 0.5rem;
  text-transform: uppercase;
`

export const CompleteWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin-top: 2rem;
`

export const CompleteInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const ResendButton = styled(Button)`
  justify-content: flex-start;
`

export const SendButton = styled(Button)`
  height: 5.2rem;
  margin-bottom: 4rem;
  margin-left: 1rem;
`

export const ChangeOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`
export const ChangeButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
