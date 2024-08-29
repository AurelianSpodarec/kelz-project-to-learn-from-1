import React, { useState, useContext } from "react"
import { useFormik } from "formik"
import { object, string, ref } from "yup"
import { Input, PasswordStrength } from "@4cplatform/elements/Forms"
import { ComplianceNote } from "@4cplatform/elements/Molecules"
import { P } from "@4cplatform/elements/Typography"

// Helpers
import { MyAccountDetailsContext } from "../../details.context"

// Components
import { ConfirmationModal } from "../../../../Molecules"

const ChangePassword = () => {
  const { toggleChangePassword, onChangePassword, changePasswordLoading } =
    useContext(MyAccountDetailsContext)
  const [{ passwordVisible, confirmationVisible }, setState] = useState({
    passwordVisible: false,
    confirmationVisible: false
  })
  const validationSchema = object({
    password: string()
      .required("MISSING_REQUIRED_FIELD")
      .test(
        "regex",
        "Fake error",
        value =>
          new RegExp(/[0-9]/).test(value) &&
          new RegExp(/[a-z]/).test(value) &&
          new RegExp(/[A-Z]/).test(value) &&
          value.length > 7
      ),
    password_confirmation: string()
      .oneOf([ref("password"), null], "and Password must match")
      .required("MISSING_REQUIRED_FIELD")
  })
  const changePasswordFormik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: ""
    },
    validationSchema,
    onSubmit: body => onChangePassword({ body })
  })
  const formik = { ...changePasswordFormik, validationSchema }
  const { handleSubmit } = formik

  return (
    <ConfirmationModal
      title="Change password"
      onConfirm={handleSubmit}
      confirmText="Change password"
      onClose={() => toggleChangePassword(false)}
      confirmAppearance="success"
      isLoadingConfirm={changePasswordLoading}
    >
      <ComplianceNote type="error">
        <P margin="0">
          Please ensure you select a password that is memorable to yourself, but also strong enough
          that it could not be easily guessed by an unauthorised user.
        </P>
        <P margin="0">
          Passwords should contain a minimum of 8 characters and include at least one uppercase
          letter, one lowercase letter and one digit.
        </P>
      </ComplianceNote>
      <Input
        autoComplete="new-password"
        name="password"
        type={passwordVisible ? "text" : "password"}
        label="Your new password"
        leadingIcon="lock"
        trailingIcon={passwordVisible ? "eye-off" : "eye"}
        onClick={() =>
          setState({
            ...{ passwordVisible, confirmationVisible },
            passwordVisible: !passwordVisible
          })
        }
        hasErrorMessage={false}
        formik={formik}
      />
      <PasswordStrength
        validation={{
          hasDigit: new RegExp(/[0-9]/).test(formik.values.password),
          hasLowercase: new RegExp(/[a-z]/).test(formik.values.password),
          hasUppercase: new RegExp(/[A-Z]/).test(formik.values.password),
          hasLength: formik.values.password.length > 7
        }}
      />
      <Input
        autoComplete="new-password"
        name="password_confirmation"
        type={confirmationVisible ? "text" : "password"}
        label="Confirm your new password"
        leadingIcon="lock"
        trailingIcon={confirmationVisible ? "eye-off" : "eye"}
        onClick={() =>
          setState({
            ...{ passwordVisible, confirmationVisible },
            confirmationVisible: !confirmationVisible
          })
        }
        formik={formik}
        margin="0 0 2rem"
      />
    </ConfirmationModal>
  )
}

export default ChangePassword
