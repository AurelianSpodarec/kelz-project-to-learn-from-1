/* eslint-disable no-unused-vars */
import React, { useContext } from "react"
import { get } from "lodash"

// Helpers
import { AgencyCodesContext } from "../agencyCodes.context"

// Components
import { PanelBody } from "../../../Molecules/FlyOutPanel"
import RequestAcceptance from "../components/RequestAcceptance"

const AgencyCodeRequestsPanelBody = () => (
  <PanelBody>
    <RequestAcceptance />
  </PanelBody>
)

export default AgencyCodeRequestsPanelBody
