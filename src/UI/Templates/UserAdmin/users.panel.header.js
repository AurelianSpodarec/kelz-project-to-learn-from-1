import React from "react"
import PropTypes from "prop-types"
import moment from "moment"
import { get, isEmpty } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"
import { H2, SmallText } from "@4cplatform/elements/Typography"
import { useTranslations } from "@4cplatform/elements/Translations"

// Helpers
import { getName } from "../../Helpers"
import { PageContext } from "../../Organisms"
import { UsersContext } from "./users.context"

// Components
import { IconWithText } from "../../Atoms"
import { PanelHeader } from "../../Molecules/FlyOutPanel"

const UsersPanelHeader = ({ selectedUser, context, isDeleted }) => {
  const t = useTranslations()
  const { selectLoading } = React.useContext(UsersContext)
  const { setPanelStatus } = React.useContext(PageContext)
  const parent = get(selectedUser, "parent", {})
  const network = get(selectedUser, "parent.parent", null)
  const deleted = get(selectedUser, "deleted_at")
  const created = get(selectedUser, "created_at", "-")

  return (
    <PanelHeader isDeleted={isDeleted}>
      <H2 appearance="light" isLoading={selectLoading}>
        {getName({ data: selectedUser, hasTitle: true })}
      </H2>

      <SmallText margin="0 0 1rem" appearance="light" isLoading={selectLoading}>
        {get(selectedUser, "email")}
      </SmallText>

      <SmallText margin="0 0 1rem" appearance="light" isLoading={selectLoading}>
        {t(get(selectedUser, "role.name"))}
      </SmallText>

      {!isEmpty(parent) && (
        <SmallText margin={network ? "0" : "0 0 1rem"} appearance="light" isLoading={selectLoading}>
          <b>{get(parent, "name")}</b>
        </SmallText>
      )}

      {!isEmpty(parent) && !!network && (
        <IconWithText
          icon="subdirectory-arrow-right"
          appearance="light"
          content={get(network, "name")}
          fontSize="1.4rem"
          margin={selectLoading ? "1rem 0" : "0 0 1rem"}
          isLoading={selectLoading}
        />
      )}

      <SmallText margin="0 0 1rem" appearance="light" isLoading={selectLoading}>
        {`Account start date: ${moment(created).format("DD/MM/YY HH:mm:ss")}`}
      </SmallText>

      {!!deleted && (
        <SmallText appearance="light" isLoading={selectLoading}>
          {`Account deleted date: ${moment(deleted).format("DD/MM/YY HH:mm:ss")}`}
        </SmallText>
      )}

      {context === "open" && (
        <Button
          appearance="whiteGhost"
          trailingIcon="account-reactivate"
          margin="0 0 2rem"
          onClick={() => setPanelStatus("wide")}
          isDisabled={selectLoading}
          name="edit_user"
        >
          Edit user
        </Button>
      )}
    </PanelHeader>
  )
}

UsersPanelHeader.defaultProps = {
  selectedUser: null
}

UsersPanelHeader.propTypes = {
  selectedUser: PropTypes.object,
  context: PropTypes.oneOf(["open", "wide"]).isRequired,
  isDeleted: PropTypes.bool.isRequired
}

export default UsersPanelHeader
