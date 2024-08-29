import styled from "styled-components"
import { get } from "lodash"

export const NotesHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0.5rem 2rem;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => get(theme, "faintGrey")};
`
export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const GreyLine = styled.div`
  height: 0.1rem;
  width: 100%;
  background: ${({ theme }) => get(theme, "faintGrey")};
`
