import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { useGet, useDelete, usePost, usePatch, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useTranslations } from "@4cplatform/elements/Translations"

// Components
import { Provider } from "../medicalHistory.context"

// Helpers
import reducer from "./medicalHistory.reducer"
import { JourneyContext } from "../../../../../../../journey.context"

const MedicalHistoryProvider = ({ children }) => {
  const { data } = React.useContext(JourneyContext)
  const { addAlert } = React.useContext(AlertsContext)
  const t = useTranslations()

  const [
    {
      applicants,
      page,
      perPage,
      total,
      notes,
      notesModal,
      onCancelEditForm,
      saveChangesForNoteModal,
      deleteNoteModal,
      onEditHandleSubmit,
      isEdit,
      selectedNote
    },
    dispatch
  ] = React.useReducer(reducer, {
    applicants: [],
    page: 1,
    perPage: 10,
    total: null,
    notes: [],
    notesModal: false,
    onCancelEditForm: null,
    saveChangesForNoteModal: false,
    deleteNoteModal: false,
    onEditHandleSubmit: null,
    isEdit: false,
    selectedNote: null
  })

  // Index applicants
  const { loading: applicantsLoading, error: applicantsError } = useGet({
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

  // Index notes
  const { loading, error, refetch } = useGet({
    endpoint: "/journeys/:slug/medical-notes",
    params: {
      slug: get(data, "journey.slug")
    },
    query: {
      with: ["journeyData"]
    },
    onCompleted: res => {
      const notesData = get(res, "data", [])
      dispatch({ type: "FETCH_NOTES_COMPLETE", notes: notesData })
    }
  })

  // Add note
  const [addNote, { loading: addNoteLoading, error: addNoteError }] = usePost({
    endpoint: "/journeys/:slug/medical-notes",
    params: {
      slug: get(data, "journey.slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t("MEDICAL_NOTE_CREATE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "UPDATE_VALUE", key: "notesModal", value: false })
      refetch()
    }
  })

  // Update note
  const [updateNote, { loading: updateNoteLoading, error: updateNoteError }] = usePatch({
    endpoint: "/journeys/:slug/medical-notes/:medicalNote",
    onCompleted: () => {
      addAlert({
        message: t("MEDICAL_NOTE_UPDATE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      refetch()
    }
  })

  // Delete note
  const [deleteNote, { loading: deleteNoteLoading, error: deleteNoteError }] = useDelete({
    endpoint: "/journeys/:slug/medical-notes/:medicalNote",
    onCompleted: () => {
      addAlert({
        message: t("MEDICAL_NOTE_DELETE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "UPDATE_VALUE", key: "deleteNoteModal", value: false })
      dispatch({ type: "UPDATE_VALUE", key: "selectedNote", value: null })
      refetch()
    }
  })

  return (
    <Provider
      value={{
        data,
        applicants,
        notes,
        perPage,
        notesRefetch: refetch,
        notesLoading: loading,
        applicantsLoading,
        addNoteLoading,
        updateNoteLoading,
        deleteNoteLoading,
        pagination: { total, page, perPage },
        addNote,
        notesModal,
        isEdit,
        selectedNote,
        setEdit: val => dispatch({ type: "UPDATE_VALUE", key: "isEdit", value: val }),
        setSelectedNote: val => dispatch({ type: "UPDATE_VALUE", key: "selectedNote", value: val }),
        setNotesModal: val => dispatch({ type: "UPDATE_VALUE", key: "notesModal", value: val }),
        onCancelEditForm,
        setOnCancelEditForm: val =>
          dispatch({
            type: "UPDATE_VALUE",
            key: "onCancelEditForm",
            value: val
          }),
        saveChangesForNoteModal,
        setSaveChangesForNoteModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "saveChangesForNoteModal", value: val }),
        deleteNoteModal,
        setDeleteNoteModal: val =>
          dispatch({ type: "UPDATE_VALUE", key: "deleteNoteModal", value: val }),
        onDeleteNote: noteSlug => {
          deleteNote({
            params: {
              slug: get(data, "journey.slug", ""),
              medicalNote: noteSlug
            }
          })
        },
        onUpdateNote: (noteSlug, body) => {
          updateNote({
            params: {
              slug: get(data, "journey.slug", ""),
              medicalNote: noteSlug
            },
            body
          })
        },
        onEditHandleSubmit,
        setOnEditHandleSubmit: val =>
          dispatch({ type: "UPDATE_VALUE", key: "onEditHandleSubmit", value: val })
      }}
    >
      {children}
      <ApiError
        error={error || applicantsError || addNoteError || updateNoteError || deleteNoteError}
      />
    </Provider>
  )
}

MedicalHistoryProvider.propTypes = {
  children: PropTypes.any
}

export default MedicalHistoryProvider
