import React from "react"
import CheckBox from "@4cplatform/elements/Forms/Checkbox"
import { AuthWrapper } from "@4cplatform/elements/Auth"
import { Select } from "@4cplatform/elements/Forms"
import { useTranslations } from "@4cplatform/elements/Translations"

// Helpers
import { UsersContext } from "./users.context"

// Components
import {
  TableActionsWrapper,
  TableActionsButton,
  TableActionsRight,
  TableActionsLeft
} from "./users.styles"
import { Search } from "../../Molecules"

const Actions = () => {
  const {
    setSearch,
    showDeleted,
    hasParentFilter,
    parentType,
    setParentType,
    setShowDeleted,
    createUserRoute
  } = React.useContext(UsersContext)
  const t = useTranslations()

  const parentTypes = ["NETWORK", "ORGANISATION", "PROVIDER"]

  return (
    <TableActionsWrapper data-testid="users-actions-wrapper">
      <TableActionsLeft>
        <CheckBox
          label="Show deleted users"
          margin="0 1rem 0 0"
          name="show_deleted"
          value={showDeleted}
          onChange={setShowDeleted}
        />
      </TableActionsLeft>
      <TableActionsRight>
        {hasParentFilter && (
          <AuthWrapper roles={["SYS_ADMIN", "SUPPORT_ADMIN"]}>
            <Select
              name="filter_parent_type"
              onChange={val => setParentType(val)}
              margin="0"
              value={parentType || ""}
              label="Filter parent type by"
              labelWidth="auto"
              isHorizontal
            >
              <option value="">Select type</option>
              {parentTypes.map(key => (
                <option key={key} value={key}>
                  {t(key)}
                </option>
              ))}
            </Select>
          </AuthWrapper>
        )}
        <Search
          name="search_users"
          handleChange={val => setSearch(val)}
          onCancel={() => setSearch("")}
          margin={hasParentFilter ? "0 2rem 0 2rem" : "0 2rem 0 0"}
        />
        <TableActionsButton
          trailingIcon="account-plus"
          type="Link"
          to={createUserRoute || "/users/add"}
          name="add_user"
        >
          Add user
        </TableActionsButton>
      </TableActionsRight>
    </TableActionsWrapper>
  )
}

export default Actions
