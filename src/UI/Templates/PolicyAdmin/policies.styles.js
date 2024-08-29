import styled from "styled-components"
import { get } from "lodash"

export const TableActionsWrapper = styled.div`
  display: flex;
  justify-content: ${({ hasLeftActions }) => (hasLeftActions ? "space-between" : "flex-end")};
  align-items: center;
  margin-bottom: 1rem;
`

export const TableActionsLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const TableActionsRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const SectionWrapper = styled.div`
  padding-bottom: ${({ isLast }) => (isLast ? 0 : "2rem")};
  margin-bottom: ${({ isLast }) => (isLast ? 0 : "2rem")};
  border-bottom: ${({ theme, isLast }) =>
    isLast ? "none" : `1px solid ${get(theme, "tints.primary.blue.t20")}`};
`

export const ButtonsWrapper = styled.div`
  padding-top: 3rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const MessageContainer = styled.div`
  margin-left: ${({ isItMyMessage }) => (isItMyMessage ? "2rem" : "0")};
  margin-right: ${({ isItMyMessage }) => (isItMyMessage ? "0" : "2rem")};
  display: inline-block;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`

export const MessageBody = styled.div`
  position: relative;
  background: ${({ theme, isItMyMessage }) => (!isItMyMessage ? theme.purple : theme.paleGreen)};
  padding: 1.8rem 1.5rem;
  border-radius: 3px;
  border-bottom-left-radius: ${({ isItMyMessage }) => (isItMyMessage ? "3px" : "0")};
  border-bottom-right-radius: ${({ isItMyMessage }) => (isItMyMessage ? "0" : "3px")};
`

export const Messages = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.veryFaintGrey};
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.faintGrey};
  border-bottom: 1px solid ${({ theme }) => theme.faintGrey};

  height: 50rem;
  overflow-y: scroll;
  overflow-x: hidden;
`

export const NewMessagesWrapper = styled.div`
  height: 18rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 2rem;
  div {
    width: 100%;
  }
`

export const MessageMeta = styled.div`
  display: flex;
  position: relative;
  flex-direction: ${({ isItMyMessage }) => (isItMyMessage ? "row" : "row-reverse")};
  align-items: center;
  justify-content: space-between;
`

export const MessageWrapper = styled.div`
  margin-left: ${({ isItMyMessage }) => (isItMyMessage ? "13px" : "13px")};
  margin-right: ${({ isItMyMessage }) => (isItMyMessage ? "13px" : "13px")};
`

export const AvatarWrapper = styled.div`
  flex-direction: ${({ isItMyMessage }) => (isItMyMessage ? "row-reverse" : "row")};
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`

export const MessageDateWrapper = styled.div`
  transform: translateY(-18px);
`

export const SvgWrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: ${({ isItMyMessage }) => (isItMyMessage ? "flex-end" : "flex-start")};
  svg {
    transform: ${({ isItMyMessage }) => (isItMyMessage ? "scaleX(-1)" : "scaleX(1)")};
  }
`

export const MessageIsSending = styled.div`
  margin-left: 1rem;
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ theme, isItMyMessage }) =>
    !isItMyMessage ? theme.purple : theme.paleGreen};

  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: 0.5s;
  margin-left: ${({ isItMyMessage }) => (isItMyMessage ? "3rem" : "0")};
  margin-right: ${({ isItMyMessage }) => (isItMyMessage ? "0" : "3rem")};

  &::before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    left: -15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${({ theme, isItMyMessage }) =>
      !isItMyMessage ? theme.purple : theme.paleGreen};
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 0s;
  }

  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${({ theme, isItMyMessage }) =>
      !isItMyMessage ? theme.purple : theme.paleGreen};
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 1s;
  }

  @keyframes dotFlashing {
    0% {
      background-color: ${({ theme, isItMyMessage }) =>
        !isItMyMessage ? theme.purple : theme.paleGreen};
    }
    50%,
    100% {
      background-color: ${({ isItMyMessage }) => (!isItMyMessage ? "#ebe6ff" : "#a3c9bc")};
    }
  }
`

export const TextAreaControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const NoMessagesTextWraoper = styled.div`
  position: absolute;
  bottom: 23%;
  left: 37%;
`

export const ApplicantsTableWrapper = styled.div`
  margin: ${({ margin }) => margin};
  padding: 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const TableWrapper = styled.div`
  margin: ${({ margin }) => margin};
  width: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
`

export const Divider = styled.div`
  background-color: ${({ theme }) => get(theme, "white", "white")};
  opacity: 0.3;
  height: 1px;
  width: 100%;
`
