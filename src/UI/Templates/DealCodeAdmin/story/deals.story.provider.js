/* eslint-disable no-console */
import React from "react"
import { get } from "lodash"
import PropTypes from "prop-types"

// Components
import { Provider } from ".."

// Helpers
import reducer from "./deals.story.reducer"
import { fakeDealCodesGetResponse } from "../../../Helpers"

const TestDealCodesProvider = ({ children, value }) => {
  const [{ page, perPage, search, selectedDealCode, sorting }, dispatch] = React.useReducer(
    reducer,
    {
      page: 1,
      search: "",
      selectedDealCode: null,
      sorting: { direction: "asc", dataKey: "last_name" },
      dispositionModal: false
    }
  )

  return (
    <Provider
      value={{
        data: get(fakeDealCodesGetResponse, "data", []),
        selectedDealCode,
        onDealCodeSelect: row =>
          dispatch({ type: "UPDATE_VALUE", key: "selectedDealCode", value: row }),
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        sorting,
        pagination: { total: 50, page, perPage },
        perPage,
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val }),
        onUpdateDealCodeSubmit: body => console.log(body),
        onDeleteDealCode: () => console.log("Delete deal code was clicked"),
        selectLoading: false,
        ...value
      }}
    >
      {children}
    </Provider>
  )
}

TestDealCodesProvider.defaultProps = {
  value: {}
}

TestDealCodesProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.object
}

export default TestDealCodesProvider
