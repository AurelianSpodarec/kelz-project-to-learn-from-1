/* eslint-disable no-console */
import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"

// Components
import { Provider } from ".."

// Helpers
import {
  fakeOrganisationGetResponse,
  fakeOrganisationNetworkApplicationsGetResponse,
  fakeOrganisationNetworkInvitationsGetResponse
} from "../../../Helpers"
import reducer from "./organisation.story.reducer"

const TestDetailsProvider = ({ children, value }) => {
  const [{ isEdit, leave, join, withdraw, accept, reject }, dispatch] = React.useReducer(reducer, {
    isEdit: false,
    leave: false,
    join: false,
    withdraw: { isOpen: false, application: null },
    accept: { isOpen: false, invitation: null },
    reject: { isOpen: false, invitation: null }
  })

  return (
    <Provider
      value={{
        data: get(fakeOrganisationGetResponse, "data"),
        applications: get(fakeOrganisationNetworkApplicationsGetResponse, "data", []),
        invitations: get(fakeOrganisationNetworkInvitationsGetResponse, "data", []),
        isEdit,
        setEdit: val => dispatch({ type: "UPDATE_VALUE", key: "isEdit", value: val }),
        onEditDetailsSubmit: val => console.log(val),
        onLeaveNetwork: () => {
          console.log("Leave Network button was clicked")
          dispatch({ type: "UPDATE_VALUE", key: "leave", value: false })
        },
        leave,
        setLeave: val => dispatch({ type: "UPDATE_VALUE", key: "leave", value: val }),
        onJoinNetwork: () => {
          console.log("Join Network button was clicked")
          dispatch({ type: "UPDATE_VALUE", key: "join", value: false })
        },
        join,
        setJoin: val => dispatch({ type: "UPDATE_VALUE", key: "join", value: val }),
        networks: [],
        setNetworkVal: () => console.log("Network val was changed"),
        withdraw,
        setWithdraw: val => dispatch({ type: "UPDATE_VALUE", key: "withdraw", value: val }),
        onWithdrawApplication: () => {
          console.log("Application was withdrawn")
          dispatch({
            type: "UPDATE_VALUE",
            key: "withdraw",
            value: { isOpen: false, application: null }
          })
        },
        accept,
        setAccept: val => dispatch({ type: "UPDATE_VALUE", key: "accept", value: val }),
        reject,
        setReject: val => dispatch({ type: "UPDATE_VALUE", key: "reject", value: val }),
        onAcceptInvitation: () => {
          console.log("Invitation was accepted")
          dispatch({
            type: "UPDATE_VALUE",
            key: "accept",
            value: { isOpen: false, invitation: null }
          })
        },
        onRejectInvitation: () => {
          console.log("Invitation was rejected")
          dispatch({
            type: "UPDATE_VALUE",
            key: "reject",
            value: { isOpen: false, invitation: null }
          })
        },
        onLogoUpdate: val => console.log(val),
        onLogoDelete: val => console.log(val),
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestDetailsProvider.defaultProps = {
  children: null,
  value: {}
}

TestDetailsProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestDetailsProvider
