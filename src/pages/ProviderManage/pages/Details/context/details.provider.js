import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { usePatch, useDelete, usePost, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useHistory } from "react-router-dom"
import { useTranslations } from "@4cplatform/elements/Translations"

// Helpers
import { Provider } from "../../../../../UI/Templates/ProviderDetails"
import { ProviderManageContext } from "../../../context/manage.context"

const ProviderDetailsProvider = ({ children }) => {
  const t = useTranslations()
  const history = useHistory()
  const { addAlert } = React.useContext(AlertsContext)
  const { provider, onUpdateProvider, providerLoading, setHasUnsavedProviderDetails } =
    React.useContext(ProviderManageContext)
  const [isEdit, setEdit] = React.useState(false)
  const [logoUpdateOpen, setLogoUpdate] = React.useState(false)
  const [logoDeleteOpen, setLogoDelete] = React.useState(false)

  // Edit details mutation
  const [onEditDetailsSubmit, { loading: editLoading, error: editError }] = usePatch({
    endpoint: "/providers/:slug",
    params: {
      slug: get(provider, "slug", "")
    },
    onCompleted: res => {
      addAlert({
        message: t("PROVIDER_UPDATE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      onUpdateProvider(get(res, "data", {}))
      setHasUnsavedProviderDetails(false)
      setEdit(false)
    },
    onError: () => {
      addAlert({
        message: t("PROVIDER_UPDATE_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Update logo mutation
  const [onLogoUpdate, { loading: isLogoUpdateLoading, error: logoUpdateError }] = usePost({
    endpoint: "/providers/:slug/logo",
    params: {
      slug: get(provider, "slug", "")
    },
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onCompleted: res => {
      addAlert({
        message: t("LOGO_UPDATE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      onUpdateProvider(get(res, "data", {}))
      setLogoUpdate(false)
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

  // Delete logo mutation
  const [onLogoDelete, { loading: isLogoDeleteLoading, error: logoDeleteError }] = usePatch({
    endpoint: "/providers/:slug/remove-logo",
    params: { slug: get(provider, "slug", "") },
    onCompleted: res => {
      addAlert({
        message: t("LOGO_DELETE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      onUpdateProvider(get(res, "data", {}))
      setLogoDelete(false)
    },
    onError: () => {
      addAlert({
        message: t("LOGO_DELETE_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Delete Provider mutation
  const [deleteProvider, { loading: deleteLoading }] = useDelete({
    endpoint: "/providers/:slug",
    params: {
      slug: get(provider, "slug", "")
    },
    onCompleted: () => {
      // Display success message, refetch index query
      addAlert({
        message: t("PROVIDER_DELETE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      history.push("/providers")
    },
    onError: () => {
      addAlert({
        message: t("PROVIDER_DELETE_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  return (
    <Provider
      value={{
        data: provider,
        isEdit,
        setEdit,
        editLoading,
        isLoading: providerLoading,
        onEditDetailsSubmit,
        onLogoUpdate: val => {
          // Attach logo to a new FormData instance and send it as the body
          const file = get(val, "update_logo[0]", null)
          const body = new FormData()

          body.append("file", file, file.name)

          onLogoUpdate({ body })
        },
        isLogoUpdateLoading,
        onLogoDelete,
        isLogoDeleteLoading,
        logoUpdateOpen,
        logoDeleteOpen,
        setLogoUpdate,
        setLogoDelete,
        deleteLoading,
        onProviderDelete: () => deleteProvider()
      }}
    >
      {children}
      <ApiError error={editError || logoUpdateError || logoDeleteError} />
    </Provider>
  )
}

ProviderDetailsProvider.defaultProps = {
  children: null
}

ProviderDetailsProvider.propTypes = {
  children: PropTypes.any
}

export default ProviderDetailsProvider
