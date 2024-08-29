import React from "react"
import { get, find } from "lodash"
import { Skeleton, ComplianceNote } from "@4cplatform/elements/Molecules"
import { P } from "@4cplatform/elements/Typography"

// Helpers
import { AuthContext } from "@4cplatform/elements/Auth"
import { PageContext } from "../../Organisms"
import { MY_ACCOUNT } from "../../../config/pages"

// Components
import { Avatar, IconWithText } from "../../Atoms"
import {
  WarningsWrapper,
  UserInfoWrapper,
  UserTextWrapper,
  SelfServiceWrapper,
  Name,
  Email,
  LogoutWrapper,
  LoadingWrapper,
  SkeletonWrapper
} from "./header.styles"
import UserNotifications from "./header.user.notifications"

const UserInfo = () => {
  const { selfServiceData: user, selfServiceLoading: isLoading } = React.useContext(PageContext)
  const { logout, logoutLoading } = React.useContext(AuthContext)

  const firstName = get(user, "first_name", "-")
  const lastName = get(user, "last_name", "-")
  const hasSimulationMode = get(
    find(user.settings, ({ key }) => key === "SIMULATION_MODE"),
    "data.value",
    false
  )

  return (
    <SelfServiceWrapper data-testid="self-service-wrapper">
      <WarningsWrapper>
        {hasSimulationMode && (
          <ComplianceNote
            type="error"
            margin="1.5rem 0"
            padding="0rem 3.75rem 0rem 1rem"
            customIcon="cube-outline"
          >
            <P lineHeight="38px" margin="0">
              Simulation mode
            </P>
          </ComplianceNote>
        )}
      </WarningsWrapper>
      <UserInfoWrapper
        to={{ pathname: MY_ACCOUNT.path, search: "?my-account=details" }}
        data-testid="user_info-wrapper"
      >
        <Avatar
          name="self-service"
          first={firstName}
          last={lastName}
          margin="1rem"
          isLoading={isLoading}
        />
        <UserTextWrapper>
          {!isLoading && (
            <>
              <Name data-testid="self-service-name">{`${firstName} ${lastName}`}</Name>
              <Email data-testid="self-service-email">{`${get(user, "email", "-")}`}</Email>
            </>
          )}
          {isLoading && (
            <LoadingWrapper>
              <Skeleton wrapper={SkeletonWrapper} />
              <Skeleton wrapper={Email} />
            </LoadingWrapper>
          )}
        </UserTextWrapper>
      </UserInfoWrapper>
      <UserNotifications />
      <LogoutWrapper data-testid="logout-button" role="button" onClick={() => logout()}>
        <IconWithText
          icon="exit-to-app"
          iconSize="2.2rem"
          appearance="light"
          margin="0"
          fontSize="1.2rem"
          content="Log out"
          isLoading={logoutLoading}
          loadingWidth="4.067rem"
        />
      </LogoutWrapper>
    </SelfServiceWrapper>
  )
}

export default UserInfo
