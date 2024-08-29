import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import queryString from "query-string"
import { useLocation } from "react-router-dom"
import { useDelete, useGet, usePost, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"

// Helpers
import { Provider } from "../../../../../UI/Templates/NetworkInvitations"
import { NetworkManageContext } from "../../../context/manage.context"
import reducer from "./invitations.reducer"
import { getOrderBy } from "../../../../../UI/Helpers"

const NetworkInvitationsProvider = ({ children }) => {
  const location = useLocation()
  const values = queryString.parse(location.search)
  const { addAlert } = React.useContext(AlertsContext)
  const { network, networkLoading } = React.useContext(NetworkManageContext)

  // State
  const [{ page, perPage, search, sorting, total, data, addOpen, cancel }, dispatch] =
    React.useReducer(reducer, {
      page: 1,
      perPage: 10,
      search: "",
      sorting: { direction: "asc", dataKey: "email_address" },
      total: null,
      data: [],
      addOpen: get(values, "send_open") === "true",
      cancel: { isOpen: false, invitation: null }
    })

  // Index invitations
  const {
    loading,
    error: queryError,
    refetch
  } = useGet({
    endpoint: "/networks/:slug/invitations",
    skip: networkLoading || !get(network, "slug", null),
    params: {
      slug: get(network, "slug", "")
    },
    query: {
      limit: perPage,
      page,
      order_by: getOrderBy(sorting),
      organisation_name: search || undefined
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])
      dispatch({ type: "FETCH_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        message: "There was an error fetching the invitations",
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Index organisations
  const {
    data: organisations,
    loading: organisationsLoading,
    error: orgsError,
    refetch: refectOrganisations
  } = useGet({
    endpoint: "/networks/:slug/organisations",
    params: {
      slug: get(network, "slug", "")
    },
    query: {
      member_organisations: false
    },
    skip: !addOpen
  })

  // Invite organisations
  const [invite, { loading: inviteLoading, error: inviteError }] = usePost({
    endpoint: "/networks/:slug/invitations",
    params: {
      slug: get(network, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        type: "success",
        message: "Invitations successfully created",
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "INVITE_SUCCESS" })
      refetch()
      refectOrganisations()
    }
  })

  // Delete invitation
  const [remove, { loading: deleteLoading, error: deleteError }] = useDelete({
    endpoint: "/networks/:slug/invitations/:invitation",
    onCompleted: () => {
      addAlert({
        type: "success",
        message: "Invitation successfully removed",
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "DELETE_SUCCESS" })
      refetch()
    },
    onError: err => console.error(err)
  })

  return (
    <Provider
      value={{
        data,
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        pagination: { total, page, perPage },
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        sorting,
        queryLoading: loading || networkLoading,
        addOpen,
        setAddOpen: val => dispatch({ type: "UPDATE_VALUE", key: "addOpen", value: val }),
        organisations,
        inviteLoading,
        onInviteOrganisation: body => {
          invite({ body })
        },
        cancel,
        setCancel: val => dispatch({ type: "UPDATE_VALUE", key: "cancel", value: val }),
        onDeleteInvitation: invitation => {
          remove({
            params: {
              invitation: get(invitation, "id", null),
              slug: get(network, "slug", null)
            }
          })
        },
        deleteLoading,
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        organisationsLoading
      }}
    >
      {children}
      <ApiError error={queryError || orgsError || inviteError || deleteError} />
    </Provider>
  )
}

NetworkInvitationsProvider.propTypes = {
  children: PropTypes.any
}

export default NetworkInvitationsProvider
