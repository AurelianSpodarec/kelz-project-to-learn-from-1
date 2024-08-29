import { isEmpty } from "lodash"

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_VALUE": {
      return {
        ...state,
        [action.key]: action.value
      }
    }
    case "FETCH_APPLICANTS_COMPLETE": {
      return {
        ...state,
        total: action.total,
        applicants: action.data
      }
    }
    case "FETCH_INCLUDED_COMPLETE": {
      return {
        ...state,
        includedTotal: action.total,
        included: action.data
      }
    }
    case "FETCH_ALIAS_COMPLETE": {
      return {
        ...state,
        alias: action.alias,
        hasAlias: !isEmpty(action.alias)
      }
    }

    default:
      return state
  }
}

export default reducer
