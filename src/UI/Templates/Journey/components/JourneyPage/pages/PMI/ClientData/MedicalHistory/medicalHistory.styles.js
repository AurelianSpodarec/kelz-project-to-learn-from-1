import styled from "styled-components"
import { get } from "lodash"

export const NotesWrapper = styled.div`
  border-top: ${({ theme }) => `1px solid ${get(theme, "faintGrey", "black")}`};
  padding-top: 2rem;
`

export const AddNoteButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const NotesTitleWrapper = styled.div`
  display: flex;
`

export const NotesNumberWrapper = styled.div`
  border-radius: 50%;
  margin-left: 1rem;
  background-color: ${({ theme }) => get(theme, "lightGrey", "lightgrey")};
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`
