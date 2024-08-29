import React from "react"
import PropTypes from "prop-types"
import { Button, Modal } from "@4cplatform/elements/Molecules"

// Components
import { ButtonsWrapper } from "./confirmationModal.styles"

const ConfirmationModal = ({
  name,
  confirmAppearance,
  leadingIcon,
  confirmIcon,
  hasTrailingIcon,
  confirmText,
  isConfirmDisabled,
  cancelAppearance,
  cancelIcon,
  cancelText,
  isLoadingConfirm,
  isLoadingCancel,
  title,
  onConfirm,
  onCancel,
  onClose,
  children
}) => {
  const trailingIcon = !confirmIcon ? "check" : confirmIcon

  return (
    <Modal
      title={title}
      onClose={() => onClose()}
      name={name ? `${name}_confirmation_modal` : "confirmation_modal"}
    >
      {children}
      <ButtonsWrapper data-testid="confirmation_modal-buttons">
        <Button
          onClick={onConfirm}
          isLoading={isLoadingConfirm}
          appearance={confirmAppearance}
          leadingIcon={leadingIcon}
          trailingIcon={!hasTrailingIcon ? null : trailingIcon}
          name={name ? `${name}_confirmation_modal_confirm` : "confirmation_modal_confirm"}
          isDisabled={isConfirmDisabled}
        >
          {confirmText}
        </Button>
        <Button
          onClick={() => {
            // If an onCancel function is passed, run it. Otherwise, run onClose.
            if (onCancel) {
              onCancel()
            } else {
              onClose()
            }
          }}
          isLoading={isLoadingCancel}
          appearance={cancelAppearance}
          trailingIcon={!cancelIcon ? "cancel" : cancelIcon}
          name={name ? `${name}_confirmation_modal_cancel` : "confirmation_modal_cancel"}
        >
          {cancelText}
        </Button>
      </ButtonsWrapper>
    </Modal>
  )
}

ConfirmationModal.defaultProps = {
  name: "",
  title: "Are you sure?",
  confirmText: "Confirm",
  leadingIcon: null,
  confirmIcon: null,
  confirmAppearance: "primary",
  cancelText: "Cancel",
  cancelIcon: null,
  cancelAppearance: "error",
  isLoadingConfirm: false,
  isLoadingCancel: false,
  isConfirmDisabled: false,
  hasTrailingIcon: true,
  children: null,
  onClose: () => null,
  onCancel: null
}

ConfirmationModal.propTypes = {
  name: PropTypes.string,
  confirmAppearance: PropTypes.string,
  leadingIcon: PropTypes.string,
  confirmIcon: PropTypes.string,
  confirmText: PropTypes.string,
  isConfirmDisabled: PropTypes.bool,
  hasTrailingIcon: PropTypes.bool,
  cancelAppearance: PropTypes.string,
  cancelIcon: PropTypes.string,
  cancelText: PropTypes.string,
  isLoadingConfirm: PropTypes.bool,
  isLoadingCancel: PropTypes.bool,
  title: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.any
}

export default ConfirmationModal
