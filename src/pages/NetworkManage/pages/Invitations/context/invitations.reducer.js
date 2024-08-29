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

    case "INVITE_SUCCESS": {
      return {
        ...state,
        orgVal: "",
        addOpen: false
      }
    }

    case "DELETE_SUCCESS": {
      return {
        ...state,
        cancel: { isOpen: false, invitation: null }
      }
    }

    default:
      return state
  }
}

export default reducer
