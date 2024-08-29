import React from "react"
import { Helmet } from "react-helmet-async"
import { Gate } from "@4cplatform/elements/Auth"

const Register = () => (
  <>
    <Helmet>
      <title>Register</title>
    </Helmet>
    <Gate type="register" />
  </>
)

export default Register
