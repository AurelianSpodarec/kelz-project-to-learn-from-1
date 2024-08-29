const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_VALUE": {
      return {
        ...state,
        [action.key]: action.value
      }
    }
    case "ADD_NOTE": {
      return {
        ...state,
        notes: [...state.notes, action.note]
      }
    }
    case "FETCH_APPLICANTS_COMPLETE": {
      return {
        ...state,
        total: action.total,
        applicants: action.data
      }
    }
    case "FETCH_NOTES_COMPLETE": {
      return {
        ...state,
        total: action.total,
        notes: action.notes
      }
    }
    default:
      return state
  }
}

export default reducer
