const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_COMPLETE": {
      return {
        ...state,
        total: action.total,
        data: action.data
      }
    }

    case "UPDATE_VALUE": {
      return {
        ...state,
        [action.key]: action.value
      }
    }

    default:
      return state
  }
}

export default reducer
