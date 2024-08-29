import React, { useContext, useEffect } from "react"
import { usePrevious } from "@4cplatform/elements/Hooks"
import PropTypes from "prop-types"
import { get, isEmpty } from "lodash"

// Helpers
import { JourneyContext } from "../../journey.context"
import { renderSectionComponent } from "../../../../Helpers"

// Components
import ComponentModal from "../ComponentModal"

const SectionComponent = ({ data: componentData }) => {
  const {
    data: journeyData,
    fieldModal,
    setFieldModal,
    formik,
    postError
  } = useContext(JourneyContext)

  const isLocked = get(journeyData, "journey.locked", false)
  const hasModal = !isEmpty(get(componentData, "modal", {}))
  const isOpen = get(fieldModal, "open", false)

  const fieldKey = get(componentData, "key")
  const fieldValue = get(formik, `values.${fieldKey}`)
  const prevFieldValue = usePrevious(fieldValue)

  const modalTrigger = get(componentData, "modal.fieldValueTrigger")
  const modalContent = get(componentData, "modal.content")

  const firstUpdate = React.useRef(true)
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
    }
  })

  React.useEffect(() => {
    if (!firstUpdate.current && fieldValue && prevFieldValue !== undefined) {
      if (get(componentData, "modal.fieldValueTrigger", null) !== null)
        componentData.modal.fieldValueTrigger = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstUpdate, fieldValue])

  // If a modal trigger exists, watch for it and open the modal if the value matches
  useEffect(() => {
    if (hasModal && !isOpen && !!modalTrigger && !!modalContent && modalTrigger === fieldValue) {
      setFieldModal({ open: true, modal: { ...get(componentData, "modal"), fieldKey } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalTrigger, fieldValue])

  return (
    <>
      {renderSectionComponent(componentData, formik, isLocked, postError)}
      {isOpen && <ComponentModal />}
    </>
  )
}

SectionComponent.propTypes = {
  data: PropTypes.object.isRequired
}

export default SectionComponent
