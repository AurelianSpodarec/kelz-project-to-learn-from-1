const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_VALUE": {
      return {
        ...state,
        [action.key]: action.value
      }
    }
    case "DELETE_ALIAS": {
      return {
        ...state,
        hasAlias: false,
        deleteAliasModal: false
      }
    }
    default:
      return state
  }
}

export default reducer
