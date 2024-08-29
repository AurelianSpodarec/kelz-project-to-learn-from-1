import React from "react"
import PropTypes from "prop-types"
import moment from "moment"
import { SmallText } from "@4cplatform/elements/Typography"
import { Icon } from "@4cplatform/elements/Atoms"

// Components
import { DateRangeWrapper, DateWrapper } from "./assignment.styles"

const DateRange = ({ start, end, isLoading }) => (
  <DateRangeWrapper>
    <DateWrapper>
      <SmallText margin="0" isLoading={isLoading}>
        Start date:
      </SmallText>
      <SmallText margin="0" isLoading={isLoading}>
        {moment(start, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm")}
      </SmallText>
    </DateWrapper>
    <Icon icon="arrow-right" />
    <DateWrapper>
      <SmallText margin="0" isLoading={isLoading}>
        End date:
      </SmallText>
      <SmallText margin="0" isLoading={isLoading}>
        {moment(end, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm")}
      </SmallText>
    </DateWrapper>
  </DateRangeWrapper>
)

DateRange.defaultProps = {
  isLoading: false
}

DateRange.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  isLoading: PropTypes.bool
}

export default DateRange
