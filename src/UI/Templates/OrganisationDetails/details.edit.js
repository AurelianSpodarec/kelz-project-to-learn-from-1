import React from "react"
import { get } from "lodash"
import { Input, TextArea, Address } from "@4cplatform/elements/Forms"
import { Button } from "@4cplatform/elements/Molecules"
import { H3, P } from "@4cplatform/elements/Typography"
import { AuthWrapper } from "@4cplatform/elements/Auth"
import { useFormik } from "formik"

// Helpers
import { OrganisationDetailsContext } from "./details.context"
import { editDetailsModel as validationSchema } from "./details.helpers"

// Components
import { ConfirmationModal } from "../../Molecules"
import { SectionWrapper, ButtonsWrapper } from "./details.styles"

const EditDetails = () => {
  const [isOpen, setOpen] = React.useState(false)
  const {
    data,
    setEdit,
    onEditDetailsSubmit,
    editLoading,
    deleteLoading,
    onDeleteOrganisation,
    apiErrors
  } = React.useContext(OrganisationDetailsContext)

  const editDetailsFormik = useFormik({
    initialValues: {
      name: get(data, "name", ""),
      description: get(data, "description", ""),
      address: get(data, "address", {
        postcode: "",
        line_one: "",
        line_two: "",
        city: "",
        county: ""
      }),
      phone_number: get(data, "phone_number", ""),
      company_registration_number: get(data, "company_registration_number", ""),
      fca_reference: get(data, "fca_reference", ""),
      website: get(data, "website", ""),
      contact_first_name: get(data, "contact_first_name", ""),
      contact_last_name: get(data, "contact_last_name", ""),
      contact_email_address: get(data, "contact_email_address", "")
    },
    validationSchema,
    onSubmit: body => onEditDetailsSubmit({ body })
  })

  const { handleSubmit } = editDetailsFormik
  const formik = { ...editDetailsFormik, validationSchema }
  const fieldProps = {
    formik,
    apiErrors
  }

  return (
    <>
      {/* Delete Organisation button */}
      <AuthWrapper roles={["SYS_ADMIN"]}>
        <Button
          margin="0 0 2rem"
          appearance="errorInline"
          type="inline-button"
          leadingIcon="delete"
          onClick={() => setOpen(true)}
        >
          Delete Organisation
        </Button>
      </AuthWrapper>

      {/* Organisation Information */}
      <SectionWrapper>
        <H3 margin="0 0 2rem">Organisation details</H3>
        <Input label="Company name" name="name" {...fieldProps} />
        <TextArea label="Description" name="description" {...fieldProps} />
        <Address label="Address" name="address" {...fieldProps} />
        <Input label="Phone number" name="phone_number" {...fieldProps} />
        <Input label="Registration number" name="company_registration_number" {...fieldProps} />
        <Input label="FCA reference" name="fca_reference" {...fieldProps} />
        <Input label="Company website" name="website" {...fieldProps} leadingText="https://" />
        <Input label="Contact first name" name="contact_first_name" {...fieldProps} />
        <Input label="Contact last name" name="contact_last_name" {...fieldProps} />
        <Input
          label="Contact email"
          name="contact_email_address"
          {...fieldProps}
          margin="0 0 4rem"
        />
      </SectionWrapper>

      {/* Buttons */}
      <ButtonsWrapper>
        <Button
          appearance="success"
          trailingIcon="check"
          onClick={handleSubmit}
          isLoading={editLoading}
          name="edit_organisation_details"
        >
          Save changes
        </Button>
        <Button
          appearance="error"
          trailingIcon="close"
          onClick={() => setEdit(false)}
          name="cancel"
        >
          Cancel
        </Button>
      </ButtonsWrapper>

      {/* Delete network modal */}
      {isOpen && (
        <ConfirmationModal
          confirmIcon="delete"
          confirmText="Delete network"
          confirmAppearance="error"
          cancelAppearance="errorGhost"
          onClose={() => setOpen(false)}
          onConfirm={() => {
            onDeleteOrganisation()
          }}
          isLoadingConfirm={deleteLoading}
        >
          <P>Are you sure you want to delete this organisation? This action cannot be undone.</P>
        </ConfirmationModal>
      )}
    </>
  )
}

export default EditDetails
