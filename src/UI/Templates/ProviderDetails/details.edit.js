import React, { useContext, useEffect, useState } from "react"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"
import { P } from "@4cplatform/elements/Typography"
import { AuthWrapper } from "@4cplatform/elements/Auth"
import { useFormik } from "formik"

// Helpers
import { ProviderManageContext } from "../../../pages/ProviderManage/context/manage.context"
import { ProviderDetailsContext } from "./details.context"
import ProviderCompanyDetails from "./details.companyDetails"
import ProviderDepartmentEmails from "../ProviderCreate/providerCreate.departmentEmails"
import ProviderCustomFields from "../ProviderCreate/providerCreate.customFields"
import { editDetailsModel as validationSchema } from "./details.helpers"

// Components
import { ConfirmationModal } from "../../Molecules"
import {
  ButtonsWrapper,
  InputsWrapper,
  SectionWrapper
} from "../ProviderCreate/providerCreate.styles"

const EditDetails = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isExitModalOpen, setIsExitModalOpen] = useState(false)
  const { hasUnsavedProviderDetails, setHasUnsavedProviderDetails } =
    useContext(ProviderManageContext)
  const { data, onEditDetailsSubmit, editLoading, onProviderDelete, deleteLoading, setEdit } =
    useContext(ProviderDetailsContext)

  const editDetailsFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      provider_key: get(data, "provider_key", ""),
      name: get(data, "name", ""),
      description: get(data, "description", ""),
      registration_number: get(data, "registration_number", ""),
      website: get(data, "website", ""),
      primary_contact_email: get(data, "primary_contact_email", ""),
      risk_email: get(data, "risk_email", ""),
      underwriting_email: get(data, "underwriting_email", ""),
      onboarding_email: get(data, "onboarding_email", ""),
      agency_codes_email: get(data, "agency_codes_email", ""),
      additional_contact_details: get(data, "additional_contact_details", [])
    },
    validationSchema,
    onSubmit: body => {
      onEditDetailsSubmit({ body })
    }
  })

  const { handleSubmit } = editDetailsFormik
  const formik = { ...editDetailsFormik, validationSchema }

  useEffect(() => {
    setHasUnsavedProviderDetails(formik?.dirty)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik?.values, formik?.dirty])

  return (
    <InputsWrapper>
      {/* Delete Provider button */}
      <AuthWrapper roles={["SYS_ADMIN"]}>
        <Button
          margin="0 0 5rem"
          appearance="errorInline"
          type="inline-button"
          leadingIcon="trash-can"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete provider
        </Button>
      </AuthWrapper>
      <SectionWrapper>
        <ProviderCompanyDetails formik={formik} />
      </SectionWrapper>
      <SectionWrapper noBorder>
        <ProviderDepartmentEmails formik={formik} />
      </SectionWrapper>
      <SectionWrapper noBorder>
        <ProviderCustomFields formik={formik} />
      </SectionWrapper>
      <ButtonsWrapper>
        <Button
          appearance="success"
          trailingIcon="check"
          onClick={handleSubmit}
          margin="0 0 2rem"
          isLoading={editLoading}
          name="edit_provider_details"
        >
          Save changes
        </Button>
        <Button
          appearance="error"
          trailingIcon="cancel"
          onClick={() => {
            if (hasUnsavedProviderDetails) return setIsExitModalOpen(true)
            setEdit(false)
          }}
          name="cancel"
        >
          Cancel
        </Button>
      </ButtonsWrapper>
      {/* Delete provider modal */}
      {isDeleteModalOpen && (
        <ConfirmationModal
          confirmIcon="delete"
          confirmText="Delete provider"
          confirmAppearance="error"
          cancelAppearance="errorGhost"
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            onProviderDelete()
          }}
          isLoadingConfirm={deleteLoading}
        >
          <P>Are you sure you want to delete this provider? This action cannot be undone.</P>
        </ConfirmationModal>
      )}
      {/* Exit edit action modal */}
      {isExitModalOpen && (
        <ConfirmationModal
          confirmIcon="cancel"
          confirmText="Yes"
          confirmAppearance="error"
          cancelAppearance="errorGhost"
          onClose={() => setIsExitModalOpen(false)}
          onConfirm={() => {
            setHasUnsavedProviderDetails(false)
            setEdit(false)
          }}
        >
          <P>
            You have unsaved changes. Are you sure you want to abandon changes and return to the
            provider details page?
          </P>
        </ConfirmationModal>
      )}
    </InputsWrapper>
  )
}

export default EditDetails
