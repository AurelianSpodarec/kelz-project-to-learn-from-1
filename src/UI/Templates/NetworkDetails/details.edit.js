import React, { useState, useContext, useEffect } from "react"
import { get } from "lodash"
import { Input, TextArea, Address } from "@4cplatform/elements/Forms"
import { Button } from "@4cplatform/elements/Molecules"
import { H3, P } from "@4cplatform/elements/Typography"
import { AuthWrapper } from "@4cplatform/elements/Auth"
import { useFormik } from "formik"

// Helpers
import { NetworkDetailsContext } from "./details.context"
import { editDetailsModel as validationSchema } from "./details.helpers"

// Components
import { ConfirmationModal } from "../../Molecules"
import { SectionWrapper, ButtonsWrapper } from "./details.styles"
import { NetworkManageContext } from "../../../pages/NetworkManage/context/manage.context"

const EditDetails = () => {
  const { hasUnsavedNetworkDetails, setHasUnsavedNetworkDetails } = useContext(NetworkManageContext)
  const { data, setEdit, onEditDetailsSubmit, editLoading, onDeleteNetwork, deleteLoading } =
    useContext(NetworkDetailsContext)
  const [isExitModalOpen, setIsExitModalOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const initialValues = {
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
    contact_first_name: get(data, "contact_first_name", ""),
    contact_last_name: get(data, "contact_last_name", ""),
    contact_email_address: get(data, "contact_email_address", "")
  }

  const editDetailsFormik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: body => onEditDetailsSubmit({ body })
  })

  const { handleSubmit } = editDetailsFormik
  const formik = { ...editDetailsFormik, validationSchema }

  useEffect(() => {
    setHasUnsavedNetworkDetails(formik?.dirty)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik?.dirty])

  return (
    <>
      {/* Delete Network button */}
      <AuthWrapper roles={["SYS_ADMIN"]}>
        <Button
          margin="0 0 2rem"
          appearance="errorInline"
          type="inline-button"
          leadingIcon="delete"
          isDisabled={!data.is_deletable}
          onClick={() => setDeleteOpen(true)}
        >
          Delete Network
        </Button>
      </AuthWrapper>

      {/* Network Information */}
      <SectionWrapper>
        <H3 margin="0 0 2rem">Network details</H3>
        <Input label="Network name" name="name" formik={formik} />
        <TextArea label="Description" name="description" formik={formik} />
        <Address label="Address" name="address" formik={formik} />
        <Input label="Phone number" name="phone_number" formik={formik} />
        <Input
          label="Company registration number"
          name="company_registration_number"
          formik={formik}
        />
        <Input label="FCA reference" name="fca_reference" formik={formik} />
        <Input label="Contact first name" name="contact_first_name" formik={formik} />
        <Input label="Contact last name" name="contact_last_name" formik={formik} />
        <Input label="Contact email" name="contact_email_address" formik={formik} />
      </SectionWrapper>

      {/* Buttons */}
      <ButtonsWrapper>
        <Button
          appearance="success"
          trailingIcon="check"
          onClick={handleSubmit}
          isLoading={editLoading}
          name="edit_network_details"
        >
          Save changes
        </Button>
        <Button
          appearance="error"
          trailingIcon="close"
          onClick={() => {
            if (hasUnsavedNetworkDetails) return setIsExitModalOpen(true)
            setEdit(false)
          }}
          name="cancel"
        >
          Cancel
        </Button>
      </ButtonsWrapper>

      {/* Exit edit action modal */}
      {isExitModalOpen && (
        <ConfirmationModal
          confirmIcon="cancel"
          confirmText="Yes"
          confirmAppearance="error"
          cancelAppearance="errorGhost"
          onClose={() => setIsExitModalOpen(false)}
          onConfirm={() => {
            setHasUnsavedNetworkDetails(false)
            setEdit(false)
          }}
        >
          <P>
            You have unsaved changes. Are you sure you want to abandon changes and return to the
            provider details page?
          </P>
        </ConfirmationModal>
      )}

      {/* Delete network modal */}
      {deleteOpen && (
        <ConfirmationModal
          confirmIcon="delete"
          confirmText="Delete network"
          confirmAppearance="error"
          cancelAppearance="errorGhost"
          onClose={() => setDeleteOpen(false)}
          onConfirm={onDeleteNetwork}
          isLoadingConfirm={deleteLoading}
        >
          <P>Are you sure you want to delete this network? This action cannot be undone.</P>
        </ConfirmationModal>
      )}
    </>
  )
}

export default EditDetails
