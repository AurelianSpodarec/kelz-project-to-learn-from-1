import React from "react"
import PropTypes from "prop-types"

// Components
import { HeaderWrapper, Logo, LogoWrapper } from "./header.styles"
import UserInfo from "./header.user"

const Header = ({ panelStatus, prevPanelStatus }) => (
  <HeaderWrapper
    panelStatus={panelStatus}
    prevPanelStatus={prevPanelStatus}
    data-testid="test-header"
  >
    <LogoWrapper to="/">
      <Logo src="./logo-short.svg" alt="4C Branding" />
    </LogoWrapper>
    <UserInfo />
  </HeaderWrapper>
)

Header.propTypes = {
  panelStatus: PropTypes.string.isRequired,
  prevPanelStatus: PropTypes.string.isRequired
}

export default Header
