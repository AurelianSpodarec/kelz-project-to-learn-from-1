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
    default:
      return state
  }
}

export default reducer
