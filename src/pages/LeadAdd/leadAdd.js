import React from "react"
import { get, isEmpty } from "lodash"
import { Redirect } from "react-router-dom"
import { H1, P } from "@4cplatform/elements/Typography"
import { usePost, useGet } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useTranslations } from "@4cplatform/elements/Translations"
import { Helmet } from "react-helmet-async"

// Helpers
import { LEAD_ADMIN, DASHBOARD } from "../../config/pages"
import reducer from "./leadAdd.reducer"

// Components
import { Breadcrumbs, ConfirmationModal } from "../../UI/Molecules"
import { LeadCreate } from "../../UI/Templates"
import { Wrapper } from "./leadAdd.styles"

const LeadAdd = () => {
  const t = useTranslations()
  const { addAlert } = React.useContext(AlertsContext)

  // State
  const [{ redirect, cancelOpen, importErrors, importOpen, config, apiErrors }, dispatch] =
    React.useReducer(reducer, {
      redirect: null,
      cancelOpen: false,
      importErrors: [],
      importOpen: false,
      config: {},
      apiErrors: {}
    })

  // Leads Config
  const { loading: configLoading } = useGet({
    endpoint: "/lead-config",
    onCompleted: res => {
      const cfg = get(res, "data", {})
      dispatch({ type: "UPDATE_VALUE", key: "config", value: cfg })
    },
    onError: () => {
      addAlert({
        message: t("LEAD_CONFIG_FETCH_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Create Lead request
  const [create, { loading }] = usePost({
    endpoint: "/leads",
    onCompleted: () => {
      // Display alert and set redirect
      addAlert({
        message: t("LEAD_ADD_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "UPDATE_VALUE", key: "redirect", value: LEAD_ADMIN.path })
    },
    onError: err => {
      addAlert({
        message: t("LEAD_ADD_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "UPDATE_VALUE", key: "apiErrors", value: err })
    }
  })

  // Import Lead request
  const [importLead, { loading: importLoading }] = usePost({
    endpoint: "/lead-import",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onCompleted: () => {
      addAlert({
        message: t("LEAD_IMPORT_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "CLEAR_IMPORT_MODAL" })
    },
    onError: err => {
      addAlert({
        message: t("LEAD_IMPORT_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })

      const validationErrors = get(err, "validation.file", [])

      // If something went wrong but it wasn't a validation error, close the modal
      // Otherwise, store errors in state and display them to the user
      if (isEmpty(validationErrors)) {
        dispatch({ type: "UPDATE_VALUE", key: "importOpen", value: false })
      } else {
        dispatch({ type: "UPDATE_VALUE", key: "importErrors", value: validationErrors })
      }
    }
  })

  // Redirect if truthy
  if (redirect) return <Redirect to={redirect} />

  return (
    <>
      <Helmet>
        <title>Add lead</title>
      </Helmet>
      <Wrapper>
        <Breadcrumbs
          trail={[
            { label: "Dashboard", link: DASHBOARD.path },
            { label: "Leads", link: LEAD_ADMIN.path },
            { label: "Add lead" }
          ]}
        />
        <H1 margin="0 0 4rem">Add lead</H1>

        {/* Lead Creation form */}
        <LeadCreate
          onSubmit={body => create({ body })}
          isLoading={loading || configLoading}
          onCancel={() => dispatch({ type: "UPDATE_VALUE", key: "cancelOpen", value: true })}
          config={config}
          isOpenImport={importOpen}
          setImportOpen={val => dispatch({ type: "UPDATE_VALUE", key: "importOpen", value: val })}
          clearImport={() => dispatch({ type: "CLEAR_IMPORT_MODAL" })}
          onImportSubmit={body => {
            const file = get(body, "file[0]", null)
            const data = new FormData()
            data.append("file", file, file.name)

            importLead({ body: data })
          }}
          isLoadingImport={importLoading}
          errors={importErrors}
          apiErrors={apiErrors}
        />

        {/* Cancel add confirmation dialog */}
        {cancelOpen && (
          <ConfirmationModal
            confirmIcon="cancel"
            confirmText="Yes"
            confirmAppearance="error"
            cancelAppearance="errorGhost"
            onClose={() => dispatch({ type: "UPDATE_VALUE", key: "cancelOpen", value: false })}
            onConfirm={() => dispatch({ type: "UPDATE_VALUE", key: "redirect", value: "/leads" })}
          >
            <P>Are you sure you want to cancel this action and return to the Leads page?</P>
          </ConfirmationModal>
        )}
      </Wrapper>
    </>
  )
}

export default LeadAdd
