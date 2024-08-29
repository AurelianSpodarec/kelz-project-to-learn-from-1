import React, { useReducer, useContext, useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import { get, isEmpty } from "lodash"
import moment from "moment"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useGet, usePost, ApiError } from "@4cplatform/elements/Api"
import { useTranslations } from "@4cplatform/elements/Translations"

// Helpers
import { Provider } from "../../../../../UI/Templates/OrganisationOnboarding"
import { OrganisationManageContext } from "../../../context/manage.context"
import reducer from "./approval.reducer"

const OrganisationOnboardingProvider = ({ children }) => {
  const t = useTranslations()
  const { addAlert } = useContext(AlertsContext)
  const { organisation, organisationLoading, onUpdateOrganisation } =
    useContext(OrganisationManageContext)

  // State
  const [{ data, bypassModal, toCompleteDiligence }, dispatch] = useReducer(reducer, {
    data: [],
    toCompleteDiligence: {},
    bypassModal: false
  })

  const setBypassModal = value => dispatch({ type: "UPDATE_VALUE", key: "bypassModal", value })

  const onComplete = value => dispatch({ type: "UPDATE_VALUE", key: "toCompleteDiligence", value })

  // Due diligence query
  const { loading, error, refetch } = useGet({
    endpoint: "/organisations/:slug/due-diligences",
    params: {
      slug: get(organisation, "slug", "")
    },
    skip: isEmpty(organisation),
    onCompleted: res =>
      dispatch({ type: "UPDATE_VALUE", key: "data", value: get(res, "data", []) }),
    onError: () => {
      addAlert({
        message: t("DUE_DILIGENCES_INDEX_ERROR"),
        type: "error"
      })
    }
  })

  // Bypass due diligence mutation
  const [onBypass, { loading: bypassLoading, error: bypassError }] = usePost({
    endpoint: "/organisations/:slug/bypass-due-diligence",
    params: {
      slug: get(organisation, "slug", "")
    },
    onCompleted: res => {
      setBypassModal(false)
      onUpdateOrganisation({ ...organisation, ...get(res, "data", {}) })
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("DUE_DILIGENCE_BYPASS_ERROR"),
        dismissible: true,
        timeout: 5
      })
    }
  })

  const getDueDiligenceLastUpdatedDate = useMemo(() => {
    let latestUpdated = null

    if (data.length) {
      data.forEach(item => {
        const date = moment(item.updated_at)
        if (!latestUpdated) latestUpdated = moment(date)
        if (moment(date).isAfter(moment(latestUpdated))) latestUpdated = date
      })
    }

    return latestUpdated ? moment(latestUpdated).format("DD/MM/YYYY HH:mm") : ""
  }, [data])

  // Complete due diligence mutation
  const [onCompleteDiligence, { loading: completeLoading, error: completeError }] = usePost({
    endpoint: `/organisations/:slug/due-diligences/${get(toCompleteDiligence, "id")}/complete`,
    params: {
      slug: get(organisation, "slug", "")
    },
    onCompleted: res => {
      const newData = get(res, "data.due_diligences", [])
      dispatch({ type: "UPDATE_VALUE", key: "data", value: newData })
      onUpdateOrganisation({ ...organisation, ...get(res, "data", {}) })

      // show success message if all items are complete
      if (!newData.filter(item => !item.complete).length)
        addAlert({
          type: "success",
          message: t("DUE_DILIGENCE_COMPLETED"),
          dismissible: true,
          timeout: 5
        })
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("DUE_DILIGENCE_COMPLETE_ERROR"),
        dismissible: true,
        timeout: 5
      })
    }
  })

  useEffect(() => {
    if (!isEmpty(toCompleteDiligence) && !completeLoading) onCompleteDiligence()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toCompleteDiligence])

  return (
    <Provider
      value={{
        organisation,
        organisationLoading,
        data,
        loading,
        refetch,
        bypassModal,
        setBypassModal,
        onBypass,
        bypassLoading,
        onComplete,
        completeLoading,
        dueDiligenceLastUpdated: getDueDiligenceLastUpdatedDate,
        onUpdateOrganisation
      }}
    >
      {children}
      <ApiError error={error || bypassError || completeError} />
    </Provider>
  )
}

OrganisationOnboardingProvider.propTypes = {
  children: PropTypes.any
}

export default OrganisationOnboardingProvider
