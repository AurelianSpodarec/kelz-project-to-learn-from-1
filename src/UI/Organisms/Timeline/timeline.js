import React from "react"
import PropTypes from "prop-types"
import { get, isEmpty } from "lodash"
import moment from "moment"
import { v4 as uuid } from "uuid"

// Components
import { Wrapper } from "./timeline.styles"
import Event from "./timeline.event"

const Timeline = ({ margin, events, name, orderBy }) => {
  // Do not render this component if no events are passed
  if (isEmpty(events)) return null

  return (
    <Wrapper margin={margin} data-testid={`${name}-timeline-wrapper`}>
      {events
        .sort((a, b) => {
          const date1 = moment(get(a, "date"), "YYYY-MM-DD HH:mm")
          const date2 = moment(get(b, "date"), "YYYY-MM-DD HH:mm")

          if (date1.isBefore(date2)) {
            return orderBy === "desc" ? 1 : -1
          }
          if (date1.isAfter(date2)) {
            return orderBy === "desc" ? -1 : 1
          }
          return 0
        })
        .map((event, i) => {
          const { content, icon, colour, iconColour, date, id, onClick, buttonIcon } = event
          const isLast = i === events.length - 1

          return (
            <Event
              key={uuid()}
              content={content}
              icon={icon}
              colour={colour}
              iconColour={iconColour}
              date={date}
              isLast={isLast}
              id={id}
              onClick={onClick}
              buttonIcon={buttonIcon}
              name={name}
              index={i}
            />
          )
        })}
    </Wrapper>
  )
}

Timeline.defaultProps = {
  margin: "0 0 2rem",
  events: [],
  name: "timeline",
  orderBy: "desc"
}

Timeline.propTypes = {
  /**
   * The margin prop passed to the wrapper
   */
  margin: PropTypes.string,
  /**
   * The events array rendered within the Timeline. If empty, the component will not render.
   */
  events: PropTypes.array,
  /**
   * The string used within testids inside the Timeline.
   */
  name: PropTypes.string,
  /**
   * The direction in which to order the Timeline
   */
  orderBy: PropTypes.oneOf(["desc", "asc"])
}

export default Timeline
