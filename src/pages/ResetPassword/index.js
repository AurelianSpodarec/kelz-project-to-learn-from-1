import React from "react"
import { Helmet } from "react-helmet-async"
import { Gate } from "@4cplatform/elements/Auth"

const ResetPassword = () => (
  <>
    <Helmet>
      <title>Reset password</title>
    </Helmet>
    <Gate type="reset-password" />
  </>
)

export default ResetPassword
