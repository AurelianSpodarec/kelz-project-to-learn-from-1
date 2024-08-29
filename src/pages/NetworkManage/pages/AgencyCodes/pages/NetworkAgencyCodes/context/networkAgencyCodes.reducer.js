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

    case "SHARED_FETCH_COMPLETE": {
      return {
        ...state,
        sharedTotal: action.total,
        sharedData: action.data
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

    case "ADD_REQUEST_AGENCY_CODE": {
      return {
        ...state,
        addRequestModal: false
      }
    }

    case "FETCH_SHARED_ORGANISATIONS_COMPLETE": {
      return {
        ...state,
        sharedOrganisationsTotal: action.total,
        sharedOrganisations: action.data
      }
    }

    default:
      return state
  }
}

export default reducer
