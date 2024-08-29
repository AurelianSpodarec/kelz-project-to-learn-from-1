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

    case "FETCH_ORGANISATIONS_COMPLETE": {
      return {
        ...state,
        documentOrganisationsTotal: action.total,
        documentOrganisations: action.data
      }
    }

    default:
      return state
  }
}

export default reducer
