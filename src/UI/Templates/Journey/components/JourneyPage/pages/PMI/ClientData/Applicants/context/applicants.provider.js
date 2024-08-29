import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { useGet, useDelete, usePost, usePatch, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useTranslations } from "@4cplatform/elements/Translations"

// Components
import { Provider } from "../applicants.context"

// Helpers
import reducer from "./applicants.reducer"
import { JourneyContext } from "../../../../../../../journey.context"

const ApplicantsProvider = ({ children }) => {
  const { data } = React.useContext(JourneyContext)
  const { addAlert } = React.useContext(AlertsContext)
  const t = useTranslations()
  const [
    {
      applicants,
      included,
      page,
      perPage,
      total,
      includedPage,
      includedPerPage,
      includedTotal,
      addModal,
      hasAlias,
      addAliasModal,
      updateAliasModal,
      deleteAliasModal,
      editApplicantModal,
      deleteApplicantModal,
      alias
    },
    dispatch
  ] = React.useReducer(reducer, {
    applicants: [],
    included: [],
    page: 1,
    perPage: 10,
    total: null,
    includedPage: 1,
    includedPerPage: 10,
    includedTotal: null,
    addModal: { type: null, isOpen: false },
    hasAlias: true,
    addAliasModal: false,
    updateAliasModal: false,
    deleteAliasModal: false,
    editApplicantModal: { applicant: null, isOpen: false },
    deleteApplicantModal: { applicant: null, isOpen: false },
    alias: {}
  })

  // Index applicants
  const {
    loading: queryLoading,
    error: queryError,
    refetch: queryRefetch
  } = useGet({
    endpoint: "/journeys/:slug/applicants",
    params: {
      slug: get(data, "journey.slug")
    },
    query: {
      page,
      limit: perPage,
      with: ["journeyData"]
    },
    onCompleted: res =>
      dispatch({
        type: "FETCH_APPLICANTS_COMPLETE",
        total: get(res, "pagination.totalItems"),
        data: get(res, "data", [])
      })
  })

  // Index included applicants
  const {
    loading: includedLoading,
    error: includedError,
    refetch: includedRefetch
  } = useGet({
    endpoint: "/journeys/:slug/applicants",
    params: {
      slug: get(data, "journey.slug")
    },
    query: {
      page: includedPage,
      limit: includedPerPage,
      with: ["journeyData"],
      included: true
    },
    onCompleted: res =>
      dispatch({
        type: "FETCH_INCLUDED_COMPLETE",
        total: get(res, "pagination.totalItems"),
        data: get(res, "data", [])
      })
  })

  // Add applicant
  const [addApplicant, { loading: addApplicantLoading, error: addApplicantError }] = usePost({
    endpoint: "/journeys/:slug/applicants",
    params: {
      slug: get(data, "journey.slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("APPLICANT_CREATE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "UPDATE_VALUE", key: "addModal", value: false })
      queryRefetch()
    }
  })

  // Update applicant
  const [updateApplicant, { loading: updateApplicantLoading, updateApplicantError }] = usePatch({
    endpoint: "/journeys/:slug/applicants/:applicant",
    params: {
      slug: get(data, "journey.slug", ""),
      applicant: get(editApplicantModal, "applicant.slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("APPLICANT_UPDATE_SUCCESS"),
        type: "success",
        dismissble: true,
        timeout: 5
      })
      queryRefetch()
      dispatch({
        type: "UPDATE_VALUE",
        key: "editApplicantModal",
        value: { isOpen: false, applicant: null }
      })
    }
  })

  // Delete applicant
  const [removeApplicant, { loading: deleteApplicantLoading, error: deleteApplicantError }] =
    useDelete({
      endpoint: "/journeys/:slug/applicants/:applicant",
      onCompleted: () => {
        addAlert({
          message: t("APPLICANT_DELETE_SUCCESS"),
          type: "success",
          dismissible: true,
          timeout: 5
        })
        dispatch({
          type: "UPDATE_VALUE",
          key: "deleteApplicantModal",
          value: { applicant: null, isOpen: false }
        })
        queryRefetch()
        includedRefetch()
      }
    })

  // Get alias
  const {
    loading: aliasLoading,
    error: aliasError,
    refetch: aliasRefetch
  } = useGet({
    endpoint: "/journeys/:slug/aliases",
    params: {
      slug: get(data, "journey.slug", "")
    },
    query: {
      with: ["address"]
    },
    onCompleted: res => dispatch({ type: "FETCH_ALIAS_COMPLETE", alias: get(res, "data[0]", {}) })
  })

  // Add alias
  const [createAlias, { loading: createAliasLoading, error: createAliasError }] = usePost({
    endpoint: "/journeys/:slug/aliases",
    params: {
      slug: get(data, "journey.slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("ALIAS_CREATE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      aliasRefetch()
      dispatch({ type: "UPDATE_VALUE", key: "addAliasModal", value: false })
    }
  })

  // Update alias
  const [updateAlias, { loading: updateAliasLoading, error: updateAliasError }] = usePatch({
    endpoint: "/journeys/:slug/aliases/:alias",
    params: {
      slug: get(data, "journey.slug", ""),
      alias: get(alias, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("ALIAS_UPDATE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      aliasRefetch()
      dispatch({ type: "UPDATE_VALUE", key: "updateAliasModal", value: false })
    }
  })

  // Delete alias
  const [removeAlias, { loading: deleteAliasLoading, error: deleteAliasError }] = useDelete({
    endpoint: "/journeys/:slug/aliases/:alias",
    params: {
      slug: get(data, "journey.slug", ""),
      alias: get(alias, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("ALIAS_DELETE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      aliasRefetch()
      dispatch({ type: "UPDATE_VALUE", key: "deleteAliasModal", value: false })
    }
  })

  // Include applicant
  const [includeApplicant, { loading: includeApplicantLoading, error: includeApplicantError }] =
    usePost({
      endpoint: "/journeys/:slug/applicants/:applicant/include",
      onCompleted: () => {
        addAlert({
          message: t("APPLICANT_INCLUDE_SUCCESS"),
          type: "success",
          dismissible: true,
          timeout: 5
        })
        queryRefetch()
        includedRefetch()
      }
    })

  // Exclude applicant
  const [excludeApplicant, { loading: excludeApplicantLoading, error: excludeApplicantError }] =
    usePost({
      endpoint: "/journeys/:slug/applicants/:applicant/exclude",
      onCompleted: () => {
        addAlert({
          message: t("APPLICANT_EXCLUDE_SUCCESS"),
          type: "success",
          dismissible: true,
          timeout: 5
        })
        queryRefetch()
        includedRefetch()
      }
    })

  return (
    <Provider
      value={{
        applicants,
        included,
        alias,
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        addModal,
        setAddModal: val => dispatch({ type: "UPDATE_VALUE", key: "addModal", value: val }),
        hasAlias,
        setHasAlias: val => dispatch({ type: "UPDATE_VALUE", key: "hasAlias", value: val }),
        addAliasModal,
        setAddAliasModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "addAliasModal", value: val }),
        updateAliasModal,
        setUpdateAliasModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "updateAliasModal", value: val }),
        deleteAliasModal,
        setDeleteAliasModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "deleteAliasModal", value: val }),
        deleteAlias: () => {
          removeAlias()
        },
        editApplicantModal,
        setEditApplicantModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "editApplicantModal", value: val }),
        deleteApplicantModal,
        setDeleteApplicantModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "deleteApplicantModal", value: val }),
        deleteApplicant: applicant => {
          removeApplicant({
            params: {
              slug: get(data, "journey.slug", ""),
              applicant: get(applicant, "slug", "")
            }
          })
        },
        applicantsLoading: queryLoading,
        updateApplicant: body => {
          updateApplicant({ body })
        },
        updateApplicantLoading,
        deleteApplicantLoading,
        aliasLoading,
        createAliasLoading,
        addAlias: body => {
          createAlias({ body })
        },
        updateAlias: body => {
          updateAlias({ body })
        },
        updateAliasLoading,
        deleteAliasLoading,
        addApplicant: body => {
          addApplicant({ body })
        },
        addApplicantLoading,
        includeApplicant: applicant => {
          includeApplicant({
            params: {
              applicant,
              slug: get(data, "journey.slug", "")
            }
          })
        },
        includeApplicantLoading,
        excludeApplicant: applicant => {
          excludeApplicant({
            params: {
              applicant,
              slug: get(data, "journey.slug", "")
            }
          })
        },
        excludeApplicantLoading,
        includedLoading,
        pagination: { total, page, perPage },
        includedPagination: { total: includedTotal, page: includedPage, perPage: includedPerPage },
        includedPerPage,
        setIncludedPerPage: val =>
          dispatch({ type: "UPDATE_VALUE", key: "includedPerPage", value: val }),
        includedPage,
        setIncludedPage: val => dispatch({ type: "UPDATE_VALUE", key: "includedPage", value: val })
      }}
    >
      {children}
      <ApiError
        error={
          queryError ||
          deleteApplicantError ||
          aliasError ||
          createAliasError ||
          updateAliasError ||
          deleteAliasError ||
          addApplicantError ||
          excludeApplicantError ||
          includeApplicantError ||
          updateApplicantError ||
          includedError
        }
      />
    </Provider>
  )
}

ApplicantsProvider.propTypes = {
  children: PropTypes.any
}

export default ApplicantsProvider
