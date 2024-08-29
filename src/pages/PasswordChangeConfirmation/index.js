import React from "react"
import { Helmet } from "react-helmet-async"
import { Gate } from "@4cplatform/elements/Auth"

const ResetPassword = () => (
  <>
    <Helmet>
      <title>Password change confirmation</title>
    </Helmet>
    <Gate type="password-change-confirmation" />
  </>
)

export default ResetPassword
