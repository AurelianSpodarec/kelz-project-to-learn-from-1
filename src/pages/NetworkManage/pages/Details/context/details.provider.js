import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { usePatch, useDelete, usePost, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useTranslations } from "@4cplatform/elements/Translations"
import { useHistory } from "react-router-dom"

// Helpers
import { Provider } from "../../../../../UI/Templates/NetworkDetails"
import { NetworkManageContext } from "../../../context/manage.context"

const NetworkDetailsProvider = ({ children }) => {
  const t = useTranslations()
  const history = useHistory()
  const { addAlert } = React.useContext(AlertsContext)
  const { network, onUpdateNetwork, networkLoading, setHasUnsavedNetworkDetails } =
    React.useContext(NetworkManageContext)
  const [isEdit, setEdit] = React.useState(false)
  const [logoUpdateOpen, setLogoUpdate] = React.useState(false)
  const [logoDeleteOpen, setLogoDelete] = React.useState(false)

  // Edit details mutation
  const [onEditDetailsSubmit, { loading: editLoading, error: editError }] = usePatch({
    endpoint: "/networks/:slug",
    params: {
      slug: get(network, "slug", "")
    },
    onCompleted: res => {
      addAlert({
        message: t("NETWORK_UPDATE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      onUpdateNetwork(get(res, "data", {}))
      setHasUnsavedNetworkDetails(false)
      setEdit(false)
    },
    onError: () => {
      addAlert({
        message: t("NETWORK_UPDATE_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Update logo mutation
  const [onLogoUpdate, { loading: isLogoUpdateLoading, error: logoUpdateError }] = usePost({
    endpoint: "/networks/:slug/logo",
    params: {
      slug: get(network, "slug", "")
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
      onUpdateNetwork(get(res, "data", {}))
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
    endpoint: "/networks/:slug/remove-logo",
    params: { slug: get(network, "slug", "") },
    onCompleted: res => {
      addAlert({
        message: t("LOGO_DELETE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      onUpdateNetwork(get(res, "data", {}))
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

  // Delete Network mutation
  const [deleteNetwork, { loading: deleteLoading }] = useDelete({
    endpoint: "/networks/:network",
    params: {
      network: get(network, "slug", "")
    },
    onCompleted: () => {
      // Display success message, refetch index query
      addAlert({
        message: t("NETWORK_DELETE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      history.push("/networks")
    },
    onError: () => {
      addAlert({
        message: t("NETWORK_DELETE_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  return (
    <Provider
      value={{
        data: network,
        isEdit,
        setEdit,
        onEditDetailsSubmit,
        editLoading,
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
        isLoading: networkLoading,
        logoUpdateOpen,
        logoDeleteOpen,
        setLogoUpdate,
        setLogoDelete,
        deleteLoading,
        onDeleteNetwork: () => deleteNetwork()
      }}
    >
      {children}
      <ApiError error={editError || logoUpdateError || logoDeleteError} />
    </Provider>
  )
}

NetworkDetailsProvider.defaultProps = {
  children: null
}

NetworkDetailsProvider.propTypes = {
  children: PropTypes.any
}

export default NetworkDetailsProvider
