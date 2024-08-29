import React, { useContext } from "react"
import PropTypes from "prop-types"
import moment from "moment"
import { get } from "lodash"
import { useFormik } from "formik"
import { Input, DatePicker, Select, PhoneNumbers } from "@4cplatform/elements/Forms"
import { Button } from "@4cplatform/elements/Molecules"
import { ConfigContext } from "@4cplatform/elements/Config"

// Helpers
import { renderTitleOptions, nullFunc } from "@4cplatform/elements/Helpers"
import { createLeadModel as validationSchema } from "./leadCreate.helpers"

// Components
import { Wrapper, ButtonsWrapper } from "./leadCreate.styles"
import LeadImport from "./components/LeadImport"

const LeadCreate = ({
  onSubmit,
  isLoading,
  initialValues,
  onCancel,
  config,
  isOpenImport,
  errors,
  setImportOpen,
  clearImport,
  onImportSubmit,
  isLoadingImport,
  apiErrors
}) => {
  const { LOADING_TITLES, GLOBAL_TITLES } = useContext(ConfigContext)

  // Define fields for Create Lead
  const createLeadFormik = useFormik({
    initialValues: {
      type: "",
      lead_source: "",
      date_of_birth: "",
      gender_at_birth: "",
      title: "",
      first_name: "",
      last_name: "",
      email_address: "",
      phone_numbers: [{ type: "", number: "" }],
      ...initialValues
    },
    validationSchema,
    onSubmit: body => onSubmit(body)
  })
  const { handleSubmit } = createLeadFormik
  const formik = { ...createLeadFormik, validationSchema }
  const sources = get(config, "source", {})

  const fieldProps = {
    formik,
    isHorizontal: true,
    labelWidth: "20rem",
    margin: "0 0 2rem",
    apiErrors
  }

  return (
    <>
      <LeadImport
        isOpen={isOpenImport}
        setIsOpen={setImportOpen}
        clearImport={clearImport}
        onSubmit={onImportSubmit}
        isLoading={isLoadingImport}
        errors={errors}
      />
      <Wrapper>
        <Select name="type" label="Lead type" {...fieldProps}>
          <option value="">Select type</option>
          <option value="PMI">PMI</option>
        </Select>
        <Select name="lead_source" label="Lead source" {...fieldProps}>
          <option value="">Select source</option>
          {/* Build options from config */}
          {Object.keys(sources).map(key => (
            <option value={key} key={key}>
              {sources[key]}
            </option>
          ))}
        </Select>
        <Select name="gender_at_birth" label="Gender at birth" {...fieldProps}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Select>
        <Select name="title" label="Title" isDisabled={LOADING_TITLES} {...fieldProps}>
          {LOADING_TITLES ? (
            <option value="">Loading titles</option>
          ) : (
            <option value="">Select title</option>
          )}
          {renderTitleOptions(GLOBAL_TITLES?.data, formik, "gender_at_birth")}
        </Select>
        <Input name="first_name" label="First Name" {...fieldProps} />
        <Input name="last_name" label="Last Name" {...fieldProps} />
        <Input name="email_address" label="Email Address" {...fieldProps} />
      </Wrapper>
      <Wrapper>
        <PhoneNumbers
          name="phone_numbers"
          formik={formik}
          label="Phone numbers"
          apiErrors={apiErrors}
        />
      </Wrapper>
      <Wrapper>
        <DatePicker
          name="date_of_birth"
          formik={formik}
          label="Date of birth"
          isHorizontal
          labelWidth="20rem"
          dateRangeMax={moment().subtract(18, "years").format("DD/MM/YYYY")}
          apiErrors={apiErrors}
        />
      </Wrapper>
      <ButtonsWrapper>
        <Button
          appearance="success"
          trailingIcon="check"
          onClick={handleSubmit}
          margin="0 0 2rem"
          isLoading={isLoading}
          name="create_lead"
        >
          Create lead
        </Button>
        <Button appearance="error" trailingIcon="cancel" name="cancel" onClick={onCancel}>
          Cancel
        </Button>
      </ButtonsWrapper>
    </>
  )
}

LeadCreate.defaultProps = {
  onSubmit: nullFunc,
  isLoading: false,
  initialValues: {},
  onCancel: nullFunc,
  config: {},
  isOpenImport: false,
  isLoadingImport: false,
  errors: [],
  setImportOpen: nullFunc,
  clearImport: nullFunc
}

LeadCreate.propTypes = {
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
  initialValues: PropTypes.object,
  onCancel: PropTypes.func,
  config: PropTypes.object,
  isOpenImport: PropTypes.bool,
  errors: PropTypes.array,
  setImportOpen: PropTypes.func,
  clearImport: PropTypes.func,
  onImportSubmit: PropTypes.func,
  isLoadingImport: PropTypes.bool,
  apiErrors: PropTypes.object
}

export default LeadCreate
