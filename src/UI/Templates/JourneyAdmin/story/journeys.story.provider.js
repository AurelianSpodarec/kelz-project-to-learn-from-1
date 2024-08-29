import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"

// Components
import { Provider } from ".."

// Helpers
import { fakeJourneysGetResponse, fakeJourneyGetResponse } from "../../../Helpers"
import reducer from "./journeys.story.reducer"

const TestJourneysProvider = ({ children, value }) => {
  const [
    { data, viewData, page, perPage, showSimulated, search, selectedJourney, sorting, filter },
    dispatch
  ] = React.useReducer(reducer, {
    data: get(fakeJourneysGetResponse, "data", []),
    viewData: get(fakeJourneyGetResponse, "data", {}),
    page: 1,
    perPage: 10,
    search: "",
    selectedJourney: null,
    sorting: { direction: "asc", dataKey: "last_name" },
    filter: "reference"
  })

  return (
    <Provider
      value={{
        data,
        viewData,
        selectedJourney,
        onJourneySelect: row =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedJourney", value: row }),
        onJourneyDeselect: () =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedJourney", value: null }),
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        page,
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        pagination: { total: 50, page, perPage },
        showSimulated,
        setShowSimulated: val =>
          dispatch({ type: "UPDATE_VALUE", key: "showSimulated", value: val }),
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        sorting,
        setFilter: val => dispatch({ type: "UPDATE_VALUE", key: "filter", value: val }),
        filter,
        hasActions: true,
        hasStatusFilters: false,
        selectLoading: false,
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestJourneysProvider.defaultProps = {
  children: null,
  value: {}
}

TestJourneysProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestJourneysProvider
