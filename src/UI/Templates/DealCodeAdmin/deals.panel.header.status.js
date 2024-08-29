import React from "react"
import { get } from "lodash"
import { colours } from "@4cplatform/elements/Helpers"

// Helpers
import { DealCodesContext } from "./deals.context"

// Components
import { IconWithText, LabelWithText } from "../../Atoms"

const Status = () => {
  const { selectedDealCode, selectLoading } = React.useContext(DealCodesContext)
  const isActive = get(selectedDealCode, "active", false)

  return (
    <LabelWithText label="Status:" appearance="light" isLoading={selectLoading}>
      <IconWithText
        icon={isActive ? "check" : "close"}
        content={isActive ? "Active" : "Inactive"}
        appearance="light"
        iconBackgroundColour={isActive ? get(colours, "green") : get(colours, "red")}
      />
    </LabelWithText>
  )
}

export default Status
