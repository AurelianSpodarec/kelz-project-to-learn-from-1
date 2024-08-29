import styled from "styled-components"
import { get } from "lodash"

export const Wrapper = styled.div`
  width: 80rem;
`

export const SectionWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => get(theme, "faintGrey", "grey")};
  padding-bottom: 2rem;
  margin: 0 0 2rem;
`

export const FieldRow = styled.div`
  display: flex;
  margin: 0 0 2rem;
`

export const FieldWrapper = styled.div`
  flex: 1;
`

export const ButtonsWrapper = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: space-between;
`
