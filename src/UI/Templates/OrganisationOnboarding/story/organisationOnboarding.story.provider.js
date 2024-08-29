/* eslint-disable no-console */
import React, { useReducer, useMemo } from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import moment from "moment"

// Components
import { Provider } from ".."

// Helpers
import reducer from "./organisationOnboarding.story.reducer"
import {
  fakeOrganisationGetResponse,
  fakeOrganisationDueDiligencesGetResponse
} from "../../../Helpers"

const TestOrganisationOnboardingProvider = ({ children, value: providerValue }) => {
  const organisationData = get(fakeOrganisationGetResponse, "data", {})

  const [{ data, organisation, bypassModal }, dispatch] = useReducer(reducer, {
    data: [],
    organisation: { ...organisationData, active: false },
    bypassModal: false
  })

  const getDueDiligenceLastUpdatedDate = useMemo(() => {
    let latestUpdated = null

    if (data?.length) {
      data.forEach(item => {
        const date = moment(item.updated_at)
        if (!latestUpdated) latestUpdated = moment(date)
        if (moment(date).isAfter(moment(latestUpdated))) latestUpdated = date
      })
    }

    return latestUpdated ? moment(latestUpdated).format("DD/MM/YYYY HH:mm") : ""
  }, [data])

  return (
    <Provider
      value={{
        organisation,
        organisationLoading: false,
        data: get(fakeOrganisationDueDiligencesGetResponse, "data", []),
        refetch: () => console.log("refetch"),
        loading: false,
        bypassModal,
        setBypassModal: value => dispatch({ type: "UPDATE_VALUE", key: "bypassModal", value }),
        onBypass: value => console.log("bypass", value),
        bypassLoading: false,
        onComplete: value => {
          console.log("complete", value)
          const newState = get(fakeOrganisationDueDiligencesGetResponse, "data", [])
          const dueDiligenceItem = newState.find(item => item.id === value.id)

          if (dueDiligenceItem) {
            dueDiligenceItem.complete = true
            dueDiligenceItem.updated_at = new Date()
          }

          dispatch({
            type: "UPDATE_VALUE",
            key: "data",
            value: newState
          })

          if (!newState.filter(item => !item.complete).length)
            organisation.completed_due_diligence_at = new Date()
        },
        dueDiligenceLastUpdated: getDueDiligenceLastUpdatedDate,
        completeLoading: false,
        ...providerValue
      }}
    >
      {children}
    </Provider>
  )
}

TestOrganisationOnboardingProvider.defaultProps = {
  children: null,
  value: {}
}

TestOrganisationOnboardingProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}
export default TestOrganisationOnboardingProvider
