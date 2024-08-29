const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTE": {
      return {
        ...state,
        notes: [...state.notes, action.note]
      }
    }

    case "FETCH_COMPLETE": {
      return {
        ...state,
        total: action.total,
        notes: action.data
      }
    }
    default:
      return state
  }
}

export default reducer
