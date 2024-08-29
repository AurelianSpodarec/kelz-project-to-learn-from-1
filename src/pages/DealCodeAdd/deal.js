import React from "react"
import { Redirect } from "react-router-dom"
import { H1, P } from "@4cplatform/elements/Typography"
import { useGet, usePost } from "@4cplatform/elements/Api"
import { useTranslations } from "@4cplatform/elements/Translations"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { Container } from "@4cplatform/elements/Atoms"
import { Helmet } from "react-helmet-async"

// Helpers
import { DASHBOARD, DEAL_CODE_ADMIN } from "../../config/pages"

// Components
import { Breadcrumbs, ConfirmationModal } from "../../UI/Molecules"
import { DealCodeCreate } from "../../UI/Templates"

const DealCodeAdd = () => {
  const t = useTranslations()
  const { addAlert } = React.useContext(AlertsContext)
  const [redirect, setRedirect] = React.useState(null)
  const [isOpen, setOpen] = React.useState(false)

  // Provider index
  const { data: providers, loading: providersLoading } = useGet({
    endpoint: "/providers",
    onError: () => {
      addAlert({
        message: t("PROVIDERS_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Deal code creation
  const [create, { loading: createLoading }] = usePost({
    endpoint: "/deal-codes",
    onCompleted: () => {
      addAlert({
        type: "success",
        message: t("DEAL_CODE_CREATE_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      setRedirect("/deal-codes")
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("DEAL_CODE_CREATE_ERROR"),
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
        <title>Add deal code</title>
      </Helmet>
      <Container width="80%">
        <Breadcrumbs
          trail={[
            { label: "Dashboard", link: DASHBOARD.path },
            { label: "Deal codes", link: DEAL_CODE_ADMIN.path },
            { label: "Add deal code" }
          ]}
        />
        <H1 margin="0 0 4rem">Add deal code</H1>
        <DealCodeCreate
          providers={providers}
          onSubmit={body => create({ body })}
          isLoading={providersLoading || createLoading}
          onCancel={() => setOpen(true)}
        />
        {isOpen && (
          <ConfirmationModal
            confirmIcon="cancel"
            confirmText="Yes"
            confirmAppearance="error"
            cancelAppearance="errorGhost"
            onClose={() => setOpen(false)}
            onConfirm={() => setRedirect("/deal-codes")}
          >
            <P>Are you sure you want to cancel this action and return to the Deal codes page?</P>
          </ConfirmationModal>
        )}
      </Container>
    </>
  )
}

export default DealCodeAdd
