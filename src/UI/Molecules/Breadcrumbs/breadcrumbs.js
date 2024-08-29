import React from "react"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"

// Components
import Item from "./breadcrumbs.item"
import { Wrapper } from "./breadcrumbs.styles"

const Breadcrumbs = ({ margin, trail }) => {
  // Do not display breadcrumbs if trail is empty
  if (isEmpty(trail)) return null

  return (
    <Wrapper margin={margin}>
      {trail.map((item, i) => {
        const isLast = i === trail.length - 1
        return <Item key={item.label} isLast={isLast} {...item} />
      })}
    </Wrapper>
  )
}

Breadcrumbs.defaultProps = {
  margin: "5rem 0 1rem 0",
  trail: []
}

Breadcrumbs.propTypes = {
  /**
   * This determines the margin value of the outermost wrapper
   */
  margin: PropTypes.string,
  /**
   * This array determines what links are available in the breadcrumbs, the order in which they appear, and where they lead
   */
  trail: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string
    })
  )
}

export default Breadcrumbs
