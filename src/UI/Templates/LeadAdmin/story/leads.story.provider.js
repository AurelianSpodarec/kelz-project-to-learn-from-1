/* eslint-disable no-console */
import React, { useContext } from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { AuthContext } from "@4cplatform/elements/Auth"

// Components
import { Provider } from ".."

// Helpers
import reducer from "./leads.story.reducer"
import {
  fakeLeadsGetResponse,
  fakeLeadGetResponse,
  fakeUsersGetResponse,
  fakeLeadNotesGetResponse,
  fakeLeadConfigGetResponse
} from "../../../Helpers"

const TestLeadsProvider = ({ children, value }) => {
  const { canAccess } = useContext(AuthContext)
  const [
    {
      data,
      leadNotes,
      page,
      perPage,
      search,
      selectedLead,
      sorting,
      editLoading,
      deleteOpen,
      transferOpen,
      userVal,
      notesModal,
      dispositionModal,
      hasShowDeleted
    },
    dispatch
  ] = React.useReducer(reducer, {
    data: get(fakeLeadsGetResponse, "data", []),
    leadNotes: get(fakeLeadNotesGetResponse, "data", []),
    page: 1,
    perPage: 5,
    search: "",
    selectedLead: null,
    sorting: { direction: "asc", dataKey: "last_name" },
    editLoading: false,
    deleteOpen: false,
    transferOpen: false,
    userVal: "",
    notesModal: false,
    dispositionModal: false,
    hasShowDeleted: canAccess(["SYS_ADMIN", "SUPPORT_ADMIN", "ORG_ADMIN"])
  })

  return (
    <Provider
      value={{
        data,
        leadNotes,
        users: get(fakeUsersGetResponse, "data", []),
        selectedLead,
        onLeadSelect: row => {
          const lead =
            get(row, "slug") === "jane-doe"
              ? { first_name: "Jane", last_name: "Doe", email_address: "jane.doe@example.test" }
              : {}
          dispatch({
            type: "UPDATE_VALUE",
            key: "selectedLead",
            value: { ...get(fakeLeadGetResponse, "data", {}), ...lead }
          })
        },
        onLeadDeselect: () => dispatch({ type: "UPDATE_VALUE", key: "selectedLead", value: null }),
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        sorting,
        pagination: { total: 50, page, perPage },
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        onUpdateLeadSubmit: () => {
          dispatch({ type: "UPDATE_VALUE", key: "editLoading", value: true })
        },
        editLoading,
        selectLoading: false,
        deleteOpen,
        setDeleteOpen: val => dispatch({ type: "UPDATE_VALUE", key: "deleteOpen", value: val }),
        onDeleteLead: () => {
          console.log("delete lead!")
          dispatch({ type: "UPDATE_VALUE", key: "deleteOpen", value: false })
        },
        transferOpen,
        setTransferOpen: val => dispatch({ type: "UPDATE_VALUE", key: "transferOpen", value: val }),
        userVal,
        setUserVal: val => dispatch({ type: "UPDATE_VALUE", key: "userVal", value: val }),
        onTransferLead: () => {
          console.log("Transfer lead!")
          dispatch({ type: "UPDATE_VALUE", key: "transferOpen", value: false })
        },
        notesModal,
        setNotesModal: val => dispatch({ type: "UPDATE_VALUE", key: "notesModal", value: val }),
        dispositionModal,
        setDispositionModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "dispositionModal", value: val }),
        onSubmitDisposition: body => console.log(body),
        config: get(fakeLeadConfigGetResponse, "data", {}),
        hasShowDeleted,
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestLeadsProvider.defaultProps = {
  children: null,
  value: {}
}

TestLeadsProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestLeadsProvider
