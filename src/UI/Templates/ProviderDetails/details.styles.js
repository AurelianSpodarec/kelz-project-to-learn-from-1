import styled from "styled-components"
import { get } from "lodash"

export const SectionWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => get(theme, "faintGrey")};
  margin: 1rem 0;
  padding: ${({ padding }) => padding || "0"};
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const DetailsWrapper = styled.div`
  width: 80rem;
  margin-bottom: 4rem;
`
export const DetailsLogoWrapper = styled.div`
  margin-top: ${({ isEdit }) => isEdit && "6rem"};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 25%;
  svg,
  span {
    font-size: 1.6rem;
    line-height: 1.7rem;
    font-weight: 400;
  }
`

export const CustomFieldWrapper = styled.div`
  margin: 0 0 2rem;
`
