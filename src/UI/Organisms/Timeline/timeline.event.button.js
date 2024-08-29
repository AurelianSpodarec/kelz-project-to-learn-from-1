import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { Icon } from "@4cplatform/elements/Atoms"
import { colours } from "@4cplatform/elements/Helpers"

// Components
import { EventButton, EventButtonIconWrapper } from "./timeline.styles"

const TimelineButton = ({ children, onClick, id, buttonIcon, name, index }) => (
  <EventButton onClick={() => onClick(id)} data-testid={`${name}-timeline-button_${index}`}>
    {children}
    {!!buttonIcon && (
      <EventButtonIconWrapper>
        <Icon colour={get(colours, "white", "white")} size="1.5rem" icon={buttonIcon} />
      </EventButtonIconWrapper>
    )}
  </EventButton>
)

TimelineButton.defaultProps = {
  buttonIcon: null
}

TimelineButton.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  buttonIcon: PropTypes.string,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}

export default TimelineButton
