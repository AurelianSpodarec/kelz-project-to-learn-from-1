import React from "react"
import PropTypes from "prop-types"
import { isNull } from "lodash"
import moment from "moment"
import { colours } from "@4cplatform/elements/Helpers"
import { Icon } from "@4cplatform/elements/Atoms"

// Component
import { EventWrapper, IconWrapper, Text } from "./timeline.styles"
import TimelineButton from "./timeline.event.button"

const Event = ({
  content,
  icon,
  colour,
  iconColour,
  date,
  isLast,
  onClick,
  id,
  buttonIcon,
  name,
  index
}) => {
  const isInteractive = !isNull(onClick)
  return (
    <EventWrapper isLast={isLast} data-testid={`${name}-timeline-event_wrapper_${index}`}>
      <IconWrapper iconColour={iconColour} data-testid={`${name}-timeline-icon_wrapper_${index}`}>
        <Icon icon={icon} colour={colour} size="1.6rem" />
      </IconWrapper>
      {isInteractive && (
        <TimelineButton onClick={onClick} id={id} buttonIcon={buttonIcon} name={name} index={index}>
          {content}
        </TimelineButton>
      )}
      {!isInteractive && <Text data-testid={`${name}-timeline-text_${index}`}>{content}</Text>}
      <Text data-testid={`${name}-timeline-date_${index}`}>
        {moment(date, "YYYY-MM-DD HH:mm").format("DD/MM/YY HH:mm")}
      </Text>
    </EventWrapper>
  )
}

Event.defaultProps = {
  icon: "plus",
  colour: colours.white,
  iconColour: colours.darkBlue,
  isLast: false,
  onClick: null,
  buttonIcon: null
}

Event.propTypes = {
  content: PropTypes.string.isRequired,
  icon: PropTypes.string,
  colour: PropTypes.string,
  iconColour: PropTypes.string,
  date: PropTypes.string,
  isLast: PropTypes.bool,
  onClick: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  buttonIcon: PropTypes.string,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}

export default Event
