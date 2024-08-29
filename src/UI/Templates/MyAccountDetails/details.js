import React, { useContext } from "react"
import { get } from "lodash"
import { Row, Column } from "@4cplatform/elements/Atoms"
import { SmallText } from "@4cplatform/elements/Typography"
import { Button } from "@4cplatform/elements/Molecules"
import { useTranslations } from "@4cplatform/elements/Translations"
import { AuthContext } from "@4cplatform/elements/Auth"
import { colours } from "@4cplatform/elements/Helpers"

// Helpers
import { MyAccountDetailsContext } from "./details.context"
import { getTwoFactorAuthIcon, getName } from "../../Helpers"

// Components
import { LabelWithText, IconWithText } from "../../Atoms"
import { DetailsRow } from "./details.styles"
import MyAccountUpdateDetails from "./details.update"
import ChangePassword from "./components/ChangePassword"
import TwoFactorAuth from "./components/TwoFactorAuth"

const MyAccountDetails = () => {
  const {
    authUser: { two_factor_auth: twofaType, two_factor_auth_pending: twofaPending } = {
      two_factor_auth: "TWO_FA_NONE",
      two_factor_auth_pending: null
    },
    authUserLoading,
    twofaSatisfied
  } = useContext(AuthContext)
  const {
    user,
    userLoading,
    detailsOpen,
    toggleUpdateDetails,
    changePasswordOpen,
    toggleChangePassword,
    twofaOpen,
    toggleTwofa,
    onTwofaReset,
    twofaResetLoading
  } = useContext(MyAccountDetailsContext)
  const t = useTranslations()

  return (
    <>
      <DetailsRow data-testid="details-wrapper">
        {/* Name, Email */}
        <Column tablet={4} medium={4} large={4} xLarge={4} padding="0">
          <LabelWithText
            label="Full name"
            content={getName({ data: user, hasMiddle: true, hasTitle: true })}
            isLoading={userLoading}
          />
          <LabelWithText
            label="Email address"
            content={get(user, "email", "-")}
            isLoading={userLoading}
          />
        </Column>
        {/* Org Info */}
        <Column tablet={4} medium={4} large={4} xLarge={4} padding="0">
          <LabelWithText
            label="Account type"
            content={t(get(user, "role.name", "-"))}
            isLoading={userLoading}
          />
          {get(user, "parent", false) && (
            <LabelWithText
              label={`${t(get(user, "parent.type"))} name`}
              content={get(user, "parent.name", "-")}
            />
          )}
        </Column>
        {/* 2FA Info */}
        <Column tablet={4} medium={4} large={4} xLarge={4} padding="0">
          <LabelWithText label="Two-factor authentication" isLoading={authUserLoading}>
            <IconWithText
              {...getTwoFactorAuthIcon(twofaPending || twofaType, twofaSatisfied)}
              content={t(twofaPending || twofaType)}
              margin="0"
            />
            {twofaPending && (
              <SmallText colour={get(colours, "lightGrey", "lightgrey")} margin="0 0 0 3rem">
                Pending setup completion
              </SmallText>
            )}
            {(twofaType !== "TWO_FA_NONE" || twofaPending) && (
              <Button
                leadingIcon="delete"
                appearance="primaryInline"
                type="inline-button"
                onClick={onTwofaReset}
                name="remove_two_factor_auth"
                isLoading={authUserLoading || twofaResetLoading}
                iconSize="1.5rem"
                margin="2rem 0 0"
              >
                Remove two-factor authentication
              </Button>
            )}
          </LabelWithText>
        </Column>
      </DetailsRow>
      {/* Actions */}
      <Row>
        <Column tablet={4} medium={4} large={4} xLarge={4} padding="0">
          <Button
            leadingIcon="account-reactivate"
            appearance="primaryInline"
            type="inline-button"
            onClick={() => toggleUpdateDetails(true)}
            name="update_personal_information"
            isLoading={userLoading}
          >
            Update personal information
          </Button>
        </Column>
        {/* TODO: Implement 2FA and Password Change when auth service is ready */}
        <Column tablet={4} medium={4} large={4} xLarge={4} padding="0">
          <Button
            leadingIcon="lastpass"
            appearance="primaryInline"
            type="inline-button"
            onClick={() => toggleChangePassword(true)}
            name="change_password"
            isLoading={userLoading}
          >
            Change password
          </Button>
        </Column>
        <Column tablet={4} medium={4} large={4} xLarge={4} padding="0">
          <Button
            leadingIcon="two-factor-authentication"
            appearance="primaryInline"
            type="inline-button"
            name="change_two_factor_authentication"
            isLoading={authUserLoading || twofaResetLoading}
            onClick={() => toggleTwofa(true)}
          >
            {twofaType === "TWO_FA_NONE" && !twofaPending && "Add"}
            {twofaType !== "TWO_FA_NONE" && !twofaPending && "Change"}
            {twofaPending && "Complete"} two-factor authentication {twofaPending && "setup"}
          </Button>
        </Column>
      </Row>
      {/* Modals for actions */}
      {detailsOpen && <MyAccountUpdateDetails onClose={() => toggleUpdateDetails(false)} />}
      {changePasswordOpen && <ChangePassword />}
      {twofaOpen && <TwoFactorAuth />}
    </>
  )
}

export default MyAccountDetails
