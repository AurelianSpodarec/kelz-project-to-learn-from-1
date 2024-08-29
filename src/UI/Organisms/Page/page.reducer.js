const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_VALUE": {
      return {
        ...state,
        [action.key]: action.value
      }
    }

    case "SET_PANEL_STATUS": {
      return {
        ...state,
        panelStatus: action.status,
        prevPanelStatus: state.panelStatus
      }
    }

    case "SELF_SERVICE_UPDATE": {
      return {
        ...state,
        user: action.user
      }
    }

    case "RESET_PANEL": {
      return {
        ...state,
        panelStatus: "closed",
        prevPanelStatus: "closed"
      }
    }
    default:
      return state
  }
}

export default reducer
