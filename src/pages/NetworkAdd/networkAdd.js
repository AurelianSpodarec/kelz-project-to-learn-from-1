import React from "react"
import { Redirect } from "react-router-dom"
import { H1, P } from "@4cplatform/elements/Typography"
import { usePost } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useTranslations } from "@4cplatform/elements/Translations"
import { Helmet } from "react-helmet-async"

// Helpers
import { NETWORK_ADMIN, DASHBOARD } from "../../config/pages"

// Components
import { Breadcrumbs, ConfirmationModal } from "../../UI/Molecules"
import { NetworkCreate } from "../../UI/Templates"
import { Wrapper } from "./networkAdd.styles"

const NetworkAdd = () => {
  const t = useTranslations()
  const { addAlert } = React.useContext(AlertsContext)
  const [redirect, setRedirect] = React.useState(null)
  const [isOpen, setOpen] = React.useState(false)

  // Create Network request
  const [create, { loading }] = usePost({
    endpoint: "/networks",
    onCompleted: () => {
      // Display alert and set redirect
      addAlert({
        message: t("NETWORK_ADD_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      setRedirect(NETWORK_ADMIN.path)
    },
    onError: err => {
      const { status, message } = err
      addAlert({
        message: `There was an error creating the network - status ${status}, ${message}`,
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
        <title>Add network</title>
      </Helmet>
      <Wrapper>
        <Breadcrumbs
          trail={[
            { label: "Dashboard", link: DASHBOARD.path },
            { label: "Networks", link: NETWORK_ADMIN.path },
            { label: "Add network" }
          ]}
        />
        <H1 margin="0 0 4rem">Add network</H1>
        <NetworkCreate
          onSubmit={body => create({ body })}
          isLoading={loading}
          onCancel={() => setOpen(true)}
        />
        {isOpen && (
          <ConfirmationModal
            confirmIcon="cancel"
            confirmText="Yes"
            confirmAppearance="error"
            cancelAppearance="errorGhost"
            onClose={() => setOpen(false)}
            onConfirm={() => setRedirect("/networks")}
          >
            <P>Are you sure you want to cancel this action and return to the Networks page?</P>
          </ConfirmationModal>
        )}
      </Wrapper>
    </>
  )
}

export default NetworkAdd
