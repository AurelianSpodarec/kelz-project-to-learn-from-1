import React from "react"
import PropTypes from "prop-types"
import { useFormik } from "formik"
import { get, isEmpty } from "lodash"
import {
  Input,
  DatePicker,
  Select,
  QuerySelect,
  TextArea,
  Checkbox
} from "@4cplatform/elements/Forms"
import { Button } from "@4cplatform/elements/Molecules"
import { H3 } from "@4cplatform/elements/Typography"
import { useTranslations } from "@4cplatform/elements/Translations"

// Helpers
import { nullFunc } from "@4cplatform/elements/Helpers"
import {
  renderProductTypeOptions,
  renderProviderOptions,
  renderProviderProductOptions
} from "../../Helpers"
import { createDealCodeModel as validationSchema } from "./dealCreate.helpers"

// Components
import {
  Wrapper,
  SectionWrapper,
  FieldRow,
  FieldWrapper,
  ButtonsWrapper
} from "./dealCreate.styles"

const DealCodeCreate = ({ onSubmit, providers, isLoading, onCancel, initialValues }) => {
  const t = useTranslations()

  // Define fields for Create Deal Code
  const createDealCodeFormik = useFormik({
    initialValues: {
      product_type: "",
      provider_id: "",
      product: "",
      name: "",
      deal_code: "",
      description: "",
      start_date: "",
      end_date: "",
      style_new: false,
      style_switch: false,
      underwriting_fmu: false,
      underwriting_mori: false,
      quoting: false,
      onboarding: false,
      ...initialValues
    },
    validationSchema,
    onSubmit: body => onSubmit(body)
  })

  const { handleSubmit } = createDealCodeFormik
  const formik = { ...createDealCodeFormik, validationSchema }

  return (
    <Wrapper>
      <SectionWrapper>
        <QuerySelect
          name="product_type"
          label="Product type"
          noun={{ singular: "product type", plural: "product types" }}
          endpoint="/product-types"
          render={renderProductTypeOptions}
          formik={formik}
        />
        <Input name="name" label="Name" formik={formik} />
        <Input
          name="deal_code"
          label="Code"
          formik={formik}
          leadingIcon="pound"
          leadingIconType="prepend"
        />
        <TextArea name="description" label="Description" formik={formik} rows={5} />
        <Select name="provider_id" label="Provider" formik={formik} isDisabled={isEmpty(providers)}>
          <option value="">Select provider</option>
          {renderProviderOptions(providers, true)}
        </Select>
        <Select
          name="product"
          label="Product"
          formik={formik}
          isDisabled={!get(formik, "values.provider_id")}
        >
          <option value="">Select product</option>
          {renderProviderProductOptions(providers, formik, "provider_id", true, t)}
        </Select>

        {/* Dates */}
        <FieldRow>
          <FieldWrapper>
            <DatePicker
              label="Start date"
              name="start_date"
              formik={formik}
              margin="0 0.5rem 0 0"
            />
          </FieldWrapper>
          <FieldWrapper>
            <DatePicker label="End date" name="end_date" formik={formik} margin="0 0 0 0.5rem" />
          </FieldWrapper>
        </FieldRow>
      </SectionWrapper>

      {/* Journey Types */}
      <H3 margin="0 0 2rem">Journey type(s)</H3>
      <FieldRow>
        <Checkbox label="New" name="style_new" formik={formik} margin="0 2rem 0 0" />
        <Checkbox label="Switch" name="style_switch" formik={formik} margin="0" />
      </FieldRow>

      {/* Underwriting Types */}
      <H3 margin="0 0 2rem">Underwriting type(s)</H3>
      <FieldRow>
        <Checkbox label="Moratorium" name="underwriting_mori" formik={formik} margin="0 2rem 0 0" />
        <Checkbox label="FMU" name="underwriting_fmu" formik={formik} margin="0" />
      </FieldRow>

      {/* Display Point */}
      <H3 margin="0 0 2rem">Display point(s)</H3>
      <FieldRow>
        <Checkbox label="Quoting" name="quoting" formik={formik} margin="0 2rem 0 0" />
        <Checkbox label="Onboarding" name="onboarding" formik={formik} margin="0" />
      </FieldRow>
      <ButtonsWrapper>
        <Button
          appearance="success"
          trailingIcon="check"
          onClick={handleSubmit}
          margin="0 0 2rem"
          isLoading={isLoading}
          name="create_deal_code"
        >
          Add code
        </Button>
        <Button appearance="error" trailingIcon="cancel" name="cancel" onClick={onCancel}>
          Cancel
        </Button>
      </ButtonsWrapper>
    </Wrapper>
  )
}

DealCodeCreate.defaultProps = {
  onSubmit: nullFunc,
  providers: [],
  isLoading: false,
  onCancel: nullFunc,
  initialValues: {}
}

DealCodeCreate.propTypes = {
  onSubmit: PropTypes.func,
  providers: PropTypes.array,
  isLoading: PropTypes.bool,
  onCancel: PropTypes.func,
  initialValues: PropTypes.object
}

export default DealCodeCreate
