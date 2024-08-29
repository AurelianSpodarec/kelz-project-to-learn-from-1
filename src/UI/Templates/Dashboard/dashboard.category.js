import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import H3 from "@4cplatform/elements/Typography/H3"
import { v4 as uuid } from "uuid"

// Components
import { CategoryWrapper } from "./dashboard.styles"
import Card from "./dashboard.card"

const Category = ({ category, isFirst, isLast, length, index, isLoading }) => {
  const { title, links, colour } = category

  // If the category is an array, split it into subcategories
  if (Array.isArray(category)) {
    return (
      <CategoryWrapper
        isFirst={isFirst}
        isLast={isLast}
        data-testid={`dash-category-${index}`}
        length={length}
      >
        {category.map(group => (
          <React.Fragment key={uuid()}>
            <H3 margin="0 0 1rem" isLoading={isLoading}>
              {get(group, "title")}
            </H3>
            {get(group, "links", []).map(link => (
              <Card
                link={link}
                colour={get(group, "colour")}
                length={length}
                key={uuid()}
                isLoading={isLoading}
              />
            ))}
          </React.Fragment>
        ))}
      </CategoryWrapper>
    )
  }

  // If the category is a regular object, render all cards
  return (
    <CategoryWrapper
      isFirst={isFirst}
      isLast={isLast}
      data-testid={`dash-category-${title.toLowerCase()}`}
      length={length}
    >
      <H3 margin="0 0 1rem" isLoading={isLoading}>
        {title}
      </H3>
      {links.map(link => (
        <Card link={link} colour={colour} length={length} key={uuid()} isLoading={isLoading} />
      ))}
    </CategoryWrapper>
  )
}

Category.defaultProps = {
  length: 4,
  isLoading: false
}

Category.propTypes = {
  category: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  length: PropTypes.number,
  index: PropTypes.number.isRequired,
  isLoading: PropTypes.bool
}

export default Category
