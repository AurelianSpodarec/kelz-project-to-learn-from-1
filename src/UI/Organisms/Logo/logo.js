/* eslint-disable react/boolean-prop-naming */
import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { H4 } from "@4cplatform/elements/Typography"
import { Button } from "@4cplatform/elements/Molecules"
import { nullFunc, sanitize } from "@4cplatform/elements/Helpers"
import { useFormik } from "formik"

// Components
import { ConfirmationModal } from "../../Molecules"
import { UploadModal } from "../../Forms"
import { LogoWrapper, LogoImage } from "./logo.styles"

// Helpers
import { uploadLogoModel as validationSchema } from "./logo.helpers"

const Logo = ({
  isEdit,
  title,
  onSubmit: manualOnSubmit,
  onDelete,
  updateLoading,
  deleteLoading,
  path,
  margin,
  isUpdate,
  isDelete,
  setUpdate,
  setDelete
}) => {
  // Logo Upload formik
  const uploadLogoFormik = useFormik({
    initialValues: {
      update_logo: []
    },
    validationSchema,
    onSubmit: body => manualOnSubmit(body)
  })

  const { handleSubmit } = uploadLogoFormik
  const formik = { ...uploadLogoFormik, validationSchema }
  const formikRef = useRef(formik)

  useEffect(() => {
    if (isUpdate === false) formikRef.current.resetForm()
  }, [isUpdate])

  // Do not show this component if there is no logo and it's not in an edit state
  if (!path && !isEdit) return null

  return (
    <LogoWrapper margin={margin}>
      <H4>{title}</H4>
      {!!path && <LogoImage src={sanitize(path)} isEdit={isEdit} data-testid="update_logo-image" />}
      {isEdit && (
        <>
          <Button
            onClick={() => setUpdate(true)}
            name="update_logo"
            type="inline-button"
            appearance="primaryInline"
            leadingIcon="drawing"
            iconSize="1.5rem"
          >
            {!path ? "Update logo" : "Change logo"}
          </Button>
          {!!path && (
            <Button
              onClick={() => setDelete(true)}
              name="delete_logo"
              type="inline-button"
              appearance="errorInline"
              leadingIcon="delete"
              iconSize="1.5rem"
            >
              Delete logo
            </Button>
          )}

          {/* Update Logo */}
          {isUpdate && (
            <UploadModal
              title={!path ? "Upload logo" : "Update logo"}
              name="update_logo"
              formik={formik}
              onConfirm={handleSubmit}
              onClose={() => {
                setUpdate(false)
                formik.resetForm()
              }}
              accept="image/jpeg,image/png"
              isLoading={updateLoading}
            />
          )}

          {/* Delete logo */}
          {isDelete && (
            <ConfirmationModal
              confirmIcon="delete"
              confirmText="Delete Logo"
              confirmAppearance="error"
              cancelAppearance="errorGhost"
              onClose={() => setDelete(false)}
              onConfirm={() => onDelete()}
              isLoadingConfirm={deleteLoading}
            />
          )}
        </>
      )}
    </LogoWrapper>
  )
}

Logo.defaultProps = {
  isEdit: false,
  title: "Logo",
  onSubmit: nullFunc,
  onDelete: nullFunc,
  updateLoading: false,
  deleteLoading: false,
  path: null,
  margin: "0 0 2rem",
  isUpdate: false,
  isDelete: false,
  setUpdate: nullFunc,
  setDelete: nullFunc
}

Logo.propTypes = {
  /**
   * Whether or not this component is displayed in the Edit state
   */
  isEdit: PropTypes.bool,
  /**
   * The title content of the H4
   */
  title: PropTypes.string,
  /**
   * The submit function for uploading/updating a logo
   */
  onSubmit: PropTypes.func,
  /**
   * The delete function for removing a logo
   */
  onDelete: PropTypes.func,
  /**
   * Loading prop for updating/adding
   */
  updateLoading: PropTypes.bool,
  /**
   * Loading prop for deleting
   */
  deleteLoading: PropTypes.bool,
  /**
   * The image path to the logo - if falsy, no logo is considered to be present
   */
  path: PropTypes.string,
  /**
   * Margin prop for the outer wrapper
   */
  margin: PropTypes.string,
  /**
   * Boolean controlling the visibility of the Update/Add UploadModal
   */
  isUpdate: PropTypes.bool,
  /**
   * Boolean controlling the visibility of the Delete ConfirmationModal
   */
  isDelete: PropTypes.bool,
  /**
   * Function to change the visibility of the Update/Add UploadModal
   */
  setUpdate: PropTypes.func,
  /**
   * Function to change the visibility of the Delete ConfirmationModal
   */
  setDelete: PropTypes.func
}

export default Logo
