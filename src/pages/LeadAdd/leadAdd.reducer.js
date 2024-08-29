const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_VALUE": {
      return {
        ...state,
        [action.key]: action.value
      }
    }

    case "CLEAR_IMPORT_MODAL": {
      return {
        ...state,
        importOpen: false,
        importErrors: []
      }
    }

    default:
      return state
  }
}

export default reducer
