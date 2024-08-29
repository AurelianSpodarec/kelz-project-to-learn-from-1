import React from "react"

// Components
import Body from "./hospitalPreference.body"
import HospitalPreferenceProvider from "./context/hospitalPreference.provider.js"

const HospitalPreference = () => (
  <HospitalPreferenceProvider>
    <Body />
  </HospitalPreferenceProvider>
)

export default HospitalPreference
