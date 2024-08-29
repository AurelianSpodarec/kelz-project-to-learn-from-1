import React from "react"
import { Helmet } from "react-helmet-async"
import { Gate } from "@4cplatform/elements/Auth"

const Login = () => (
  <>
    <Helmet>
      <title>Login</title>
    </Helmet>
    <Gate type="login" />
  </>
)

export default Login
