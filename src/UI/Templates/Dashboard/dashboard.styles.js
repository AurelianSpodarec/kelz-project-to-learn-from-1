import styled, { css } from "styled-components"
import Container from "@4cplatform/elements/Atoms/Container"
import { Link } from "react-router-dom"
import { shade } from "polished"

export const DashWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  margin-top: 7rem;
  margin-bottom: 5rem;
  padding: 0;
  width: 80%;
`

export const DashHeader = styled.div`
  margin-bottom: 3rem;
`

export const CategoriesWrapper = styled.div`
  display: flex;
`

export const CategoryWrapper = styled.div`
  padding: 0 1rem;
  flex: 1;

  ${({ isFirst, isLast }) => {
    if (isFirst) {
      return css`
        padding: 0 1rem 0 0;
      `
    }
    if (isLast) {
      return css`
        padding: 0 0 0 1rem;
      `
    }
  }}
`

const cardWrapperStyles = css`
  text-decoration: none;
  display: block;
  color: ${({ theme }) => theme.white};
  background: ${({ background }) => background};
  padding: 1.1rem;
  margin-bottom: 1rem;
  box-shadow: 0 0 10px 0 rgba(0, 34, 43, 0.05);
  border-radius: 0.3rem;
  position: relative;
  min-height: 10rem;

  &:hover {
    text-decoration: none;
    background: ${({ background }) => shade(0.2, background)};
  }
`

export const CardWrapperLink = styled(Link)`
  ${cardWrapperStyles}
`

export const CardWrapperDiv = styled.div`
  ${cardWrapperStyles}
`

export const CardTitle = styled.h4`
  font-size: 2rem;
  line-height: 2.5rem;
  margin: 0 0 0.5rem;
`

export const CardDescription = styled.p`
  font-size: 1.4rem;
  line-height: 1.7rem;
  margin: 0 0 1rem;
`

export const SimulatedBadgeWrapper = styled.div`
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0.5rem;
  border-radius: 0.3rem 0 0.3rem 0;
`

export const LoadingCard = styled.div`
  margin: 1rem 0 2rem;
`

export const LoadingWrapper = styled.p`
  font-size: 1.4rem;
  line-height: 1.7rem;
  margin: 0 0 1rem;
`

export const LoadingHeader = styled.h3``
