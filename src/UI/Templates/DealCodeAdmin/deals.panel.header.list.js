import React from "react"
import { get } from "lodash"
import { H4 } from "@4cplatform/elements/Typography"

// Components
import { ListOuterWrapper, ListWrapper } from "./deals.styles"
import { IconWithText } from "../../Atoms"

// Helpers
import { DealCodesContext } from "./deals.context"

const ApplicabilityList = () => {
  const { selectedDealCode, selectLoading } = React.useContext(DealCodesContext)
  const styleNew = get(selectedDealCode, "style_new", false)
  const styleSwitch = get(selectedDealCode, "style_switch", false)
  const mori = get(selectedDealCode, "underwriting_mori", false)
  const fmu = get(selectedDealCode, "underwriting_fmu", false)

  return (
    <ListOuterWrapper>
      <ListWrapper>
        <H4 appearance="light" isLoading={selectLoading} margin="0 0 2rem" loadingWidth="13rem">
          Journey Types
        </H4>
        <IconWithText
          icon={styleNew ? "check" : "close"}
          appearance="light"
          content="New"
          margin="0 0 1rem"
          isLoading={selectLoading}
          loadingWidth="10rem"
        />
        <IconWithText
          icon={styleSwitch ? "check" : "close"}
          appearance="light"
          content="Switch"
          margin="0 0 1rem"
          isLoading={selectLoading}
          loadingWidth="10rem"
        />
        <IconWithText
          icon={styleNew && styleSwitch ? "check-all" : "close"}
          appearance="light"
          content="All"
          margin="0 0 1rem"
          isLoading={selectLoading}
          loadingWidth="10rem"
        />
      </ListWrapper>
      <ListWrapper>
        <H4 appearance="light" isLoading={selectLoading} margin="0 0 2rem" loadingWidth="13rem">
          Underwriting Types
        </H4>
        <IconWithText
          icon={mori ? "check" : "close"}
          appearance="light"
          content="Moratorium"
          margin="0 0 1rem"
          isLoading={selectLoading}
          loadingWidth="10rem"
        />
        <IconWithText
          icon={fmu ? "check" : "close"}
          appearance="light"
          content="FMU"
          margin="0 0 1rem"
          isLoading={selectLoading}
          loadingWidth="10rem"
        />
      </ListWrapper>
    </ListOuterWrapper>
  )
}

export default ApplicabilityList
