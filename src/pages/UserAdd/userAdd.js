import React from "react"
import { Redirect, useLocation } from "react-router-dom"
import { H1 } from "@4cplatform/elements/Typography"
import { usePost } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { Helmet } from "react-helmet-async"

// Components
import Breadcrumbs from "../../UI/Molecules/Breadcrumbs"
import { UserCreate } from "../../UI/Templates"
import { Wrapper } from "./userAdd.styles"
import { getAddUserBreadcrumbs } from "../../UI/Helpers"

const UserAdd = () => {
  const { addAlert } = React.useContext(AlertsContext)
  const [redirect, setRedirect] = React.useState(null)
  const { pathname } = useLocation()
  const [, location, slug] = pathname.split("/")
  const breadcrumbsTrail = getAddUserBreadcrumbs(location || "users", slug)

  // Create User request
  const [create, { loading, error }] = usePost({
    endpoint: "/users",
    onCompleted: () => {
      // Display alert and set redirect
      addAlert({
        message: "User was successfully created",
        type: "success",
        dismissible: true,
        timeout: 5
      })
      setRedirect(breadcrumbsTrail[1].link)
    },
    onError: err => {
      const { status, message } = err
      addAlert({
        message: `There was an error creating the user - status ${status}, ${message}`,
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Redirect if truthy
  if (redirect) return <Redirect to={redirect} />

  return (
    <>
      <Helmet>
        <title>Add user</title>
      </Helmet>
      <Wrapper>
        <Breadcrumbs trail={breadcrumbsTrail} />
        <H1 margin="0 0 4rem">Add user</H1>
        <UserCreate onSubmit={body => create({ body })} isLoading={loading} apiErrors={error} />
      </Wrapper>
    </>
  )
}

export default UserAdd
