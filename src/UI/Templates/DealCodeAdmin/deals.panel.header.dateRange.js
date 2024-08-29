import React from "react"
import PropTypes from "prop-types"
import moment from "moment"
import { colours } from "@4cplatform/elements/Helpers"
import { SmallText } from "@4cplatform/elements/Typography"
import { Icon } from "@4cplatform/elements/Atoms"

// Components
import { DateRangeWrapper, DateWrapper } from "./deals.styles"

const DateRange = ({ start, end, isLoading }) => (
  <DateRangeWrapper>
    <DateWrapper>
      <SmallText
        appearance="light"
        margin={isLoading ? "0 0 0.5rem" : "0"}
        isLoading={isLoading}
        loadingWidth="13rem"
      >
        Start date:
      </SmallText>
      <SmallText appearance="light" margin="0" isLoading={isLoading} loadingWidth="10rem">
        {moment(start, "YYYY-MM-DDTHH:mmZ").format("DD/MM/YYYY HH:mm")}
      </SmallText>
    </DateWrapper>
    <Icon icon="arrow-right" colour={colours.white} isLoading={isLoading} />
    <DateWrapper>
      <SmallText
        appearance="light"
        margin={isLoading ? "0 0 0.5rem" : "0"}
        isLoading={isLoading}
        loadingWidth="13rem"
      >
        End date:
      </SmallText>
      <SmallText appearance="light" margin="0" isLoading={isLoading} loadingWidth="10rem">
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
