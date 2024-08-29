import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { get } from "lodash"
import { P, H1 } from "@4cplatform/elements/Typography"
import { usePost } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { Container } from "@4cplatform/elements/Atoms"
import { useTranslations } from "@4cplatform/elements/Translations"

// Helpers
import { PROVIDER_ADMIN, DASHBOARD } from "../../config/pages"

// Components
import { Breadcrumbs, ConfirmationModal } from "../../UI/Molecules"
import { ProviderCreate } from "../../UI/Templates"

const ProviderAdd = () => {
  const t = useTranslations()
  const { addAlert } = React.useContext(AlertsContext)
  const [redirect, setRedirect] = React.useState(null)
  const [isOpen, setOpen] = React.useState(false)
  const [created, setCreated] = useState(false)
  const [provider, setProvider] = useState(null)
  const [uploadLogo, setUploadLogo] = useState(null)

  // Create Provider request
  const [create, { loading }] = usePost({
    endpoint: "/providers",
    onCompleted: () => setCreated(true),
    onError: ({ status, message }) =>
      addAlert({
        message: `There was an error creating the provider - status ${status}, ${message}`,
        type: "error",
        dismissible: true,
        timeout: 5
      })
  })

  // Upload Logo for Provider request
  const [onLogoUpdate, { loading: isLogoUpdateLoading }] = usePost({
    endpoint: "/providers/:slug/logo",
    params: {
      slug: get(provider, "slug", "")
    },
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onCompleted: () => {
      addAlert({
        message: t("LOGO_UPDATE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      setRedirect(PROVIDER_ADMIN.path)
    },
    onError: () => {
      addAlert({
        message: t("LOGO_UPDATE_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  const handleSubmit = (body, logo) => {
    setProvider({ slug: body.name.toLowerCase().replace(/\s/g, "-") })
    setUploadLogo(logo)
    create({ body })
  }

  useEffect(() => {
    if (provider !== null && uploadLogo !== null && created) {
      // Attach logo to a new FormData instance and send it as the body
      const file = get(uploadLogo, "upload_logo[0]", null)
      const body = new FormData()
      body.append("file", file, file.name)
      onLogoUpdate({ body })
    } else if (created) {
      setRedirect(PROVIDER_ADMIN.path)
      addAlert({
        message: t("PROVIDER_ADD_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, uploadLogo, created])

  // Redirect if truthy
  if (redirect) return <Redirect to={redirect} />

  return (
    <>
      <Helmet>
        <title>Add provider</title>
      </Helmet>
      <Container width="80%">
        <Breadcrumbs
          trail={[{ label: "Dashboard", link: DASHBOARD.path }, { label: "Add provider" }]}
        />
        <H1 margin="0 0 4rem">Add provider</H1>
        <ProviderCreate
          onSubmit={handleSubmit}
          isLoading={loading || isLogoUpdateLoading}
          onCancel={() => setOpen(true)}
        />

        {isOpen && (
          <ConfirmationModal
            confirmIcon="cancel"
            confirmText="Yes"
            confirmAppearance="error"
            cancelAppearance="errorGhost"
            onClose={() => setOpen(false)}
            onConfirm={() => setRedirect("/providers")}
          >
            <P>Are you sure you want to cancel this action and return to the Providers page?</P>
          </ConfirmationModal>
        )}
      </Container>
    </>
  )
}

export default ProviderAdd
