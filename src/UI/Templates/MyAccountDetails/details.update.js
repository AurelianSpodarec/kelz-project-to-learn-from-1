import React from "react"
import PropTypes from "prop-types"
import { useFormik } from "formik"
import { get } from "lodash"
import { Input } from "@4cplatform/elements/Forms"

// Components
import { ConfirmationModal } from "../../Molecules"

// Helpers
import { MyAccountDetailsContext } from "./details.context"
import { EditDetailsModel as validationSchema } from "./details.helpers"

const MyAccountUpdateDetails = ({ onClose }) => {
  const { user, onUpdateDetailsSubmit, updateLoading } = React.useContext(MyAccountDetailsContext)
  const editUserFormik = useFormik({
    initialValues: {
      first_name: get(user, "first_name", ""),
      middle_names: get(user, "middle_names", ""),
      last_name: get(user, "last_name", ""),
      email: get(user, "email", "")
    },
    validationSchema,
    onSubmit: body => onUpdateDetailsSubmit({ body })
  })
  const { handleSubmit } = editUserFormik
  const formik = { ...editUserFormik, validationSchema }
  return (
    <ConfirmationModal
      title="Update Account Details"
      width="70rem"
      confirmAppearance="success"
      isLoadingConfirm={updateLoading}
      confirmText="OK"
      onConfirm={handleSubmit}
      onClose={onClose}
    >
      <Input label="First Name" formik={formik} name="first_name" margin="0 0 2rem" />
      <Input label="Middle Names" formik={formik} name="middle_names" margin="0 0 2rem" />
      <Input label="Last Name" formik={formik} name="last_name" margin="0 0 2rem" />
      <Input label="Email" formik={formik} name="email" margin="0 0 2rem" />
    </ConfirmationModal>
  )
}

MyAccountUpdateDetails.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default MyAccountUpdateDetails
