/* eslint-disable no-fallthrough */
import React, { useContext, useEffect, useReducer } from "react"
import PropTypes from "prop-types"
import { get, map, extend, find, isEqual, isEmpty } from "lodash"
import { useFormik } from "formik"
import { usePost, useDelete, usePatch, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useTranslations } from "@4cplatform/elements/Translations"

// Components
import { Provider } from "../disclosureNotes.context"

// Helpers
import reducer from "./disclosureNotes.reducer"
import { JourneyContext } from "../../../journey.context"

const DisclosureNotesProvider = ({ children }) => {
  const { data, formik } = useContext(JourneyContext)
  const { addAlert } = useContext(AlertsContext)
  const t = useTranslations()

  const [
    {
      disclosureNotes,
      applicants,
      addEditModal,
      noteToDelete,
      noteValidationSchema,
      confirmationModal
    },
    dispatch
  ] = useReducer(reducer, {
    disclosureNotes: get(data, "journey.policy.disclosure_notes", []),
    applicants: get(data, "journey.applicants", []),
    addEditModal: { type: null, isOpen: false, field: "", noteInitialValues: {} },
    noteToDelete: {
      id: null,
      fieldName: null,
      notesArrayToDelete: []
    },
    noteValidationSchema: {},
    confirmationModal: {
      warningText: "",
      isOpen: false,
      fieldName: null,
      query: "",
      noteId: null,
      closedSelected: false,
      confirmedSelected: false
    }
  })

  // Create disclousure note
  const [uploadNote, { loading: disclosureNoteCreating, error: uploadNoteError }] = usePost({
    endpoint: "/policies/:policy/disclosure-notes",
    params: {
      policy: get(data.journey.policy, "slug", "")
    },
    onCompleted: res => {
      dispatch({
        type: "UPDATE_VALUE",
        key: "addEditModal",
        value: { type: null, isOpen: false, field: "", noteInitialValues: {} }
      })
      dispatch({
        type: "UPDATE_VALUE",
        key: "disclosureNotes",
        value: [...disclosureNotes, res.data]
      })
      addAlert({
        message: t("DISCLOSURE_NOTE_CREATE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
    },
    onError: () => {
      addAlert({
        message: t("DISCLOSURE_NOTE_CREATE_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Update disclousure note
  const [updateNote, { loading: updateNoteLoading, error: updateNoteError }] = usePatch({
    endpoint: "/policies/:policy/disclosure-notes/:disclosure-note",
    onCompleted: res => {
      dispatch({
        type: "UPDATE_VALUE",
        key: "addEditModal",
        value: { type: null, isOpen: false, field: "", noteInitialValues: {} }
      })
      addAlert({
        message: t("DISCLOSURE_NOTE_UPDATE_SUCCESS"),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      dispatch({
        type: "UPDATE_VALUE",
        key: "disclosureNotes",
        value: map(disclosureNotes, note => {
          if (note.id === res.data.id) {
            return extend(note, res.data)
          }
          return note
        })
      })
    },
    onError: () => {
      addAlert({
        message: t("DISCLOSURE_NOTE_UPDATE_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Delete disclousure  note
  const [deleteNote, { loading: deleteLoading, error: deleteError }] = useDelete({
    endpoint: "/policies/:policy/disclosure-notes/:disclosure-note",
    onCompleted: () => {
      addAlert({
        type: "success",
        message: t("DISCLOSURE_NOTE_DELETE_SUCCESS"),
        dismissible: true,
        timeout: 5
      })
      let filteredDisclosureNotes = []
      if (!isEmpty(noteToDelete.notesArrayToDelete)) {
        filteredDisclosureNotes = disclosureNotes.filter(
          note => note.id !== noteToDelete.notesArrayToDelete[0].id
        )
        dispatch({
          type: "UPDATE_VALUE",
          key: "disclosureNotes",
          value: filteredDisclosureNotes
        })
        dispatch({
          type: "UPDATE_VALUE",
          key: "noteToDelete",
          value: {
            ...noteToDelete,
            fieldName: noteToDelete.fieldName,
            notesArrayToDelete: noteToDelete.notesArrayToDelete.filter(
              note => note.id !== noteToDelete.notesArrayToDelete[0].id
            )
          }
        })
      } else if (noteToDelete.id) {
        filteredDisclosureNotes = disclosureNotes.filter(note => note.id !== noteToDelete.id)
        dispatch({
          type: "UPDATE_VALUE",
          key: "disclosureNotes",
          value: filteredDisclosureNotes
        })
      }
      // if no disclosure notes assosiated with the field left, then set the field value to false
      if (
        !find(filteredDisclosureNotes, note => note.field === noteToDelete.fieldName) &&
        get(formik, `values.${noteToDelete.fieldName}`)
      ) {
        formik.setFieldValue(noteToDelete.fieldName, false)
        dispatch({
          type: "UPDATE_VALUE",
          key: "noteToDelete",
          value: {
            id: null,
            fieldName: null,
            notesArrayToDelete: []
          }
        })
      }
    },
    onError: () => {
      addAlert({
        type: "error",
        message: t("DISCLOSURE_NOTE_DELETE_ERROR"),
        dismissible: true,
        timeout: 5
      })
      dispatch({ type: "UPDATE_VALUE", key: "deleteOpen", value: false })
    }
  })

  const disclosureNoteFormik = useFormik({
    initialValues: addEditModal.noteInitialValues,
    validationSchema: noteValidationSchema,
    enableReinitialize: true,
    onSubmit: ({ id, ...values }) => {
      // Apply field to body
      const body = {
        ...values,
        field: addEditModal.field
      }
      if (addEditModal.type === "edit") {
        updateNote({
          body,
          params: {
            policy: get(data, "journey.policy.slug"),
            "disclosure-note": parseInt(id)
          }
        })
      } else {
        uploadNote({ body })
      }
    }
  })

  useEffect(() => {
    if (!isEmpty(noteToDelete.notesArrayToDelete)) {
      deleteNote({
        params: {
          policy: get(data, "journey.policy.slug"),
          "disclosure-note": parseInt(noteToDelete.notesArrayToDelete[0].id)
        }
      })
    } else if (noteToDelete.id) {
      deleteNote({
        params: {
          policy: get(data, "journey.policy.slug"),
          "disclosure-note": parseInt(noteToDelete.id)
        }
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteToDelete])

  const { handleSubmit } = disclosureNoteFormik

  const onCancelOrClose = () => {
    if (!isEqual(disclosureNoteFormik.values, disclosureNoteFormik.initialValues)) {
      dispatch({
        type: "UPDATE_VALUE",
        key: "confirmationModal",
        value: {
          ...confirmationModal,
          warningText: "Unsaved changes will be lost after exiting the modal!",
          isOpen: true,
          query: "deleteNewNote"
        }
      })
    } else {
      if (!find(disclosureNotes, note => note.field === addEditModal.field)) {
        formik.setFieldValue(addEditModal.field, false)
      }
      dispatch({
        type: "UPDATE_VALUE",
        key: "addEditModal",
        value: {
          type: null,
          isOpen: false,
          field: "",
          noteInitialValues: {}
        }
      })
    }
  }

  useEffect(() => {
    if (confirmationModal.closedSelected) {
      dispatch({
        type: "UPDATE_VALUE",
        key: "confirmationModal",
        value: {
          warningText: "",
          isOpen: false,
          fieldName: null,
          query: "",
          noteId: null,
          closedSelected: false,
          confirmedSelected: false
        }
      })
    }

    if (confirmationModal.confirmedSelected) {
      // eslint-disable-next-line default-case
      switch (confirmationModal.query) {
        case "deleteAllNotes": {
          dispatch({
            type: "UPDATE_VALUE",
            key: "noteToDelete",
            value: {
              id: null,
              fieldName: confirmationModal.fieldName,
              notesArrayToDelete: disclosureNotes.filter(
                note => note.field === confirmationModal.fieldName
              )
            }
          })

          break
        }
        case "deleteOneNote": {
          dispatch({
            type: "UPDATE_VALUE",
            key: "noteToDelete",
            value: {
              id: confirmationModal.noteId,
              fieldName: confirmationModal.fieldName,
              notesArrayToDelete: []
            }
          })

          break
        }
        // eslint-disable-next-line no-fallthrough
        case "deleteNewNote": {
          if (!find(disclosureNotes, note => note.field === addEditModal.field)) {
            formik.setFieldValue(addEditModal.field, false)
          }
          dispatch({
            type: "UPDATE_VALUE",
            key: "addEditModal",
            value: {
              type: null,
              isOpen: false,
              field: "",
              noteInitialValues: {}
            }
          })

          break
        }
      }
      dispatch({
        type: "UPDATE_VALUE",
        key: "confirmationModal",
        value: {
          warningText: "",
          isOpen: false,
          fieldName: null,
          query: "",
          noteId: null,
          closedSelected: false,
          confirmedSelected: false
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmationModal])

  return (
    <Provider
      value={{
        disclosureNoteFormik,
        disclosureNotes,
        addEditModal,
        applicants,
        disclosureNoteCreating,
        setAddEditModal: val => dispatch({ type: "UPDATE_VALUE", key: "addEditModal", value: val }),
        setNoteToDelete: val => dispatch({ type: "UPDATE_VALUE", key: "noteToDelete", value: val }),
        handleSubmit,
        deleteLoading,
        noteToDelete,
        updateNoteLoading,
        onCancelOrClose,
        setNoteValidationSchema: val =>
          dispatch({ type: "UPDATE_VALUE", key: "noteValidationSchema", value: val }),
        confirmationModal,
        setConfirmationModal: val =>
          dispatch({
            type: "UPDATE_VALUE",
            key: "confirmationModal",
            value: val
          })
      }}
    >
      {children}
      <ApiError error={uploadNoteError || updateNoteError || deleteError} />
    </Provider>
  )
}

DisclosureNotesProvider.propTypes = {
  children: PropTypes.any
}

export default DisclosureNotesProvider
