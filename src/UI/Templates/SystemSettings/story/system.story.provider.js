/* eslint-disable no-console */
import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"

// Components
import { Provider } from ".."

// Helpers
import { fakeSystemSettingsGetResponse, fakeDueDiligencesGetResponse } from "../../../Helpers"
import reducer from "./system.story.reducer"

const TestSystemSettingsProvider = ({ children, value }) => {
  const [{ maintenance, dueDiligenceEdit, dueDiligenceDelete, createOpen }, dispatch] =
    React.useReducer(reducer, {
      maintenance: false,
      dueDiligenceEdit: { isOpen: false, dueDiligence: null },
      dueDiligenceDelete: { isOpen: false, dueDiligence: null },
      createOpen: false
    })

  return (
    <Provider
      value={{
        maintenance,
        setMaintenance: val => dispatch({ type: "UPDATE_VALUE", key: "maintenance", value: val }),
        data: get(fakeSystemSettingsGetResponse, "data", {}),
        onClickMaintenanceMode: val => console.log(val),
        dueDiligences: get(fakeDueDiligencesGetResponse, "data", []),
        dueDiligenceDelete,
        setDueDiligenceDelete: val =>
          dispatch({ type: "UPDATE_VALUE", key: "dueDiligenceDelete", value: val }),
        dueDiligenceEdit,
        setDueDiligenceEdit: val =>
          dispatch({ type: "UPDATE_VALUE", key: "dueDiligenceEdit", value: val }),
        onDueDiligenceDelete: () => {
          const { dueDiligence } = dueDiligenceDelete
          console.log(`Delete due diligence with id ${dueDiligence}`)
        },
        onDueDiligenceSubmit: body => {
          const { dueDiligence } = dueDiligenceEdit
          console.log(`Submit new due diligence value for item with it ${dueDiligence}`)
          console.log({ body })
        },
        onAddDueDiligence: body => console.log({ body }),

        createOpen,
        setCreateOpen: val => dispatch({ type: "UPDATE_VALUE", key: "createOpen", value: val }),
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestSystemSettingsProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestSystemSettingsProvider
