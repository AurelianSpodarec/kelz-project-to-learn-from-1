import React, { useContext } from "react"
import PropTypes from "prop-types"
import { get, capitalize, upperCase } from "lodash"
import { useFormik } from "formik"
import { object, number } from "yup"
import { ApiError, usePatch } from "@4cplatform/elements/Api"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useTranslations } from "@4cplatform/elements/Translations"
import { Input } from "@4cplatform/elements/Forms"
import { Button, Skeleton } from "@4cplatform/elements/Molecules"

// Helpers
import { AgencyCodesContext } from "../../agencyCodes.context"

// Components
import { RateWrapper, InputWrapper } from "./commissionRates.styles"

const CommissionRate = ({ isLoading, type }) => {
  const { addAlert } = useContext(AlertsContext)
  const { viewData, queryRefetch, viewRefetch } = useContext(AgencyCodesContext)
  const t = useTranslations()

  // Commision Rate update mutation
  const [onUpdate, { loading: updateLoading, error }] = usePatch({
    endpoint: `/agency-codes/:slug/${type}-commission-rate`,
    params: {
      slug: get(viewData, "slug", "")
    },
    onCompleted: () => {
      addAlert({
        message: t(`${upperCase(type)}_COMMISSION_UPDATE_SUCCESS`),
        type: "success",
        dismissible: true,
        timeout: 5
      })
      queryRefetch()
      viewRefetch()
    },
    onError: () => {
      addAlert({
        message: t(`${upperCase(type)}_COMMISSION_UPDATE_ERROR`),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  const validationSchema = object({
    [`${type}_commission_rate`]: number()
      .min(0)
      .max(100)
      .test("maxDigitsAfterDecimal", "number field must have 2 digits after decimal or less", no =>
        /^\d+(\.\d{1,2})?$/.test(no)
      )
      .required("MISSING_REQUIRED_FIELD")
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      [`${type}_commission_rate`]: get(viewData, `${type}_commission_rate`, 0)
    },
    validationSchema,
    onSubmit: body => onUpdate({ body })
  })

  const isUpdateBtnDisabled =
    !formik.values[`${type}_commission_rate`] ||
    !formik.dirty ||
    (formik.dirty &&
      formik.initialValues[`${type}_commission_rate`] === formik.values[`${type}_commission_rate`])

  return (
    <RateWrapper>
      {isLoading && <Skeleton lineHeight="5rem" />}
      {!isLoading && (
        <>
          <InputWrapper>
            <Input
              min={0}
              max={100}
              step={0.01}
              type="number"
              name={`${type}_commission_rate`}
              formik={{ ...formik, validationSchema }}
              label={capitalize(type)}
              appearance="light"
              leadingIconType="prepend"
              leadingIcon="percent-outline"
              isDisabled={updateLoading}
            />
          </InputWrapper>
          <Button
            name={`update_${type}_commission_rate`}
            appearance="success"
            trailingIcon="check"
            isLoading={updateLoading}
            onClick={formik.handleSubmit}
            margin="2.5rem 0 0"
            isDisabled={isUpdateBtnDisabled}
          >
            Update
          </Button>
          <ApiError error={error} />
        </>
      )}
    </RateWrapper>
  )
}

CommissionRate.defaultProps = {
  isLoading: false
}

CommissionRate.propTypes = {
  isLoading: PropTypes.bool,
  type: PropTypes.oneOf(["primary", "secondary"])
}

export default CommissionRate
