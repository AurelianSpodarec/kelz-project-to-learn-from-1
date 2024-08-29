import { get } from "lodash"
import { number, object, boolean, array } from "yup"
import { Avatar } from "../../../Atoms"
import { getUserAccess } from "../agencyCodes.helpers"

/**
 * This is a helper function which returns an array of column objects
 * It is meant for use in the OrganisationAgencyCodes index table
 * @param {*} type string
 * @returns Array of objects
 */
export const getAdditionalColumns = type => {
  switch (type) {
    case "shared_from_network": {
      return [
        {
          label: "Rate",
          dataKey: "primary_commission_rate",
          minWidth: "50px",
          render: row =>
            get(row, "data.primary_commission_rate")
              ? `${get(row, "data.primary_commission_rate")}%`
              : "0%",
          sortable: true
        }
      ]
    }
    case "shared_with_users":
      return [
        {
          label: "Shared With",
          dataKey: "shared_with_count",
          minWidth: "100px",
          sortable: true,
          render: row => getUserAccess(get(row, "data"))
        }
      ]
    case "assigned_to_users": {
      return [
        {
          label: "User",
          dataKey: "user",
          minWidth: "80px",
          sortable: true,
          render: row => (
            <Avatar
              first={get(row, "data.owner.attributes.first_name", "")}
              last={get(row, "data.owner.attributes.last_name", "")}
              name="assigned_user"
            />
          )
        }
      ]
    }
    default:
      return []
  }
}

/**
 * validationSchema for the addUsersFormik instance
 */
export const addUsersModel = object({
  user_id: number().nullable()
})

/**
 * validationSchema for the shareAgencyCodeFormik instance
 */
export const shareAgencyCodeModel = object({
  share_to_all: boolean().required("MISSING_REQUIRED_FIELD"),
  share_with: array().nullable()
})
