/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import { get, isEmpty } from "lodash"
import { Modal, RenderHTML, Button } from "@4cplatform/elements/Molecules"

// Helpers
import { JourneyContext } from "../../journey.context"

// Components
import { ButtonsWrapper } from "./modal.styles"

const SubmitModal = () => {
  const { data, formik, onPageSubmit, hasSubmitModal, setSubmitModal } =
    React.useContext(JourneyContext)

  // Filter the list of modals to see which should be displayed
  const modals = get(data, "page.modals.submit", [])
  const values = get(formik, "values", {})
  const filteredModals = modals.filter(
    ({ fieldKey, fieldValueTrigger }) => fieldValueTrigger === get(values, fieldKey)
  )
  // If prompted to open the submit modal and no modals should be displayed, run default page submission function
  React.useEffect(() => {
    if (hasSubmitModal && isEmpty(filteredModals)) {
      setSubmitModal(false)
      onPageSubmit()
    }
  }, [hasSubmitModal])

  // Don't render modal content if there are no trigger matches
  if (isEmpty(filteredModals)) return null

  let modal = { title: "", content: "" }

  // If there's only one modal, set the modal with a title
  if (filteredModals.length === 1) {
    modal = { title: filteredModals[0].title, content: filteredModals[0].content }
  }

  // If there is more than one valid modal, render it all as modal content
  if (filteredModals.length > 1) {
    modal = filteredModals.reduce(
      (acc, val) => {
        const { title, content } = val
        return { title: "", content: `${acc.content}<h3>${title}</h3>${content}` }
      },
      { title: "", content: "" }
    )
  }

  return (
    <Modal
      onClose={() => setSubmitModal(false)}
      name="submit_modal"
      title={modal.title}
      hasHeader={!!modal.title}
    >
      <RenderHTML content={modal.content} />
      <ButtonsWrapper>
        <Button
          trailingIcon="check"
          appearance="success"
          name="modal_save"
          onClick={() => {
            onPageSubmit()
            setSubmitModal(false)
          }}
        >
          Save and continue
        </Button>
        <Button
          trailingIcon="close"
          appearance="errorGhost"
          name="modal_cancel"
          onClick={() => setSubmitModal(false)}
        >
          Cancel
        </Button>
      </ButtonsWrapper>
    </Modal>
  )
}

export default SubmitModal
