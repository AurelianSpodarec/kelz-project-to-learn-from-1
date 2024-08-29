import styled from "styled-components"
import { get } from "lodash"

export const UploadedFilesWrapper = styled.div`
  width: 35%;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => get(theme, "lightGrey")};
  border-radius: 6px;
  margin: 0 0 2rem 0;
`
export const UploadedFile = styled.div`
  border-top: 0.5px solid ${({ theme }) => get(theme, "faintGrey")};
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
