/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react"
import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"
import { get, isEmpty } from "lodash"
import { useGet, useDelete, usePatch, usePost, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { AuthContext } from "@4cplatform/elements/Auth"
import { useTranslations } from "@4cplatform/elements/Translations"

// Components
import { Provider } from "../../../UI/Templates/LeadAdmin"

// Helpers
import { getOrderBy } from "../../../UI/Helpers"
import reducer from "./leads.reducer"
import { PageContext } from "../../../UI/Organisms"

const LeadsProvider = ({ children }) => {
  const { addAlert } = React.useContext(AlertsContext)
  const { canAccess } = useContext(AuthContext)
  const { selfServiceData, setPanelStatus } = React.useContext(PageContext)

  const history = useHistory()
  const t = useTranslations()

  // State
  const [
    {
      page,
      perPage,
      search,
      selectedLead,
      sorting,
      deleteOpen,
      transferOpen,
      userVal,
      total,
      data,
      leadNotes,
      showDeleted,
      notesModal,
      dispositionModal,
      config,
      hasShowDeleted
    },
    dispatch
  ] = React.useReducer(reducer, {
    page: 1,
    perPage: 5,
    search: "",
    selectedLead: null,
    sorting: { direction: "desc", dataKey: "created_at" },
    deleteOpen: false,
    transferOpen: false,
    userVal: "",
    total: null,
    data: [],
    leadNotes: [],
    showDeleted: false,
    notesModal: false,
    dispositionModal: false,
    config: {},
    hasShowDeleted: canAccess(["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN"])
  })

  // Leads Config
  const { loading: configLoading, error: configError } = useGet({
    endpoint: "/lead-config",
    onCompleted: res => {
      const cfg = get(res, "data", {})

      dispatch({ type: "UPDATE_VALUE", key: "config", value: cfg })
    }
  })

  // Index leads
  const {
    loading: queryLoading,
    error: queryError,
    refetch: refetchQuery
  } = useGet({
    endpoint: "/leads",
    query: {
      name: search,
      page,
      limit: perPage,
      deleted: showDeleted === true ? 1 : 0,
      order_by: getOrderBy(sorting),
      with: ["organisation", "salesAgent"]
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", [])

      dispatch({ type: "FETCH_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("LEADS_INDEX_ERROR"),
        dismissible: true,
        timeout: 5
      })
    },
    skip: isEmpty(config)
  })

  // Get lead
  const {
    loading: selectLoading,
    error: selectError,
    refetch: refetchSelect
  } = useGet({
    endpoint: "/leads/:slug",
    params: {
      slug: get(selectedLead, "slug")
    },
    query: {
      with: ["organisation", "salesAgent", "client", "phoneNumbers", "notes"],
      deleted: showDeleted === true ? 1 : 0
    },
    onCompleted: res => {
      const newData = get(res, "data", null)
      dispatch({ type: "UPDATE_VALUE", key: "selectedLead", value: newData })
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("LEAD_GET_ERROR"),
        dismissible: true,
        timeout: 5
      })
    },
    skip: !get(selectedLead, "slug")
  })

  // Delete lead
  const [deleteLead, { loading: deleteLoading, error: deleteError }] = useDelete({
    endpoint: "/leads/:slug",
    params: {
      slug: get(selectedLead, "slug")
    },
    onCompleted: () => {
      addAlert({
        type: "success",
        message: t("LEAD_DELETE_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "UPDATE_VALUE", key: "deleteOpen", value: false })
      setPanelStatus("closed")
      refetchQuery()
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("LEAD_DELETE_ERROR"),
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "UPDATE_VALUE", key: "deleteOpen", value: false })
    }
  })

  // Update lead
  const [updateLead, { loading: updateLoading, error: updateError }] = usePatch({
    endpoint: "/leads/:slug",
    params: {
      slug: get(selectedLead, "slug")
    },
    onCompleted: () => {
      addAlert({
        type: "success",
        message: t("LEAD_UPDATE_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      setPanelStatus("open")
      refetchSelect()
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("LEAD_UPDATE_ERROR"),
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Get lead notes
  const {
    loading: notesLoading,
    error: notesError,
    refetch: notesRefetch
  } = useGet({
    endpoint: "/leads/:slug/notes",
    params: {
      slug: get(selectedLead, "slug")
    },
    onCompleted: res =>
      dispatch({ type: "UPDATE_VALUE", key: "leadNotes", value: get(res, "data", []) }),
    onError: () => {
      addAlert({
        type: "error",
        message: t("NOTES_INDEX_ERROR"),
        dismissible: true,
        timeout: 5
      })
    },
    skip: !!get(selectedLead, "deleted_at") || !(get(selectedLead, "slug") && notesModal)
  })

  // Create lead note
  const [createNote, { loading: noteCreateLoading, error: noteCreateError }] = usePost({
    endpoint: "/leads/:slug/notes",
    params: {
      slug: get(selectedLead, "slug")
    },
    onCompleted: () => {
      addAlert({
        type: "success",
        message: t("NOTE_ADD_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      notesRefetch()
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("NOTE_ADD_ERROR"),
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Update lead disposition
  const [updateDisposition, { loading: updateDispositionLoading, error: updateDispositionError }] =
    usePatch({
      endpoint: "/leads/:slug/update-disposition",
      params: {
        slug: get(selectedLead, "slug", "")
      },
      onCompleted: () => {
        addAlert({
          type: "success",
          message: t("LEAD_DISPOSITION_UPDATE_SUCCESS"),
          dismissible: true,
          timeout: 5
        })
        dispatch({ type: "UPDATE_VALUE", key: "dispositionModal", value: false })
        refetchSelect()
        refetchQuery()
      },
      onError: () => {
        addAlert({
          type: "error",
          message: t("LEAD_DISPOSITION_UPDATE_ERROR"),
          dismissible: true,
          timeout: 5
        })
      }
    })

  // Get organisation users
  const {
    data: users,
    loading: suggestionsLoading,
    error: suggestionsError
  } = useGet({
    endpoint: "/users",
    query: {
      full_name: userVal,
      limit: 5,
      deleted: false,
      parent_type: "ORGANISATION",
      parent_name: get(selectedLead, "organisation.name", "")
    },
    skip: !userVal
  })

  // Transfer lead to user
  const [transfer, { loading: transferLoading, error: transferError }] = usePatch({
    endpoint: "/leads/:slug/transfer",
    params: {
      slug: get(selectedLead, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        type: "success",
        message: t("LEAD_TRANSFER_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "UPDATE_VALUE", key: "transferOpen", value: false })
      setPanelStatus("open")
      refetchSelect()
      refetchQuery()
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("LEAD_TRANSFER_ERROR"),
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Start journey from lead
  const [startJourney, { loading: startJourneyLoading, error: startJourneyError }] = usePost({
    endpoint: "/leads/:slug/journeys",
    params: {
      slug: get(selectedLead, "slug")
    },
    onCompleted: res => {
      addAlert({
        type: "success",
        message: t("JOURNEY_START_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      setPanelStatus("closed")
      history.push(
        get(res, "data.page.route", `/journeys/${get(res, "data.journey.slug")}/consent`)
      )
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("JOURNEY_START_ERROR"),
        dismissible: true,
        timeout: 5
      })
    }
  })

  useEffect(() => {
    if (!notesModal) dispatch({ type: "UPDATE_VALUE", key: "leadNotes", value: [] })
    if (isEmpty(leadNotes) && notesModal && get(selectedLead, "slug")) notesRefetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notesModal])

  return (
    <Provider
      value={{
        data,
        selectedLead,
        onLeadSelect: row => dispatch({ type: "UPDATE_VALUE", key: "selectedLead", value: row }),
        onLeadDeselect: () => dispatch({ type: "UPDATE_VALUE", key: "selectedLead", value: null }),
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        pagination: { total, page, perPage },
        showDeleted,
        setShowDeleted: val => dispatch({ type: "UPDATE_VALUE", key: "showDeleted", value: val }),
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        sorting,
        queryLoading: queryLoading || configLoading,
        deleteOpen,
        setDeleteOpen: val => dispatch({ type: "UPDATE_VALUE", key: "deleteOpen", value: val }),
        onDeleteLead: () => deleteLead(),
        transferOpen,
        setTransferOpen: val => dispatch({ type: "UPDATE_VALUE", key: "transferOpen", value: val }),
        userVal,
        setUserVal: val => dispatch({ type: "UPDATE_VALUE", key: "userVal", value: val }),
        onTransferLead: body => {
          transfer({ body })
        },
        transferLoading,
        selectLoading,
        deleteLoading,
        onUpdateLeadSubmit: body => updateLead(body),
        updateLoading,
        notesLoading,
        leadNotes,
        notesModal,
        setNotesModal: val => dispatch({ type: "UPDATE_VALUE", key: "notesModal", value: val }),
        onAddNote: val =>
          createNote({
            body: {
              body: val,
              type: "GENERAL"
            }
          }),
        noteCreateLoading,
        dispositionModal,
        setDispositionModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "dispositionModal", value: val }),
        onSubmitDisposition: body => updateDisposition({ body }),
        updateDispositionLoading,
        configLoading,
        config,
        users,
        suggestionsLoading,
        onStartJourney: () =>
          startJourney({
            body: {
              product_type: get(selectedLead, "type", "PMI"),
              simulation_mode: get(selfServiceData, "simulation_mode", true)
            }
          }),
        startJourneyLoading,
        hasShowDeleted
      }}
    >
      {children}
      <ApiError
        error={
          queryError ||
          selectError ||
          deleteError ||
          updateError ||
          notesError ||
          noteCreateError ||
          updateDispositionError ||
          configError ||
          suggestionsError ||
          transferError ||
          startJourneyError
        }
      />
    </Provider>
  )
}

LeadsProvider.propTypes = {
  children: PropTypes.any
}

export default LeadsProvider
