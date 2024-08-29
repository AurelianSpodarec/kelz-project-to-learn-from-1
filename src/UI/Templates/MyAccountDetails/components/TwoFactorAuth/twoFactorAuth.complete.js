import React, { useContext } from "react"
import { useFormik } from "formik"
import { object, string } from "yup"
import { isEmpty } from "lodash"
import { Input } from "@4cplatform/elements/Forms"
import { ComplianceNote } from "@4cplatform/elements/Molecules"
import { useTranslations } from "@4cplatform/elements/Translations"
import { P, SmallText } from "@4cplatform/elements/Typography"

// Helpers
import { AuthContext } from "@4cplatform/elements/Auth"
import { MyAccountDetailsContext } from "../../details.context"

// Components
import {
  CompleteOuterWrapper,
  CompleteWrapper,
  CompleteInputWrapper,
  SendButton,
  ResendButton
} from "./twoFactorAuth.styles"
import GoogleTwoFactorAuth from "./twoFactorAuth.complete.google"

const CompleteTwoFactorAuth = () => {
  const {
    authUser: { two_factor_auth_pending: twofaPending },
    resend,
    resendLoading
  } = useContext(AuthContext)
  const { onTwofaComplete, twofaCompleteLoading, twofaGoogle } = useContext(MyAccountDetailsContext)

  const t = useTranslations()

  const validationSchema = object({
    code: string()
      .matches(/^\d+$/, "ONLY_DIGITS_ALLOWED")
      .min(6)
      .max(6)
      .required("MISSING_REQUIRED_FIELD")
  })

  const completeTwofaFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: ""
    },
    validationSchema,
    onSubmit: body => onTwofaComplete({ body })
  })

  const formik = { ...completeTwofaFormik, validationSchema }
  const { handleSubmit } = formik

  return (
    <CompleteOuterWrapper>
      <ComplianceNote type="error" margin="0">
        <P>You have not completed two-factor authentication setup</P>
        <SmallText margin="0">
          The code was sent via {t(twofaPending)}.{" "}
          {twofaPending === "TWO_FA_GOOGLE_AUTH" &&
            "If instructions aren't shown below and you haven't set this up via QR code or key before, please re-setup."}
        </SmallText>
      </ComplianceNote>
      {twofaPending === "TWO_FA_GOOGLE_AUTH" && !isEmpty(twofaGoogle) && <GoogleTwoFactorAuth />}
      <CompleteWrapper>
        <CompleteInputWrapper>
          <Input
            name="code"
            label="Authentication code"
            formik={formik}
            leadingIcon="two-factor-authentication"
            margin="0"
          />
          <ResendButton
            type="inline-button"
            appearance="primaryInline"
            onClick={resend}
            isDisabled={twofaCompleteLoading}
            isLoading={resendLoading}
          >
            Resend authentication code
          </ResendButton>
        </CompleteInputWrapper>
        <SendButton
          onClick={handleSubmit}
          appearance="success"
          isLoading={twofaCompleteLoading}
          isDisabled={resendLoading}
          trailingIcon="chevron-right"
          name="complete_two_factor_auth"
        >
          Complete
        </SendButton>
      </CompleteWrapper>
    </CompleteOuterWrapper>
  )
}

export default CompleteTwoFactorAuth
