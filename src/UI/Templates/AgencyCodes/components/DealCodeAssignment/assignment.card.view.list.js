import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { H4 } from "@4cplatform/elements/Typography"
import { colours } from "@4cplatform/elements/Helpers"

// Components
import { ListOuterWrapper, ListWrapper } from "./assignment.styles"
import { IconWithText } from "../../../../Atoms"

const ApplicabilityList = ({ code }) => {
  const styleNew = get(code, "style_new", false)
  const styleSwitch = get(code, "style_switch", false)
  const mori = get(code, "underwriting_mori", false)
  const fmu = get(code, "underwriting_fmu", false)

  return (
    <ListOuterWrapper>
      <ListWrapper>
        <H4 margin="0 0 2rem">Journey Types</H4>
        <IconWithText
          icon={styleNew ? "check" : "close"}
          content="New"
          margin="0 0 1rem"
          iconColour={get(colours, "blue")}
        />
        <IconWithText
          icon={styleSwitch ? "check" : "close"}
          content="Switch"
          margin="0 0 1rem"
          iconColour={get(colours, "blue")}
        />
        <IconWithText
          icon={styleNew && styleSwitch ? "check-all" : "close"}
          content="All"
          margin="0 0 1rem"
          iconColour={get(colours, "blue")}
        />
      </ListWrapper>
      <ListWrapper>
        <H4 margin="0 0 2rem">Underwriting Types</H4>
        <IconWithText
          icon={mori ? "check" : "close"}
          content="Moratorium"
          margin="0 0 1rem"
          iconColour={get(colours, "blue")}
        />
        <IconWithText
          icon={fmu ? "check" : "close"}
          content="FMU"
          margin="0 0 1rem"
          iconColour={get(colours, "blue")}
        />
      </ListWrapper>
    </ListOuterWrapper>
  )
}

ApplicabilityList.propTypes = {
  code: PropTypes.object.isRequired
}

export default ApplicabilityList
