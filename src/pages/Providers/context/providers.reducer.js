const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_VALUE": {
      return {
        ...state,
        [action.key]: action.value
      }
    }

    case "FETCH_COMPLETE": {
      return {
        ...state,
        total: action.total,
        data: action.data
      }
    }

    case "UPDATE_SHOW_DELETE_MODAL": {
      return {
        ...state,
        showDeleteModal: action.value
      }
    }
    default:
      return state
  }
}

export default reducer
