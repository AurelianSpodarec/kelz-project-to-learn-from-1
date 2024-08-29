import React from "react"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"
import { useFormik } from "formik"
import { Button, Modal } from "@4cplatform/elements/Molecules"

// Helpers
import { NetworkDocumentsContext } from "./networkDocuments.context"
import { addOrgsModel as validationSchema } from "./networkDocuments.helpers"

// Components
import {
  AddOrganisationButtonsWrapper,
  AddOrganisationModalWrapper
} from "./networkDocuments.styles"
import AddOrgsForm from "./networkDocuments.addOrgs.form"
import List from "./networkDocuments.addOrgs.list"

const AddOrganisations = ({ isDisabled, onConfirm }) => {
  const { setOrgVal, orgVal, organisations } = React.useContext(NetworkDocumentsContext)
  const [isOpen, setOpen] = React.useState(false)
  const [list, setList] = React.useState([])

  // Formik instance
  const addOrgsFormik = useFormik({
    initialValues: {
      organisation_id: null
    },
    validationSchema,
    onSubmit: (item, { resetForm }) => {
      // Only add to list if it's not already there
      const isPresent = list.findIndex(org => org.organisation_id === item.organisation_id) !== -1
      if (!isPresent) {
        setList([...list, { ...item, label: orgVal }])
      }

      setOrgVal("")
      resetForm("")
    }
  })

  const { handleSubmit, handleReset } = addOrgsFormik
  const formik = { ...addOrgsFormik, validationSchema }

  return (
    <>
      <Button
        type="inline-button"
        appearance="whiteInline"
        leadingIcon="plus-circle-outline"
        hasIconFill={false}
        onClick={() => setOpen(true)}
        isDisabled={isDisabled}
      >
        Add organisations
      </Button>
      {isOpen && (
        <Modal
          title="Add organisations"
          onClose={() => setOpen(false)}
          name="add_organisations"
          hasPadding={false}
        >
          <AddOrganisationModalWrapper>
            <List list={list} setList={setList} />
            <AddOrgsForm
              formik={formik}
              handleSubmit={handleSubmit}
              organisations={organisations}
            />
            <AddOrganisationButtonsWrapper>
              <Button
                appearance="success"
                leadingIcon="check"
                onClick={() => {
                  onConfirm(list)
                  handleReset()
                  setList([])
                  setOpen(false)
                }}
                isDisabled={isEmpty(list)}
              >
                Confirm
              </Button>
              <Button appearance="errorGhost" leadingIcon="close" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </AddOrganisationButtonsWrapper>
          </AddOrganisationModalWrapper>
        </Modal>
      )}
    </>
  )
}

AddOrganisations.propTypes = {
  isDisabled: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired
}

export default AddOrganisations
