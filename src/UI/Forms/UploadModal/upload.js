import React from "react"
import PropTypes from "prop-types"
import { get, isEmpty } from "lodash"
import { Button, Modal } from "@4cplatform/elements/Molecules"
import { FileSelect } from "@4cplatform/elements/Forms"
import { H3 } from "@4cplatform/elements/Typography"
import { nullFunc } from "@4cplatform/elements/Helpers"

// Components
import FileList from "../../Molecules/FileList"
import { ButtonsWrapper, ListWrapper, SelectWrapper } from "./upload.styles"

const UploadModal = ({
  title,
  onClose,
  name,
  formik,
  onConfirm,
  confirmText,
  confirmAppearance,
  confirmIcon,
  cancelText,
  cancelAppearance,
  cancelIcon,
  isLoading,
  filesHeader,
  canAllowMultiple,
  accept,
  onCancel
}) => {
  const files = get(formik, `values[${name}]`, [])

  return (
    <Modal title={title} onClose={() => onClose()} name={`${name}_upload_modal`} hasPadding={false}>
      {/* FileSelect */}
      <SelectWrapper>
        <FileSelect
          name={name}
          formik={formik}
          margin="0"
          isLoading={isLoading}
          accept={accept}
          canAllowMultiple={canAllowMultiple}
        />
      </SelectWrapper>
      {/* FileList */}
      <ListWrapper>
        <H3 margin="0 0 2rem">{filesHeader}</H3>
        <FileList files={files} />
      </ListWrapper>
      {/* Actions */}
      <ButtonsWrapper>
        <Button
          appearance={confirmAppearance}
          onClick={onConfirm}
          isLoading={isLoading}
          trailingIcon={confirmIcon}
          name={`${name}_confirm`}
          isDisabled={isLoading || isEmpty(files)}
        >
          {confirmText}
        </Button>
        <Button
          appearance={cancelAppearance}
          trailingIcon={cancelIcon}
          onClick={() => {
            // If an onCancel function is passed, run it. Otherwise, run onClose.
            if (onCancel) {
              onCancel()
            } else {
              onClose()
            }
          }}
          name={`${name}_cancel`}
        >
          {cancelText}
        </Button>
      </ButtonsWrapper>
    </Modal>
  )
}

UploadModal.defaultProps = {
  title: "Upload file",
  canAllowMultiple: false,
  confirmText: "Upload",
  confirmIcon: "check",
  confirmAppearance: "success",
  cancelText: "Cancel",
  cancelIcon: "close",
  cancelAppearance: "error",
  onConfirm: nullFunc,
  isLoading: false,
  filesHeader: "Selected file",
  accept: "",
  onCancel: null
}

UploadModal.propTypes = {
  /**
   * Title attached to the modal's header.
   */
  title: PropTypes.string,
  /**
   * Name prop. Required, used by formik.
   */
  name: PropTypes.string.isRequired,
  /**
   * Formik instance
   */
  formik: PropTypes.object.isRequired,
  /**
   * Function which fires when the modal is closed
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Appearance of the confirm button
   */
  confirmAppearance: PropTypes.string,
  /**
   * Icon attached to the confirm button
   */
  confirmIcon: PropTypes.string,
  /**
   * Text of the confirm button
   */
  confirmText: PropTypes.string,
  /**
   * Appearance of the cancel button
   */
  cancelAppearance: PropTypes.string,
  /**
   * Appearance of the cancel icon
   */
  cancelIcon: PropTypes.string,
  /**
   * The icon attached to the cancel button
   */
  cancelText: PropTypes.string,
  /**
   * The function which fires when the confirm button is clicked
   */
  onConfirm: PropTypes.func,
  /**
   * Loading prop passed to the confirm button
   */
  isLoading: PropTypes.bool,
  /**
   * The header content of the FilesList in this component
   */
  filesHeader: PropTypes.string,
  /**
   * The accept prop passed directly to the FileSelect
   */
  accept: PropTypes.string,
  /**
   * Whether or not multiple files can be uploaded
   */
  canAllowMultiple: PropTypes.bool,
  /**
   * The function which fires when the cancel button is clicked
   */
  onCancel: PropTypes.func
}

export default UploadModal
