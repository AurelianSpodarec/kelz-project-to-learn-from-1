import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { useGet, usePost, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useTranslations } from "@4cplatform/elements/Translations"

// Components
import { Provider } from "../../../../../UI/Templates/NetworkApplications"

// Helpers
import { getOrderBy } from "../../../../../UI/Helpers"
import { NetworkManageContext } from "../../../context/manage.context"
import reducer from "./applications.reducer"

const NetworkApplicationsProvider = ({ children }) => {
  const t = useTranslations()
  const { addAlert } = React.useContext(AlertsContext)
  const { network, networkLoading } = React.useContext(NetworkManageContext)

  // State
  const [{ page, perPage, search, sorting, total, data, modal }, dispatch] = React.useReducer(
    reducer,
    {
      page: 1,
      perPage: 10,
      search: "",
      sorting: { direction: "asc", dataKey: "name" },
      total: null,
      data: [],
      modal: { isOpen: false, type: null, id: null }
    }
  )

  // Index applications
  const {
    loading,
    error: getError,
    refetch
  } = useGet({
    endpoint: "/networks/:slug/applications",
    skip: networkLoading || !get(network, "slug", null),
    params: {
      slug: get(network, "slug", "")
    },
    query: {
      page,
      limit: perPage,
      deleted: false,
      order_by: getOrderBy(sorting),
      organisation_name: search,
      with: ["organisation", "user"]
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])
      dispatch({ type: "FETCH_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("NETWORK_INDEX_ERROR"),
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Accept application
  const [accept, { loading: acceptLoading, error: acceptError }] = usePost({
    endpoint: "/networks/:slug/applications/:application/accept",
    onCompleted: () => {
      dispatch({
        type: "UPDATE_VALUE",
        key: "modal",
        value: { isOpen: false, type: null, id: null }
      })
      addAlert({
        type: "success",
        message: t("APPLICATION_ACCEPT_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      refetch()
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("APPLICATION_ACCEPT_ERROR"),
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Reject application
  const [reject, { loading: rejectLoading, error: rejectError }] = usePost({
    endpoint: "/networks/:slug/applications/:application/reject",
    onCompleted: () => {
      dispatch({
        type: "UPDATE_VALUE",
        key: "modal",
        value: { isOpen: false, type: null, id: null }
      })
      addAlert({
        type: "success",
        message: t("APPLICATION_REJECT_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      refetch()
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("APPLICATION_REJECT_ERROR"),
        dismissible: true,
        timeout: 5
      })
    }
  })

  return (
    <Provider
      value={{
        data,
        queryLoading: loading || networkLoading,
        acceptLoading,
        rejectLoading,
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        pagination: { total, page, perPage },
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        sorting,
        onAcceptApplication: app => {
          accept({
            params: {
              slug: get(network, "slug", ""),
              application: get(app, "id", null)
            }
          })
        },
        onRejectApplication: app => {
          reject({
            params: {
              slug: get(network, "slug", ""),
              application: get(app, "id", null)
            }
          })
        },
        modal,
        setModal: val => dispatch({ type: "UPDATE_VALUE", key: "modal", value: val })
      }}
    >
      {children}
      <ApiError error={getError || acceptError || rejectError} />
    </Provider>
  )
}

NetworkApplicationsProvider.propTypes = {
  children: PropTypes.any
}

export default NetworkApplicationsProvider
