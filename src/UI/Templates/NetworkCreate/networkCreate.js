import React from "react"
import PropTypes from "prop-types"
import { useFormik } from "formik"
import { Input, TextArea, Address } from "@4cplatform/elements/Forms"
import { nullFunc } from "@4cplatform/elements/Helpers"
import { Button } from "@4cplatform/elements/Molecules"
import { H3 } from "@4cplatform/elements/Typography"

// Helpers
import { createNetworkModel as validationSchema } from "./networkCreate.helpers"

// Components
import { SectionWrapper, ButtonsWrapper } from "./networkCreate.styles"

const NetworkCreate = ({ onSubmit, isLoading, initialValues, onCancel }) => {
  // Define fields for Create Network
  const createNetworkFormik = useFormik({
    initialValues: {
      name: "",
      description: "",
      company_registration_number: "",
      fca_reference: "",
      phone_number: "",
      contact_first_name: "",
      contact_last_name: "",
      contact_email_address: "",
      address: {
        postcode: "",
        line_one: "",
        line_two: "",
        city: "",
        county: ""
      },
      ...initialValues
    },
    validationSchema,
    onSubmit: body => onSubmit(body)
  })
  const { handleSubmit } = createNetworkFormik
  const formik = { ...createNetworkFormik, validationSchema }

  return (
    <>
      <SectionWrapper>
        <H3 margin="0 0 2rem">Network Details</H3>
        <Input label="Network name" name="name" formik={formik} placeholder="Input text" />
        <TextArea
          label="Description"
          name="description"
          formik={formik}
          placeholder="User description of field i.e. Secondary contact number"
        />
        <Address label="Address" name="address" formik={formik} />
        <Input label="Phone number" name="phone_number" formik={formik} placeholder="Input text" />
        <Input
          label="Registration number"
          name="company_registration_number"
          formik={formik}
          placeholder="Input text"
        />
        <Input
          label="FCA reference"
          name="fca_reference"
          formik={formik}
          placeholder="Input text"
        />
      </SectionWrapper>
      <SectionWrapper>
        <H3 margin="0 0 2rem">Contact Details</H3>
        <Input
          label="Contact first name"
          name="contact_first_name"
          formik={formik}
          placeholder="Input text"
        />
        <Input
          label="Contact last name"
          name="contact_last_name"
          formik={formik}
          placeholder="Input text"
        />
        <Input
          label="Contact email"
          name="contact_email_address"
          formik={formik}
          placeholder="Input text"
        />
      </SectionWrapper>
      <ButtonsWrapper>
        <Button
          appearance="success"
          trailingIcon="check"
          onClick={handleSubmit}
          margin="0 0 2rem"
          isLoading={isLoading}
          name="create_network"
        >
          Create network
        </Button>
        <Button appearance="error" trailingIcon="cancel" name="cancel" onClick={onCancel}>
          Cancel
        </Button>
      </ButtonsWrapper>
    </>
  )
}

NetworkCreate.defaultProps = {
  onSubmit: nullFunc,
  isLoading: false,
  initialValues: {},
  onCancel: nullFunc
}

NetworkCreate.propTypes = {
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
  initialValues: PropTypes.object,
  onCancel: PropTypes.func
}

export default NetworkCreate
