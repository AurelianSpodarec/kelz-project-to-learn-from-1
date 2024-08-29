import React from "react"
import { Helmet } from "react-helmet-async"
import { Gate } from "@4cplatform/elements/Auth"

const ForgottenPassword = () => (
  <>
    <Helmet>
      <title>Forgotten password</title>
    </Helmet>
    <Gate type="forgotten-password" />
  </>
)

export default ForgottenPassword
