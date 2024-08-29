import React from "react"
import { Helmet } from "react-helmet-async"
import { Gate } from "@4cplatform/elements/Auth"

const ActivateUser = () => (
  <>
    <Helmet>
      <title>Activate sser</title>
    </Helmet>
    <Gate type="activate-user" />
  </>
)

export default ActivateUser
