import React, { useContext } from "react"
import { Modal } from "@4cplatform/elements/Molecules"

// Helpers
import { AuthContext } from "@4cplatform/elements/Auth"
import { MyAccountDetailsContext } from "../../details.context"

// Components
import ChangeTwoFactorAuth from "./twoFactorAuth.change"
import CompleteTwoFactorAuth from "./twoFactorAuth.complete"

const TwoFactorAuth = () => {
  const {
    authUser: { two_factor_auth_pending: twofaPending }
  } = useContext(AuthContext)
  const { toggleTwofa } = React.useContext(MyAccountDetailsContext)

  return (
    <Modal
      title="Set up two-factor authentication"
      onClose={() => toggleTwofa(false)}
      hasPadding={false}
    >
      {twofaPending && twofaPending !== "TWO_FA_NONE" && <CompleteTwoFactorAuth />}
      <ChangeTwoFactorAuth onClose={() => toggleTwofa(false)} />
    </Modal>
  )
}

export default TwoFactorAuth
