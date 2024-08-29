import React from "react"
import PropTypes from "prop-types"
import { get, upperFirst } from "lodash"

// Helpers
import { ClientsContext } from "./clients.context"

// Components
import { IconWithText } from "../../Atoms"
import { UserInfoWrapper } from "./clients.styles"

const ClientsPanelHeaderDetails = ({ isEdit }) => {
  const { viewLoading, viewData } = React.useContext(ClientsContext)
  const emailAddress = get(viewData, "email_address", "-")
  const phoneNumber = get(viewData, "phone_numbers.0.number", "-")
  const birthday = get(viewData, "date_of_birth", "-")
  const displayBirthday = new Date(birthday).toLocaleDateString().replace(",", " ")
  const gender = get(viewData, "gender_at_birth", "-")

  return (
    <UserInfoWrapper isEdit={isEdit}>
      <IconWithText
        icon="email"
        appearance="light"
        content={emailAddress}
        margin="0 0 1rem"
        isLoading={viewLoading}
      />
      <IconWithText
        icon="phone"
        appearance="light"
        content={phoneNumber}
        margin="0 0 1rem"
        isLoading={viewLoading}
      />
      <IconWithText
        icon="cake-variant"
        appearance="light"
        content={displayBirthday}
        margin="0 0 1rem"
        isLoading={viewLoading}
      />
      <IconWithText
        icon={gender.toLowerCase() === "female" ? "gender-female" : "gender-male"}
        appearance="light"
        content={upperFirst(gender)}
        margin="0 0 1rem"
        isLoading={viewLoading}
      />
    </UserInfoWrapper>
  )
}

ClientsPanelHeaderDetails.propTypes = {
  isEdit: PropTypes.bool
}

export default ClientsPanelHeaderDetails
