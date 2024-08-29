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

    case "REQUEST_ACCEPT": {
      return {
        ...state,
        selectedRequest: null,
        acceptModal: false
      }
    }

    case "REQUEST_DECLINE": {
      return {
        ...state,
        selectedRequest: null,
        declineModal: false
      }
    }

    default:
      return state
  }
}

export default reducer
