import React from "react"
import { Helmet } from "react-helmet-async"
import { Gate } from "@4cplatform/elements/Auth"

const TwoFactorAuth = () => (
  <>
    <Helmet>
      <title>Two-Factor authentication</title>
    </Helmet>
    <Gate type="two-factor-authentication" />
  </>
)

export default TwoFactorAuth
