import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { get, isEmpty } from "lodash"
import { useFormik, FormikProvider } from "formik"
import { Button } from "@4cplatform/elements/Molecules"
import { nullFunc } from "@4cplatform/elements/Helpers"

// Helpers
import { createProviderModel as validationSchema, uploadLogoModel } from "./providerCreate.helpers"

// Components
import {
  FormWrapper,
  InputsWrapper,
  SectionWrapper,
  ButtonsWrapper,
  UploadWrapper,
  UploadImage
} from "./providerCreate.styles"
import ProviderCompanyDetails from "./providerCreate.companyDetails"
import ProviderDepartmentEmails from "./providerCreate.departmentEmails"
import ProviderCustomFields from "./providerCreate.customFields"
import { UploadModal } from "../../Forms"
import { FileList } from "../../Molecules"

const ProviderCreate = ({ onSubmit, isLoading, initialValues, onCancel }) => {
  const [uploadLogo, setUploadLogo] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const uploadImgRef = useRef(null)

  const providerLogoFormik = useFormik({
    initialValues: {
      upload_logo: []
    },
    validationSchema: uploadLogoModel,
    onSubmit: body => {
      setUploadLogo(body)
      setShowUploadModal(false)
    }
  })
  const { handleSubmit: logoHandleSubmit } = providerLogoFormik

  const createProviderFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      provider_key: "",
      name: "",
      description: "",
      registration_number: "",
      website: "",
      primary_contact_email: "",
      risk_email: "",
      underwriting_email: "",
      onboarding_email: "",
      agency_codes_email: "",
      additional_contact_details: [],
      ...initialValues
    },
    validationSchema,
    onSubmit: body => onSubmit(body, uploadLogo)
  })

  const { handleSubmit } = createProviderFormik
  const formik = { ...createProviderFormik, validationSchema }

  const files = get(providerLogoFormik, "values.upload_logo", [])

  useEffect(() => {
    if (files.length === 0) {
      return
    }
    const [file] = files
    const reader = new FileReader()
    reader.onload = ({ target }) => (uploadImgRef.current.src = target.result)
    reader.readAsDataURL(file)
  }, [files])

  return (
    <FormikProvider value={formik}>
      <FormWrapper>
        <InputsWrapper>
          <SectionWrapper data-testid="provider-details-section">
            {!isEmpty(files) && (
              <>
                <UploadImage alt="Provider logo" ref={uploadImgRef} />
                <Button
                  leadingIcon="delete"
                  appearance="error"
                  margin="0 0 2rem"
                  onClick={providerLogoFormik.resetForm}
                />
              </>
            )}
            <UploadWrapper>
              <Button
                name="upload-provider-logo"
                type="inline-button"
                appearance="primaryInline"
                leadingIcon="drawing"
                onClick={() => setShowUploadModal(true)}
              >
                Upload logo
              </Button>
              {!isEmpty(files) && <FileList files={files} />}
            </UploadWrapper>
            {showUploadModal && (
              <UploadModal
                title="Upload logo"
                name="upload_logo"
                formik={providerLogoFormik}
                onConfirm={logoHandleSubmit}
                onClose={() => {
                  setShowUploadModal(false)
                  providerLogoFormik.resetForm()
                }}
                accept="image/jpeg,image/png"
              />
            )}
          </SectionWrapper>
          <SectionWrapper data-testid="provider-details-section">
            <ProviderCompanyDetails formik={formik} isCreate />
          </SectionWrapper>
          <SectionWrapper data-testid="provider-emails-section" noBorder>
            <ProviderDepartmentEmails formik={formik} />
          </SectionWrapper>
          <SectionWrapper data-testid="provider-custom-section" noBorder>
            <ProviderCustomFields formik={formik} />
          </SectionWrapper>
          <ButtonsWrapper>
            <Button
              appearance="success"
              trailingIcon="check"
              onClick={handleSubmit}
              margin="0 0 2rem"
              isLoading={isLoading}
              name="add_provider"
            >
              Add provider
            </Button>
            <Button appearance="error" trailingIcon="cancel" name="cancel" onClick={onCancel}>
              Cancel
            </Button>
          </ButtonsWrapper>
        </InputsWrapper>
      </FormWrapper>
    </FormikProvider>
  )
}

ProviderCreate.defaultProps = {
  onSubmit: nullFunc,
  isLoading: false,
  onCancel: nullFunc,
  initialValues: {}
}

ProviderCreate.propTypes = {
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
  onCancel: PropTypes.func,
  initialValues: PropTypes.object
}

export default ProviderCreate
