import React from "react"
import PropTypes from "prop-types"

// Components
import { BodyComponentWrapper } from "./panel.styles"

const Body = ({ children, hasHeader, isDeleted }) => (
  <BodyComponentWrapper hasHeader={hasHeader} isDeleted={isDeleted}>
    {children}
  </BodyComponentWrapper>
)

Body.defaultProps = {
  children: null,
  hasHeader: true,
  isDeleted: false
}

Body.propTypes = {
  children: PropTypes.any,
  hasHeader: PropTypes.bool,
  isDeleted: PropTypes.bool
}

export default Body
