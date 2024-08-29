import styled from "styled-components"
import { get } from "lodash"

export const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const InputsWrapper = styled.div`
  width: 100%;
  min-width: 40rem;
`

export const SectionWrapper = styled.div`
  border-bottom: ${({ theme, noBorder }) =>
    !noBorder && `1px solid ${get(theme, "faintGrey", "grey")}`};
  margin: 0 0 2rem;
  padding-bottom: 1rem;
  width: 60%;
`
export const CustomFieldsWrapper = styled.div`
  margin: 0 0 2rem;
  padding-bottom: 1rem;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;
  border-top: 1px solid ${({ theme }) => get(theme, "faintGrey", "grey")};
`
export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 25%;
  margin: 2rem;
  padding-top: 2rem;
  svg,
  span {
    font-size: 1.6rem;
    line-height: 1.7rem;
    font-weight: 400;
  }
`

export const UploadWrapper = styled.div`
  display: flex;

  > div {
    margin-left: 2rem;
    line-height: 4rem;
  }
`

export const UploadImage = styled.img`
  display: block;
  margin-bottom: 2rem;
`
