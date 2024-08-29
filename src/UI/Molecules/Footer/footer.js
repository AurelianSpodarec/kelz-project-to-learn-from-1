import React from "react"
import PropTypes from "prop-types"
import moment from "moment"

// Components
import { FooterWrapper, FooterText } from "./footer.styles"

const Footer = ({ panelStatus, prevPanelStatus }) => (
  <FooterWrapper
    panelStatus={panelStatus}
    prevPanelStatus={prevPanelStatus}
    data-testid="test-footer"
  >
    {/* TODO: Make version reference a variable instead of being hard-coded */}
    <FooterText>V:0.0.1</FooterText>
    <FooterText>&copy; Copyright 4C Platform {moment().format("YYYY")}</FooterText>
  </FooterWrapper>
)

Footer.propTypes = {
  panelStatus: PropTypes.string.isRequired,
  prevPanelStatus: PropTypes.string.isRequired
}

export default Footer
