import { get } from "lodash"

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
        data: action.data,
        canQuery: false
      }
    }
    case "SUBMIT_COMPLETE": {
      return {
        ...state,
        data: action.data,
        hasSubmitModal: false,
        fieldModal: false
      }
    }
    case "CHANGE_PAGE": {
      return {
        ...state,
        hasSubmitModal: false,
        fieldModal: false,
        canQuery: true,
        data: {
          page: null,
          journey: get(state, "data.journey", null)
        }
      }
    }
    default:
      return state
  }
}

export default reducer
