import React from "react"
import PropTypes from "prop-types"
import { Skeleton } from "@4cplatform/elements/Molecules"

// Helper
import { colours } from "@4cplatform/elements/Helpers"

// Components
import {
  CardWrapperLink,
  CardWrapperDiv,
  CardTitle,
  CardDescription,
  LoadingWrapper,
  LoadingCard
} from "./dashboard.styles"
import SimulatedBadge from "./dashboard.card.badge"

const Card = ({ link, colour, length, isLoading }) => {
  const { title, route, description, isSimulated } = link
  const CardWrapper = route ? CardWrapperLink : CardWrapperDiv

  // Loading state for cards
  if (isLoading) {
    return (
      <LoadingCard>
        <Skeleton count={2} wrapper={LoadingWrapper} />
      </LoadingCard>
    )
  }

  return (
    <CardWrapper
      to={route}
      background={colour}
      length={length}
      simulated={isSimulated ? isSimulated.toString() : ""}
    >
      {isSimulated && <SimulatedBadge />}
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardWrapper>
  )
}

Card.defaultProp = {
  colour: colours.faintGrey,
  length: 4,
  isLoading: false
}

Card.propTypes = {
  link: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    route: PropTypes.string,
    isSimulated: PropTypes.bool
  }).isRequired,
  colour: PropTypes.string,
  length: PropTypes.number,
  isLoading: PropTypes.bool
}

export default Card
