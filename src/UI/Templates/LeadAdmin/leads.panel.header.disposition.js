import React from "react"
import { get } from "lodash"
import { useFormik } from "formik"
import { Select, TextArea } from "@4cplatform/elements/Forms"
import { Button, Modal } from "@4cplatform/elements/Molecules"

// Helpers
import { LeadsContext } from "./leads.context"
import { dispositionModel as validationSchema } from "./leads.helpers"

// Components
import { ButtonsWrapper } from "./leads.styles"

const Disposition = () => {
  const {
    selectedLead,
    dispositionModal,
    setDispositionModal,
    onSubmitDisposition,
    selectLoading,
    updateDispositionLoading,
    config
  } = React.useContext(LeadsContext)
  const dispositions = get(config, "disposition", {})

  const dispositionFormik = useFormik({
    initialValues: {
      disposition: get(selectedLead, "disposition.disposition", ""),
      note: get(selectedLead, "disposition.note", "")
    },
    validationSchema,
    onSubmit: body => onSubmitDisposition(body)
  })

  const formik = { ...dispositionFormik, validationSchema }
  const { handleSubmit } = formik

  return (
    <>
      <Button
        appearance="whiteGhost"
        margin="0"
        trailingIcon="chevron-right"
        isDisabled={selectLoading}
        name="disposition"
        onClick={() => setDispositionModal(true)}
      >
        Disposition
      </Button>
      {/* Disposition Modal */}
      {dispositionModal && (
        <Modal
          title="Disposition Lead"
          onClose={() => setDispositionModal(false)}
          name="disposition"
        >
          <Select name="disposition" formik={formik} label="Change disposition" margin="0 0 2rem">
            <option value="">Select Disposition</option>
            {/* Build options from config */}
            {Object.keys(dispositions).map(key => (
              <option key={key} value={key}>
                {dispositions[key]}
              </option>
            ))}
          </Select>
          <TextArea name="note" formik={formik} label="Write your notes" margin="0 0 2rem" />
          <ButtonsWrapper>
            <Button
              trailingIcon="chevron-right"
              onClick={handleSubmit}
              isLoading={updateDispositionLoading}
            >
              Submit
            </Button>
            <Button
              appearance="error"
              trailingIcon="cancel"
              onClick={() => setDispositionModal(false)}
            >
              Cancel
            </Button>
          </ButtonsWrapper>
        </Modal>
      )}
    </>
  )
}

export default Disposition
