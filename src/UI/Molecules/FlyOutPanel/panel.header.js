import React from "react"
import PropTypes from "prop-types"

// Helpers
import { PageContext } from "../../Organisms"

// Components
import { HeaderComponentWrapper } from "./panel.styles"

const Header = ({ children, isDeleted, padding }) => {
  const {
    panelStatusControls: { panelStatus }
  } = React.useContext(PageContext)

  return (
    <HeaderComponentWrapper isDeleted={isDeleted} padding={padding} status={panelStatus}>
      {children}
    </HeaderComponentWrapper>
  )
}

Header.defaultProps = {
  children: null,
  isDeleted: false,
  padding: "3rem"
}

Header.propTypes = {
  children: PropTypes.any,
  isDeleted: PropTypes.bool,
  padding: PropTypes.string
}

export default Header
