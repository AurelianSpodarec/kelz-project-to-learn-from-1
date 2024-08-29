import React from "react"
import { Helmet } from "react-helmet-async"
import { Gate } from "@4cplatform/elements/Auth"

const RegistrationConfirmation = () => (
  <>
    <Helmet>
      <title>Registration confirmation</title>
    </Helmet>
    <Gate type="registration-confirmation" />
  </>
)

export default RegistrationConfirmation
