import React from "react"

// Components
import { MyAccountDetails } from "../../../../UI/Templates"
import MyAccountDetailsProvider from "./context/details.provider"

const Details = () => (
  <MyAccountDetailsProvider>
    <MyAccountDetails />
  </MyAccountDetailsProvider>
)

export default Details
