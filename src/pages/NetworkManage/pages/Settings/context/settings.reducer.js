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
        consentText: action.consentText,
        exclusionText: action.exclusionText
      }
    }
    case "UPDATE_COMPLETE": {
      return {
        ...state,
        consentText: action.consentText,
        exclusionText: action.exclusionText,
        editConsent: false,
        editExclusion: false,
        deleteConsent: false,
        deleteExclusion: false
      }
    }
    default:
      return state
  }
}

export default reducer
