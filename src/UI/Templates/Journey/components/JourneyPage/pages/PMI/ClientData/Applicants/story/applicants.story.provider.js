/* eslint-disable no-console */
import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"

// Components
import { Provider } from ".."

// Helpers
import { fakeApplicantsGetResponse, fakeAliasGetResponse } from "../../../../../../../../../Helpers"
import reducer from "./applicants.story.reducer"

const TestApplicantsProvider = ({ children, value }) => {
  const [
    {
      applicants,
      page,
      perPage,
      addModal,
      hasAlias,
      addAliasModal,
      updateAliasModal,
      deleteAliasModal,
      editApplicantModal,
      deleteApplicantModal
    },
    dispatch
  ] = React.useReducer(reducer, {
    applicants: get(fakeApplicantsGetResponse, "data", []),
    page: 1,
    perPage: 10,
    addModal: { type: null, isOpen: false },
    hasAlias: true,
    addAliasModal: false,
    updateAliasModal: false,
    deleteAliasModal: false,
    editApplicantModal: { applicant: null, isOpen: false },
    deleteApplicantModal: { applicant: null, isOpen: false }
  })

  return (
    <Provider
      value={{
        applicants,
        included: applicants,
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        pagination: { total: 2, page, perPage },
        addModal,
        setAddModal: val => dispatch({ type: "UPDATE_VALUE", key: "addModal", value: val }),
        hasAlias,
        setHasAlias: val => dispatch({ type: "UPDATE_VALUE", key: "hasAlias", value: val }),
        addAliasModal,
        setAddAliasModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "addAliasModal", value: val }),
        removeAlias: () => {
          console.log("Remove alias fired")
          dispatch({ type: "UPDATE_VALUE", key: "hasAlias", value: false })
        },
        updateAlias: body => console.log("update alias", body),
        addAlias: body => {
          console.log("add alias", body)
          dispatch({ type: "UPDATE_VALUE", key: "hasAlias", value: true })
        },
        updateApplicant: body => {
          console.log("update applicant", body)
          dispatch({
            type: "UPDATE_VALUE",
            key: "editApplicantModal",
            value: { isOpen: false, applicant: null }
          })
        },
        addApplicant: body => console.log("add applicant", body),
        canQuoteAxa: true,
        alias: get(fakeAliasGetResponse, "data[0]", {}),
        updateAliasModal,
        setUpdateAliasModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "updateAliasModal", value: val }),
        deleteAliasModal,
        setDeleteAliasModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "deleteAliasModal", value: val }),
        deleteAlias: () => {
          console.log("Remove alias")
          dispatch({ type: "DELETE_ALIAS" })
        },
        editApplicantModal,
        setEditApplicantModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "editApplicantModal", value: val }),
        deleteApplicantModal,
        setDeleteApplicantModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "deleteApplicantModal", value: val }),
        deleteApplicant: () => {
          console.log("Remove applicant")
          dispatch({
            type: "UPDATE_VALUE",
            key: "deleteApplicantModal",
            value: { isOpen: false, applicant: null }
          })
        },
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestApplicantsProvider.defaultProps = {
  value: {},
  children: null
}

TestApplicantsProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestApplicantsProvider
