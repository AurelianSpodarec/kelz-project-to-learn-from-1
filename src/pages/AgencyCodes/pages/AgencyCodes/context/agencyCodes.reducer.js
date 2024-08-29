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

    case "ACTIVATE_AGENCY_CODE": {
      return {
        ...state,
        selectedAgencyCode: null,
        viewData: {},
        activateModal: false
      }
    }

    case "DECLINE_AGENCY_CODE": {
      return {
        ...state,
        selectedAgencyCode: null,
        viewData: {},
        declineModal: false
      }
    }

    case "SUSPEND_AGENCY_CODE": {
      return {
        ...state,
        selectedAgencyCode: null,
        viewData: {},
        suspendModal: false
      }
    }

    case "DELETE_AGENCY_CODE": {
      return {
        ...state,
        selectedAgencyCode: null,
        viewData: {},
        deleteModal: false
      }
    }

    default:
      return state
  }
}

export default reducer
