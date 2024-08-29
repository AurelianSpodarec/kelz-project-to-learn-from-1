/* eslint-disable no-unused-vars */
import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { H2, H3, H4 } from "@4cplatform/elements/Typography"
import { Button } from "@4cplatform/elements/Molecules"
import { AuthWrapper } from "@4cplatform/elements/Auth"

// Helpers
import { DealCodesContext } from "./deals.context"
import { getTypeIcon } from "./deals.helpers"
import { PageContext } from "../../Organisms"

// Components
import { PanelHeader } from "../../Molecules/FlyOutPanel"
import { IconWithText, LabelWithText } from "../../Atoms"
import DateRange from "./deals.panel.header.dateRange"
import ApplicabilityList from "./deals.panel.header.list"
import Status from "./deals.panel.header.status"

const DealCodesPanelHeader = ({ selectedDealCode, context }) => {
  const { selectLoading, onDeleteDealCode, deleteLoading } = React.useContext(DealCodesContext)
  const { setPanelStatus } = React.useContext(PageContext)
  const name = get(selectedDealCode, "name", "-")
  const providerName = get(selectedDealCode, "provider.name", "-")
  const product = get(selectedDealCode, "product", "-")
  const description = get(selectedDealCode, "description", "-")

  return (
    <PanelHeader>
      {/* Title and subtitle */}
      <H2 margin="1rem 0 2rem 0" appearance="light" isLoading={selectLoading}>
        {name}
      </H2>{" "}
      <H3 margin="0 0 .5rem 0" appearance="light" isLoading={selectLoading}>
        {providerName}
      </H3>{" "}
      <H4 margin="0 0 2rem" appearance="light" isLoading={selectLoading}>
        {product}
      </H4>
      {/* Date Range */}
      <DateRange
        start={get(selectedDealCode, "start_date")}
        end={get(selectedDealCode, "end_date")}
        isLoading={selectLoading}
      />
      {/* Type info & Status */}
      <IconWithText
        icon="pound"
        appearance="light"
        content={get(selectedDealCode, "deal_code", "-")}
        margin="0 0 1rem"
        isLoading={selectLoading}
      />
      <IconWithText
        icon={getTypeIcon(get(selectedDealCode, "product_type", "PMI"))}
        appearance="light"
        content={get(selectedDealCode, "product_type", "-")}
        margin="0 0 2rem"
        isLoading={selectLoading}
      />
      <Status />
      <ApplicabilityList />
      {/* View content */}
      {context === "open" && (
        <>
          <AuthWrapper roles={["SYS_ADMIN", "SUPPORT_ADMIN"]}>
            <Button
              appearance="whiteGhost"
              trailingIcon="account-plus"
              margin="0 0 1rem"
              onClick={() => setPanelStatus("wide")}
              isLoading={selectLoading}
            >
              Edit Deal Code
            </Button>
          </AuthWrapper>
        </>
      )}
      {/* Edit content */}
      {context === "wide" && (
        <>
          <LabelWithText
            label="Description"
            content={description}
            appearance="light"
            margin="0 0 2rem"
          />

          <AuthWrapper roles={["SYS_ADMIN"]}>
            <Button
              appearance="error"
              trailingIcon="delete"
              margin="0 0 1rem"
              onClick={onDeleteDealCode}
              isLoading={deleteLoading}
            >
              Delete Deal Code
            </Button>
          </AuthWrapper>
        </>
      )}
    </PanelHeader>
  )
}

DealCodesPanelHeader.propTypes = {
  selectedDealCode: PropTypes.object,
  context: PropTypes.oneOf(["open", "wide"]).isRequired
}

export default DealCodesPanelHeader
