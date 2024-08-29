import React, { useContext } from "react"
import { get } from "lodash"
import { Modal, RenderHTML } from "@4cplatform/elements/Molecules"

// Helpers
import { JourneyContext } from "../../journey.context"

// Components
import { ConfirmationModal } from "../../../../Molecules"

const ComponentModal = () => {
  const { formik, fieldModal, setFieldModal } = useContext(JourneyContext)

  const fieldKey = get(fieldModal, "modal.fieldKey")
  const isConfirmation = get(fieldModal, "modal.confirmation", false)
  const Wrapper = isConfirmation ? ConfirmationModal : Modal
  const confirmationProps = isConfirmation
    ? {
        onConfirm: () => {
          setFieldModal({ open: false, modal: null })
        }
      }
    : {}

  const handleCancel = () => {
    formik.setFieldValue(fieldKey, !get(formik.values, fieldKey))
    setFieldModal({ open: false, modal: null })
  }

  return (
    <Wrapper
      name={fieldKey}
      title={get(fieldModal, "modal.title", "")}
      onCancel={handleCancel}
      onClose={() =>
        isConfirmation ? handleCancel() : setFieldModal({ open: false, modal: null })
      }
      {...confirmationProps}
    >
      <RenderHTML content={get(fieldModal, "modal.content")} />
    </Wrapper>
  )
}

export default ComponentModal
