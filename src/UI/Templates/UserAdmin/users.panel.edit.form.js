import React, { useContext } from "react"
import PropTypes from "prop-types"
import { Input, Select } from "@4cplatform/elements/Forms"
import { get } from "lodash"
import { Button } from "@4cplatform/elements/Molecules"
import { ConfigContext } from "@4cplatform/elements/Config"
import { useFormik } from "formik"

// Helpers
import { renderTitleOptions } from "@4cplatform/elements/Helpers"
import { editUserModel as validationSchema } from "./users.helpers"
import { UsersContext } from "./users.context"

// Components
import { EditUserFormWrapper, NameWrapper, NamesWrapper, FieldWrapper } from "./users.styles"

const Form = ({ selectedUser }) => {
  const { onEditUserSubmit, editLoading } = useContext(UsersContext)
  const { LOADING_TITLES, GLOBAL_TITLES } = useContext(ConfigContext)
  const isDeleted = !!get(selectedUser, "deleted_at")

  // Define fields for Edit User form
  const editUserFormik = useFormik({
    initialValues: {
      title: get(selectedUser, "title.key", ""),
      first_name: get(selectedUser, "first_name", ""),
      middle_names: get(selectedUser, "middle_names", ""),
      last_name: get(selectedUser, "last_name", ""),
      email: get(selectedUser, "email", "")
    },
    validationSchema,
    onSubmit: body => onEditUserSubmit({ body })
  })

  const { handleSubmit } = editUserFormik
  const formik = { ...editUserFormik, validationSchema }

  return (
    <EditUserFormWrapper data-testid="users-edit_user">
      <FieldWrapper>
        <Select name="title" label="Title" formik={formik} isDisabled={isDeleted || LOADING_TITLES}>
          {LOADING_TITLES ? (
            <option value="">Loading titles</option>
          ) : (
            <option value="">Select title</option>
          )}
          {renderTitleOptions(GLOBAL_TITLES?.data, formik)}
        </Select>
      </FieldWrapper>
      <NamesWrapper>
        <NameWrapper>
          <Input
            label="First Name"
            name="first_name"
            formik={formik}
            isDisabled={isDeleted}
            width="20.7rem"
          />
        </NameWrapper>
        <NameWrapper margin="0 0 0 0.5rem">
          <Input
            label="Middle Names"
            name="middle_names"
            formik={formik}
            isDisabled={isDeleted}
            width="20.7rem"
          />
        </NameWrapper>
        <NameWrapper margin="0 0 0 0.5rem">
          <Input
            label="Last Name"
            name="last_name"
            formik={formik}
            isDisabled={isDeleted}
            width="20.7rem"
          />
        </NameWrapper>
      </NamesWrapper>
      <FieldWrapper>
        <Input
          type="email"
          label="Email"
          name="email"
          formik={formik}
          isDisabled={isDeleted}
          width="20.7rem"
        />
      </FieldWrapper>
      {/* Submit button */}
      <Button
        appearance="success"
        trailingIcon="check"
        onClick={handleSubmit}
        data-testid="users-edit-submit"
        isLoading={editLoading}
        isDisabled={isDeleted}
        name="save"
      >
        Save
      </Button>
    </EditUserFormWrapper>
  )
}

Form.defaultProps = {
  selectedUser: null
}

Form.propTypes = {
  selectedUser: PropTypes.object
}

export default Form
