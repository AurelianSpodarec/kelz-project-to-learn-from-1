import React from "react"
import { get, isEmpty } from "lodash"
import { P } from "@4cplatform/elements/Typography"

// Components
import { LabelWithText } from "../../Atoms"

// Helpers
import { ClientsContext } from "./clients.context"

const ClientsPanelHeaderAddress = () => {
  const { viewLoading, viewData } = React.useContext(ClientsContext)
  const address = get(viewData, "address")
  return (
    <LabelWithText label="Address" appearance="light" isLoading={viewLoading}>
      {address && !isEmpty(address) ? (
        <>
          {get(viewData, "address.line_one") && (
            <P appearance="light" margin="0" isLoading={viewLoading}>
              {get(viewData, "address.line_one")}
            </P>
          )}
          {get(viewData, "address.line_two") && (
            <P appearance="light" margin="0" isLoading={viewLoading}>
              {get(viewData, "address.line_two")}
            </P>
          )}
          {get(viewData, "address.city") && (
            <P appearance="light" margin="0" isLoading={viewLoading}>
              {get(viewData, "address.city")}
            </P>
          )}
          {get(viewData, "address.county") && (
            <P appearance="light" margin="0" isLoading={viewLoading}>
              {get(viewData, "address.county")}
            </P>
          )}
          {get(viewData, "address.postcode") && (
            <P appearance="light" margin="0" isLoading={viewLoading}>
              {get(viewData, "address.postcode")}
            </P>
          )}
        </>
      ) : (
        "-"
      )}
    </LabelWithText>
  )
}

export default ClientsPanelHeaderAddress
