import React, { useContext } from "react"
import PropTypes from "prop-types"
import { get, pickBy, isNull } from "lodash"
import { useFormik } from "formik"
import { object, string } from "yup"
import { isValidPhoneNumber } from "react-phone-number-input"
import { PhoneInput, Select } from "@4cplatform/elements/Forms"
import { Button } from "@4cplatform/elements/Molecules"
import { useTranslations } from "@4cplatform/elements/Translations"
import { SmallText } from "@4cplatform/elements/Typography"

// Helpers
import { AuthContext } from "@4cplatform/elements/Auth"
import { MyAccountDetailsContext } from "../../details.context"
import { getTwoFactorAuthIcon } from "../../../../Helpers"

// Components
import { ChangeOuterWrapper, ChangeButtonsWrapper } from "./twoFactorAuth.styles"

const ChangeTwoFactorAuth = ({ onClose }) => {
  const {
    authUser: { two_factor_auth_pending: twofaPending, email }
  } = useContext(AuthContext)
  const { onTwofaSetup, twofaSetupLoading } = useContext(MyAccountDetailsContext)

  const t = useTranslations()

  const validationSchema = object({
    type: string()
      .oneOf(
        ["TWO_FA_SMS", "TWO_FA_EMAIL", "TWO_FA_GOOGLE_AUTH"],
        ({ values }) =>
          `must be one of ${values
            .split(", ")
            .map(val => t(val))
            .join(", ")}`
      )
      .required("MISSING_REQUIRED_FIELD"),
    mobile: string().when("type", {
      is: "TWO_FA_SMS",
      then: string()
        .test("Phone invalid", "INVALID_PHONE", val => {
          if (!val) return false
          return isValidPhoneNumber(val, "GB")
        })
        .required("MISSING_REQUIRED_FIELD"),
      otherwise: string().nullable()
    })
  })

  const changeTwofaFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      type: "",
      mobile: null
    },
    validationSchema,
    onSubmit: body => onTwofaSetup({ body: pickBy(body, value => !isNull(value)) })
  })

  const formik = { ...changeTwofaFormik, validationSchema }
  const { handleSubmit } = formik

  const selectedType = get(formik, "values.type")

  return (
    <ChangeOuterWrapper>
      <Select
        name="type"
        label="Type"
        formik={formik}
        leadingIcon={get(getTwoFactorAuthIcon(selectedType), "icon")}
        leadingIconType="prepend"
        margin="0 0 2rem"
      >
        <option value="">Select type</option>
        {["TWO_FA_SMS", "TWO_FA_EMAIL", "TWO_FA_GOOGLE_AUTH"].map(key => (
          <option value={key} key={key}>
            {t(key)}
          </option>
        ))}
      </Select>
      {selectedType === "TWO_FA_EMAIL" && (
        <SmallText>
          The authentication code will be sent to: <br /> {email}
        </SmallText>
      )}
      {selectedType === "TWO_FA_SMS" && <PhoneInput name="mobile" label="Mobile" formik={formik} />}
      <ChangeButtonsWrapper>
        <Button
          onClick={handleSubmit}
          isLoading={twofaSetupLoading}
          trailingIcon="chevron-right"
          name="setup_two_factor_auth"
        >
          {twofaPending ? "Change" : "Setup"} authentication
        </Button>
        <Button
          appearance="error"
          onClick={onClose}
          isDisabled={twofaSetupLoading}
          trailingIcon="cancel"
          name="two_factor_auth_cancel"
        >
          Cancel
        </Button>
      </ChangeButtonsWrapper>
    </ChangeOuterWrapper>
  )
}

ChangeTwoFactorAuth.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default ChangeTwoFactorAuth
