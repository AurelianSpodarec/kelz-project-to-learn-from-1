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

    case "ADD_REQUEST_AGENCY_CODE": {
      return {
        ...state,
        addRequestModal: false
      }
    }

    default:
      return state
  }
}

export default reducer
