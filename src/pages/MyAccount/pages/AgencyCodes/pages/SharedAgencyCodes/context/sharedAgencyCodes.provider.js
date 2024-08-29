import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { useGet, ApiError } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useTranslations } from "@4cplatform/elements/Translations"
import { Provider } from "../../../../../../../UI/Templates/AgencyCodes"

// Helpers
import { PageContext } from "../../../../../../../UI/Organisms"
import { getOrderBy } from "../../../../../../../UI/Helpers"
import reducer from "./sharedAgencyCodes.reducer"

const MyAccountSharedAgencyCodesProvider = ({ children, isPending }) => {
  const { addAlert } = React.useContext(AlertsContext)
  const { selfServiceData } = React.useContext(PageContext)
  const t = useTranslations()

  const [{ data, search, sorting, page, perPage, total }, dispatch] = React.useReducer(reducer, {
    data: [],
    search: "",
    sorting: { direction: "asc", dataKey: "product_type" },
    page: 1,
    perPage: 10,
    total: null
  })

  // Shared Agency codes
  const { loading: sharedAgencyCodesLoading, error: sharedAgencyCodesError } = useGet({
    endpoint: "/users/:slug/inherited-agency-codes",
    skip: !get(selfServiceData, "slug", null),
    params: {
      slug: get(selfServiceData, "slug", "")
    },
    query: {
      limit: perPage,
      order_by: getOrderBy(sorting),
      pending: isPending,
      page,
      with: ["owner", "provider"]
    },
    onCompleted: res => {
      const newTotal = get(res, "pagination.totalItems")
      const newData = get(res, "data", {})
      dispatch({ type: "FETCH_COMPLETE", total: newTotal, data: newData })
    },
    onError: () => {
      addAlert({
        message: t("AGENCY_CODES_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  return (
    <Provider
      value={{
        data,
        sorting,
        page,
        perPage,
        total,
        sharedAgencyCodesLoading,
        search,
        setSearch: val => dispatch({ type: "UPDATE_VALUE", key: "search", value: val }),
        onSort: newSorting => dispatch({ type: "UPDATE_VALUE", key: "sorting", value: newSorting }),
        pagination: { total, page, perPage },
        setPage: val => dispatch({ type: "UPDATE_VALUE", key: "page", value: val }),
        setPerPage: val => dispatch({ type: "UPDATE_VALUE", key: "perPage", value: val })
      }}
    >
      {children}
      <ApiError error={sharedAgencyCodesError} />
    </Provider>
  )
}

MyAccountSharedAgencyCodesProvider.defaultProps = {
  isPending: false,
  children: null
}

MyAccountSharedAgencyCodesProvider.propTypes = {
  isPending: PropTypes.bool,
  children: PropTypes.any
}

export default MyAccountSharedAgencyCodesProvider
