import React from "react"

// Components
import { SharedAgencyCodes } from "../../../../../../UI/Templates"
import SharedAgencyCodesProvider from "./context/sharedAgencyCodes.provider"

const MyAccountSharedAgencyCodes = () => (
  <SharedAgencyCodesProvider>
    <SharedAgencyCodes />
  </SharedAgencyCodesProvider>
)

export default MyAccountSharedAgencyCodes
