import styled from "styled-components"
import { get } from "lodash"
import { H2, P } from "@4cplatform/elements/Typography"
import { colours } from "@4cplatform/elements/Helpers"

export const Wrapper = styled.div`
  height: 78.6rem;
  width: ${({ width }) => width};
  display: flex;
  flex-direction: column;
  border: 1px solid
    ${({ theme, isNoteTab }) =>
      isNoteTab ? "none" : get(theme, "tints.secondary.darkBlue.t70", "darkblue")};
  border-radius: 0.3rem;
  background-color: ${({ theme, isNoteTab }) =>
    isNoteTab ? "transparent" : get(theme, "white", "white")};
`
export const NotesWrapper = styled.div`
  ${({ isNoteTab }) => (isNoteTab ? "margin-bottom: 3rem" : "overflow-y: scroll;")}
  height: ${({ isNoteTab }) => (isNoteTab ? "78.6rem" : "69.5rem")};
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme, isNoteTab }) =>
    isNoteTab ? "transparent" : get(theme, "veryFaintGrey", "lightgrey")};
  ${({ theme, isNoteTab }) =>
    !isNoteTab &&
    `
      border-bottom: 1px solid ${get(theme, "lightgrey", "lightgrey")};
  `}
`

export const MessageWrapper = styled.div`
  height: auto;
  width: 48.5rem;
  align-self: center;
  margin: 2rem 1rem 3rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Message = styled.div`
  min-height: 7.4rem;
  height: auto;
  border-radius: ${({ isNoteTab }) =>
    isNoteTab ? "0.3rem 0.3rem 0 0.3rem" : "0.3rem 0.3rem 0.3rem 0"};
  background-color: ${({ theme }) => get(theme, "white", "white")};
  box-shadow: 0 0 0.1rem 0 rgba(0, 34, 43, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid ${({ theme }) => get(theme, "lightgrey", "lightgrey")};
  color: ${colours.adminBlue};

  ${({ isNoteTab }) =>
    isNoteTab &&
    `
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: -1rem;
        right: 0;
        border-top: 1rem solid white;
        border-left: 1rem solid transparent;
        box-shadow: 0.1rem 0 0 0 lightgrey;
      }
  `}
`

export const MessageLoading = styled.div`
  line-height: 10rem;
  width: 100%;
`

export const MessageNoNotes = styled(P)`
  margin: 3rem auto;
`

export const UnderWrapper = styled.div`
  margin-left: 2.5rem;
  justify-content: flex-end;
  width: 100%;
  font-size: 12px;
  letter-spacing: 0;
  line-height: 15px;
  display: flex;
  align-items: center;
  color: ${({ theme, isNoteTab }) =>
    isNoteTab ? get(theme, "white", "white") : colours.adminBlue};
`

export const UnderWrapperLoading = styled.div`
  font-size: 12px;
  letter-spacing: 0;
  line-height: 15px;
  width: 15rem;
`

export const Content = styled.p`
  margin-top: 1rem;
  width: 41.1rem;
  font-size: 1.4rem;
  letter-spacing: 0;
  line-height: 1.7rem;
`
export const Timestamp = styled.div`
  height: 2rem;
  margin-top: ${({ isNoteTab }) => (isNoteTab ? "0" : "-0.9rem")};
  width: 100%;
  color: ${({ theme, isNoteTab }) =>
    isNoteTab ? get(theme, "white", "white") : get(theme, "darkBlue", "darkBlue")};
  font-size: 1.4rem;
  letter-spacing: 0;
  line-height: 3rem;
  text-align: left;
  ${({ theme, isNoteTab }) => {
    if (isNoteTab) {
      return "border: none"
    }
    return `
      border-top-right-radius: 1rem;
      border-top: 1px solid ${get(theme, "lightgrey", "lightgrey")};
    `
  }}
  background-color: ${({ theme, isNoteTab }) =>
    isNoteTab ? "transparent" : get(theme, "veryFaintGrey", "lightgrey")};
`

export const InputWrapper = styled.div`
  margin-bottom: 2rem;
`

export const HeaderWrapper = styled.div`
  width: 100%;
  align-items: center;
  align-self: center;
  justify-content: center;
  background-color: ${({ theme }) => get(theme, "white", "white")};
  border-bottom: 1px solid ${({ theme }) => get(theme, "faintGrey", "lightGrey")};
  padding: 2.5rem 3rem;
`

export const HeaderText = styled(H2)`
  height: 3.5rem;
  width: 14.1rem;
  color: ${({ theme }) => get(theme, "tints.secondary.darkBlue.t10", "darkblue")};
  font-size: 3rem;
  letter-spacing: 0;
  line-height: 3.5rem;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  margin: 0;
`

export const NotesFooterWrapper = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => get(theme, "white", "white")};
  border-top: 1px solid ${({ theme }) => get(theme, "faintGrey")};
`

export const NotesButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
