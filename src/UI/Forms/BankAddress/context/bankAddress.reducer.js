const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FRESH": {
      return {
        ...state,
        display: "fresh"
      }
    }
    case "SET_FILLED_IN": {
      return {
        ...state,
        display: "filled_in"
      }
    }
    default:
      return state
  }
}

export default reducer
