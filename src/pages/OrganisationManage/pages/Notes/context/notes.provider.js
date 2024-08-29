import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { useGet, usePost, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useParams } from "react-router-dom"

// Helpers
import { PageContext } from "../../../../../UI/Organisms"
import { Provider } from "./notes.context"
import reducer from "./notes.reducer"

const OrganisationNotesProvider = ({ children }) => {
  const { slug } = useParams()
  const { selfServiceData: user } = React.useContext(PageContext)
  const { addAlert } = React.useContext(AlertsContext)
  const [{ notes }, dispatch] = React.useReducer(reducer, { notes: [] })

  // Index notes
  const { loading, error, refetch } = useGet({
    endpoint: "/organisations/:slug/notes",
    params: {
      slug
    },
    onCompleted: res => {
      const data = get(res, "data", [])
      dispatch({ type: "FETCH_COMPLETE", data })
    }
  })

  // Add note to organisation
  const [addNote, { loading: createLoading }] = usePost({
    endpoint: "/organisations/:slug/notes",
    params: {
      slug
    },
    onCompleted: () => {
      refetch()
    },
    onError: () => {
      addAlert({
        message: "There was an error creating the note",
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  return (
    <Provider
      value={{
        notes,
        notesRefetch: refetch,
        notesLoading: loading,
        createLoading,
        onCreateNote: note => addNote({ body: { user_id: user.id, note } })
      }}
    >
      {children}
      <ApiError error={error} />
    </Provider>
  )
}

OrganisationNotesProvider.propTypes = {
  children: PropTypes.any
}

export default OrganisationNotesProvider
