import React, { useContext } from "react"
import { useTranslations } from "@4cplatform/elements/Translations"
import { P, H3 } from "@4cplatform/elements/Typography"

// Helpers
import { MyAccountDetailsContext } from "../../details.context"

// Components
import {
  GoogleWrapper,
  BadgesWrapper,
  BadgeLink,
  StoreBadge,
  QRWrapper,
  QRCode,
  QRCodeImage,
  GoogleSecret
} from "./twoFactorAuth.styles"
import { googleBadgeSrc, appleBadgeSrc } from "./twoFactorAuth.complete.google.badges"

const GoogleTwoFactorAuth = () => {
  const {
    twofaGoogle: { qrcode, secret }
  } = useContext(MyAccountDetailsContext)

  const t = useTranslations()

  return (
    <GoogleWrapper>
      <H3 margin="0 0 1rem">{t("TWO_FA_GOOGLE_AUTH")} App</H3>
      <P>External links will open on a new window.</P>
      <BadgesWrapper>
        <BadgeLink
          href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
          target="_blank"
        >
          <StoreBadge src={googleBadgeSrc} />
          Google Play and the Google Play
          <br />
          logo are trademarks of Google LLC.
        </BadgeLink>
        <BadgeLink
          href="https://apps.apple.com/app/google-authenticator/id388497605"
          target="_blank"
        >
          <StoreBadge src={appleBadgeSrc} />
          App Store® and Apple logo® are
          <br />
          trademarks of Apple Inc.
        </BadgeLink>
      </BadgesWrapper>
      <QRWrapper>
        <QRCode>
          <QRCodeImage src={qrcode} />
        </QRCode>
        <P margin="0">
          Use the app to scan the QR code and insert the resulted authentication code below.
        </P>
      </QRWrapper>
      <H3>{t("TWO_FA_GOOGLE_AUTH")} key</H3>
      <P margin="0 0 1rem">
        If you are having problems with the QR code, please manually enter the below key into the
        app.
      </P>
      <GoogleSecret margin="0">{secret}</GoogleSecret>
    </GoogleWrapper>
  )
}

export default GoogleTwoFactorAuth
