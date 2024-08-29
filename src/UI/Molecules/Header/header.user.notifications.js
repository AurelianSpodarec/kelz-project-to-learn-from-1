import React from "react"
import { isEmpty } from "lodash"
import { Icon } from "@4cplatform/elements/Atoms"
import { colours } from "@4cplatform/elements/Helpers"

// Components
import { NotificationsWrapper, NotificationsIcon, Indicator } from "./header.styles"

// Helpers
import { PageContext } from "../../Organisms"

const UserNotifications = () => {
  const { notifications } = React.useContext(PageContext)
  const hasNotifications = !isEmpty(notifications)
  return (
    <NotificationsWrapper data-testid="self-service-notifications">
      <NotificationsIcon data-testid="self-service-icon">
        <Icon
          size="2.2rem"
          icon="bell"
          style={{ transform: "rotate(-10deg)" }}
          colour={colours.white}
        />
        {hasNotifications && <Indicator />}
      </NotificationsIcon>
    </NotificationsWrapper>
  )
}

export default UserNotifications
