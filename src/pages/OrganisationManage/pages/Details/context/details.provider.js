import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { get, isEmpty } from "lodash"
import { useHistory } from "react-router-dom"
import { usePatch, usePost, useDelete, ApiError, useGet } from "@4cplatform/elements/Api"

import { useTranslations } from "@4cplatform/elements/Translations"

// Helpers
import { AuthContext } from "@4cplatform/elements/Auth"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { Provider } from "../../../../../UI/Templates/OrganisationDetails"
import { OrganisationManageContext } from "../../../context/manage.context"
import reducer from "./details.reducer"

const OrganisationDetailsProvider = ({ children }) => {
  const { organisation, onUpdateOrganisation, organisationLoading, organisationRefetch } =
    React.useContext(OrganisationManageContext)
  const { canAccess } = React.useContext(AuthContext)
  const { addAlert } = React.useContext(AlertsContext)

  const history = useHistory()
  const t = useTranslations()

  // State
  const [
    {
      isEdit,
      leave,
      join,
      withdraw,
      accept,
      reject,
      logoUpdateOpen,
      logoDeleteOpen,
      networkVal,
      applicationsPage,
      invitationsPage,
      applicationsTotal,
      invitationsTotal,
      apiErrors
    },
    dispatch
  ] = React.useReducer(reducer, {
    isEdit: false,
    leave: false,
    join: false,
    withdraw: { isOpen: false, application: null },
    accept: { isOpen: false, invitation: null },
    reject: { isOpen: false, invitation: null },
    logoUpdateOpen: false,
    logoDeleteOpen: false,
    networkVal: "",
    applicationsPage: 1,
    invitationsPage: 1,
    applicationsTotal: null,
    invitationsTotal: null,
    apiErrors: null
  })

  useEffect(() => {
    dispatch({ type: "UPDATE_VALUE", key: "apiErrors", value: null })
  }, [isEdit])

  // Edit details mutation
  const [onEditDetailsSubmit, { loading: editLoading, error: editError }] = usePatch({
    endpoint: "/organisations/:slug",
    params: {
      slug: get(organisation, "slug", "")
    },
    onCompleted: res => {
      addAlert({
        message: t("ORGANISATION_UPDATE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      onUpdateOrganisation(get(res, "data", {}))
      dispatch({ type: "UPDATE_VALUE", key: "isEdit", value: false })
    },
    onError: err => {
      dispatch({ type: "UPDATE_VALUE", key: "apiErrors", value: err })
    }
  })

  // Update logo mutation
  const [onLogoUpdate, { loading: isLogoUpdateLoading, error: logoUpdateError }] = usePost({
    endpoint: "/organisations/:slug/logo",
    params: {
      slug: get(organisation, "slug", "")
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
      onUpdateOrganisation(get(res, "data", {}))
      dispatch({ type: "UPDATE_VALUE", key: "logoUpdateOpen", value: false })
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
    endpoint: "/organisations/:slug/remove-logo",
    params: { slug: get(organisation, "slug", "") },
    onCompleted: res => {
      addAlert({
        message: t("LOGO_DELETE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      onUpdateOrganisation(get(res, "data", {}))
      dispatch({ type: "UPDATE_VALUE", key: "logoDeleteOpen", value: false })
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

  // Delete organisation mutation
  const [deleteOrganisation, { loading: deleteLoading, error: deleteError }] = useDelete({
    endpoint: "/organisations/:slug",
    params: {
      slug: get(organisation, "slug", "")
    },
    onCompleted: () => {
      // Display success message, refetch index query
      addAlert({
        message: t("ORGANISATION_DELETE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      history.push("/")
    }
  })

  // Leave network mutation
  const [leaveNetwork, { loading: leaveLoading, error: leaveError }] = usePost({
    endpoint: "/organisations/:slug/leave-network",
    params: {
      slug: get(organisation, "slug", "")
    },
    onCompleted: res => {
      // Display success message, refetch index query
      addAlert({
        message: t("ORGANISATION_LEAVE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "UPDATE_VALUE", key: "leave", value: false })
      onUpdateOrganisation(get(res, "data", {}))
    }
  })

  // Search networks
  const {
    data: networksData,
    loading: networksLoading,
    error: networksError
  } = useGet({
    endpoint: "/networks",
    skip: !canAccess(["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN"])
  })

  const skipNetworkApplications =
    !get(organisation, "slug", "") ||
    !canAccess(["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN"]) ||
    // Getting network-applications while an Organisation is a member of a Network returns a 500 error
    !isEmpty(get(organisation, "network", {}))
  // Index network applications query
  const {
    data: applications,
    error: applicationsError,
    refetch: applicationsRefetch
  } = useGet({
    endpoint: "/organisations/:slug/network-applications",
    skip: skipNetworkApplications,
    params: {
      slug: get(organisation, "slug", "")
    },
    query: {
      page: applicationsPage,
      limit: 3,
      with: ["network"]
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      dispatch({ type: "UPDATE_VALUE", key: "applicationsTotal", value: newTotal })
    }
  })

  // Create network application mutation
  const [apply, { loading: applyLoading, error: applyError }] = usePost({
    endpoint: "/organisations/:slug/network-applications",
    params: {
      slug: get(organisation, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("APPLICATION_ADD_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "UPDATE_VALUE", key: "join", value: false })
      applicationsRefetch()
    }
  })

  // Withdraw network application mutation
  const [withdrawApplication, { loading: withdrawLoading, error: withdrawError }] = usePost({
    endpoint: "/organisations/:slug/network-applications/:application/cancel",
    onCompleted: () => {
      addAlert({
        message: t("APPLICATION_REMOVE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      dispatch({
        type: "UPDATE_VALUE",
        key: "withdraw",
        value: { isOpen: false, application: null }
      })
      applicationsRefetch()
    }
  })

  // Index network invitations
  const {
    data: invitations,
    loading: invitationsLoading,
    error: invitationsError,
    refetch: refetchInvitations
  } = useGet({
    endpoint: "/organisations/:slug/network-invitations",
    skip: !get(organisation, "slug", "") || !canAccess(["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN"]),
    params: {
      slug: get(organisation, "slug", "")
    },
    query: {
      page: invitationsPage,
      limit: 3
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      dispatch({ type: "UPDATE_VALUE", key: "invitationsTotal", value: newTotal })
    }
  })

  // Reject invitation mutation
  const [rejectInvite, { loading: rejectLoading, error: rejectError }] = usePost({
    endpoint: "/organisations/:slug/network-invitations/:invitation/reject",
    onCompleted: () => {
      addAlert({
        message: t("INVITATION_REJECT_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "UPDATE_VALUE", key: "reject", value: { isOpen: false, invitation: null } })
      refetchInvitations()
    }
  })

  // Accept invitation mutation
  const [acceptInvite, { loading: acceptLoading, error: acceptError }] = usePost({
    endpoint: "/organisations/:slug/network-invitations/:invitation/accept",
    onCompleted: () => {
      addAlert({
        message: t("INVITATION_ACCEPT_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "UPDATE_VALUE", key: "accept", value: { isOpen: false, invitation: null } })
      organisationRefetch()
    }
  })

  return (
    <Provider
      value={{
        data: organisation,
        isEdit,
        setEdit: val => dispatch({ type: "UPDATE_VALUE", key: "isEdit", value: val }),
        onEditDetailsSubmit,
        editLoading,
        onLogoUpdate: val => {
          // Attach logo to a new FormData instance and send it as the body
          const file = get(val, "update_logo[0]", null)
          const data = new FormData()
          data.append("file", file, file.name)

          onLogoUpdate({ body: data })
        },
        isLogoUpdateLoading,
        onLogoDelete,
        isLogoDeleteLoading,
        logoUpdateOpen,
        logoDeleteOpen,
        setLogoUpdate: val => dispatch({ type: "UPDATE_VALUE", key: "logoUpdateOpen", value: val }),
        setLogoDelete: val => dispatch({ type: "UPDATE_VALUE", key: "logoDeleteOpen", value: val }),
        isLoading: organisationLoading,
        deleteLoading,
        onDeleteOrganisation: () => deleteOrganisation(),
        join,
        setJoin: val => dispatch({ type: "UPDATE_VALUE", key: "join", value: val }),
        leave,
        setLeave: val => dispatch({ type: "UPDATE_VALUE", key: "leave", value: val }),
        onLeaveNetwork: () => leaveNetwork(),
        leaveLoading,
        withdraw,
        setWithdraw: val => dispatch({ type: "UPDATE_VALUE", key: "withdraw", value: val }),
        accept,
        setAccept: val => dispatch({ type: "UPDATE_VALUE", key: "accept", value: val }),
        reject,
        setReject: val => dispatch({ type: "UPDATE_VALUE", key: "reject", value: val }),
        networkVal,
        setNetworkVal: val => dispatch({ type: "UPDATE_VALUE", key: "networkVal", value: val }),
        networks: networksData || [],
        networksLoading,
        onJoinNetwork: body => apply({ body }),
        applyLoading,
        applications,
        apiErrors,
        onWithdrawApplication: id => {
          const params = {
            application: id,
            slug: get(organisation, "slug", "")
          }
          withdrawApplication({ params })
        },
        applicationsPagination: { page: applicationsPage, total: applicationsTotal, perPage: 3 },
        changeApplicationsPage: val =>
          dispatch({ type: "UPDATE_VALUE", key: "applicationsPage", value: val }),
        withdrawLoading,
        invitations,
        invitationsLoading,
        invitationsPagination: { page: invitationsPage, total: invitationsTotal, perPage: 3 },
        changeInvitationsPage: val =>
          dispatch({ type: "UPDATE_VALUE", key: "invitationsPage", value: val }),
        rejectLoading,
        acceptLoading,
        onAcceptInvitation: id => {
          const params = {
            invitation: id,
            slug: get(organisation, "slug", "")
          }
          acceptInvite({ params })
        },
        onRejectInvitation: id => {
          const params = {
            invitation: id,
            slug: get(organisation, "slug", "")
          }
          rejectInvite({ params })
        }
      }}
    >
      {children}
      <ApiError
        error={
          editError ||
          logoUpdateError ||
          logoDeleteError ||
          deleteError ||
          leaveError ||
          networksError ||
          applyError ||
          applicationsError ||
          withdrawError ||
          invitationsError ||
          rejectError ||
          acceptError
        }
      />
    </Provider>
  )
}

OrganisationDetailsProvider.defaultProps = {
  children: null
}

OrganisationDetailsProvider.propTypes = {
  children: PropTypes.any
}

export default OrganisationDetailsProvider
