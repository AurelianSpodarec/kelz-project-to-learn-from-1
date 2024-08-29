import React, { useContext } from "react"
import PropTypes from "prop-types"
import { get, isEmpty, find, upperFirst } from "lodash"
import { object, string, number } from "yup"
import { useFormik } from "formik"
import { AlertsContext } from "@4cplatform/elements/Alerts"
import { useGet } from "@4cplatform/elements/Api"
import { Input, Select } from "@4cplatform/elements/Forms"
import { useTranslations } from "@4cplatform/elements/Translations"
import { Button } from "@4cplatform/elements/Molecules"

// Helpers
import { AgencyCodesContext } from "../../agencyCodes.context"
import { alphanumericRegex } from "../../../../Helpers"

// Components
import { ButtonsWrapper } from "./addRequestCode.styles"

const AddRequestForm = ({ type, resetState }) => {
  const t = useTranslations()
  const { addAlert } = React.useContext(AlertsContext)
  const { onAddAgencyCode, addAgencyCodeLoading, onRequestAgencyCode, requestAgencyCodeLoading } =
    useContext(AgencyCodesContext)
  const isLoading = addAgencyCodeLoading || requestAgencyCodeLoading

  const extraInitialValues =
    type === "add"
      ? {
          agency_code: "",
          primary_commission_rate: 0
        }
      : {}

  const extraValidation =
    type === "add"
      ? {
          agency_code: string()
            .matches(alphanumericRegex, "INVALID_ALPHANUMERIC")
            .required("MISSING_REQUIRED_FIELD"),
          primary_commission_rate: number()
            .min(0)
            .max(100)
            .test("maxTwoDecimals", "MAX_TWO_DECIMALS", no => /^\d+(\.\d{1,2})?$/.test(no))
        }
      : {}

  const validationSchema = object({
    product_type: string().required("MISSING_REQUIRED_FIELD"),
    provider_id: string().required("MISSING_REQUIRED_FIELD"),
    product: string().required("MISSING_REQUIRED_FIELD"),
    ...extraValidation
  })

  // Provider index
  const { data: providers = [], loading: providersLoading } = useGet({
    endpoint: "/providers",
    onError: () => {
      addAlert({
        message: t("PROVIDERS_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  // Product types
  const { data: productTypes = [], loading: productTypesLoading } = useGet({
    endpoint: "/product-types",
    onError: () => {
      addAlert({
        message: t("PRODUCT_TYPES_INDEX_ERROR"),
        type: "error",
        dismissible: true,
        timeout: 5
      })
    }
  })

  const productTypeOption = productTypes.PMI

  const addAgencyCodeFormik = useFormik({
    initialValues: {
      product_type: "",
      provider_id: "",
      product: "",
      ...extraInitialValues
    },
    validationSchema,
    onSubmit: body => {
      if (type === "add") {
        onAddAgencyCode({ body })
      } else {
        onRequestAgencyCode({ body })
      }
    }
  })

  const formik = { ...addAgencyCodeFormik, validationSchema }
  const { handleSubmit } = formik

  const products = get(
    find(providers, { id: parseInt(get(formik, "values.provider_id")) }),
    "products",
    {}
  )
  const parsedProducts = !isEmpty(products)
    ? Object.keys(products).map(key => ({ name: key, constant: products[key] }))
    : []

  const selectMargin = type === "request" ? { margin: "0 0 2rem" } : {}

  return (
    <>
      <Select
        name="product_type"
        label="Product type"
        formik={formik}
        isDisabled={productTypesLoading}
      >
        <option value="">Select product type</option>
        {!isEmpty(productTypeOption) && (
          <option
            value={get(productTypeOption, "abbreviation")}
            key={get(productTypeOption, "abbreviation")}
          >
            {get(productTypeOption, "name")}
          </option>
        )}
      </Select>
      <Select
        name="provider_id"
        label="Provider"
        formik={formik}
        isDisabled={isEmpty(providers) || providersLoading}
      >
        <option value="">Select provider</option>
        {providers.map(provider => (
          <option value={get(provider, "id")} key={get(provider, "id")}>
            {get(provider, "name")}
          </option>
        ))}
      </Select>
      <Select
        name="product"
        label="Product"
        formik={formik}
        isDisabled={!get(formik, "values.provider_id") || isEmpty(parsedProducts)}
        {...selectMargin}
      >
        <option value="">Select product</option>
        {parsedProducts.map(product => (
          <option value={get(product, "constant")} key={get(product, "constant")}>
            {get(product, "name")}
          </option>
        ))}
      </Select>
      {type === "add" && (
        <>
          <Input
            name="agency_code"
            formik={formik}
            label="Agency code"
            leadingIconType="prepend"
            leadingIcon="pound"
          />
          <Input
            min={0}
            max={100}
            step={0.01}
            type="number"
            name="primary_commission_rate"
            formik={formik}
            label="Primary commision rate"
            leadingIconType="prepend"
            leadingIcon="percent-outline"
            margin="0 0 2rem"
          />
        </>
      )}
      <ButtonsWrapper>
        <Button
          appearance="success"
          name={`${type}_agency_code`}
          trailingIcon="chevron-right"
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          {upperFirst(type)}
        </Button>
        <Button
          appearance="error"
          name="cancel"
          onClick={() => resetState()}
          trailingIcon="cancel"
          isDisabled={isLoading}
        >
          Cancel
        </Button>
      </ButtonsWrapper>
    </>
  )
}

AddRequestForm.propTypes = {
  type: PropTypes.string.isRequired,
  resetState: PropTypes.func.isRequired
}

export default AddRequestForm
