import React from "react"

// Components
import Body from "./applicants.body"
import ApplicantsProvider from "./context/applicants.provider"

const Applicants = () => (
  <ApplicantsProvider>
    <Body />
  </ApplicantsProvider>
)

export default Applicants
