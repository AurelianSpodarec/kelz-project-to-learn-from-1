import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useGet, usePatch, ApiError } from "@4cplatform/elements/Api"

// Helpers
import { Provider } from "../../../../../UI/Templates/NetworkOrganisations"
import { NetworkManageContext } from "../../../context/manage.context"
import { PageContext } from "../../../../../UI/Organisms"
import reducer from "./members.reducer"
import { getOrderBy } from "../../../../../UI/Helpers"

const NetworkMembersProvider = ({ children }) => {
  const { addAlert } = React.useContext(AlertsContext)
  const { network, networkLoading } = React.useContext(NetworkManageContext)
  const { resetPanel } = React.useContext(PageContext)

  // State
  const [{ page, perPage, search, selectedOrganisation, sorting, total, data }, dispatch] =
    React.useReducer(reducer, {
      page: 1,
      perPage: 5,
      search: "",
      selectedOrganisation: null,
      sorting: { direction: "asc", dataKey: "name" }
    })

  // Index Network Organisations
  const {
    loading,
    error: queryError,
    refetch
  } = useGet({
    endpoint: "/networks/:slug/organisations",
    skip: networkLoading || !get(network, "slug", null),
    params: {
      slug: get(network, "slug")
    },
    query: {
      order_by: getOrderBy(sorting),
      member_organisations: true
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])
      dispatch({ type: "FETCH_COMPLETE", total: newTotal, data: newData })
    }
  })

  // Remove Network Organisation
  const [remove, { loading: removeLoading, error: removeError }] = usePatch({
    endpoint: "/networks/:slug/organisations/:organisation/remove",
    params: {
      slug: get(network, "slug"),
      organisation: get(selectedOrganisation, "slug")
    },
    onCompleted: () => {
      addAlert({
        type: "success",
        message: "Organisation successfully removed from the network",
        dismissible: true,
        timeout: 5
      })
      resetPanel()
      refetch()
    }
  })

  return (
    <Provider
      value={{
        data,
        network,
        queryLoading: loading || networkLoading,
        selectedOrganisation,
        onOrganisationSelect: row =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedOrganisation", value: row }),
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        sorting,
        pagination: { total, page, perPage },
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        onRemoveOrganisation: () => remove(),
        removeLoading
      }}
    >
      {children}
      <ApiError error={queryError || removeError} />
    </Provider>
  )
}

NetworkMembersProvider.propTypes = {
  children: PropTypes.any
}

export default NetworkMembersProvider
