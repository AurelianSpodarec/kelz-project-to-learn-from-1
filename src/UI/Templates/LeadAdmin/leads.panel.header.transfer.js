import React from "react"
import PropTypes from "prop-types"
import { useFormik } from "formik"
import { Button, Modal } from "@4cplatform/elements/Molecules"

// Helpers
import { LeadsContext } from "./leads.context"
import { Typeahead } from "../../Forms"
import { getName } from "../../Helpers"
import { editTransferModel as validationSchema } from "./leads.helpers"

// Components
import { ButtonsWrapper } from "./leads.styles"

const TransferLead = ({ users }) => {
  const {
    transferOpen,
    setTransferOpen,
    transferLoading,
    onTransferLead,
    userVal,
    setUserVal,
    suggestionsLoading
  } = React.useContext(LeadsContext)

  // Formik instance
  const formik = useFormik({
    initialValues: {
      user_id: null
    },
    validationSchema,
    onSubmit: body => onTransferLead(body)
  })

  const { handleSubmit } = formik

  return (
    <>
      <Button
        appearance="warning"
        trailingIcon="share-variant-outline"
        onClick={() => setTransferOpen(true)}
        name="transfer_lead"
      >
        Transfer Ownership
      </Button>
      {transferOpen && (
        <Modal onClose={() => setTransferOpen(false)} title="Transfer a Lead" overflow="visible">
          <Typeahead
            formik={formik}
            name="user_id"
            label="Choose a new owner"
            onSelect={user => {
              setUserVal(user.label)
              formik.setFieldValue("user_id", user.id)
            }}
            onChange={val => setUserVal(val)}
            suggestions={users.map(user => {
              const { id } = user
              const name = getName({ data: user })

              return { id, label: name }
            })}
            hasCancel={!!userVal}
            isLoading={suggestionsLoading}
          />
          <ButtonsWrapper>
            <Button
              appearance="success"
              name="transfer_confirm"
              trailingIcon="share-variant-outline"
              onClick={handleSubmit}
              isLoading={transferLoading}
            >
              Transfer
            </Button>
            <Button
              appearance="errorGhost"
              name="cancel"
              trailingIcon="cancel"
              onClick={() => setTransferOpen(false)}
            >
              Cancel
            </Button>
          </ButtonsWrapper>
        </Modal>
      )}
    </>
  )
}

TransferLead.defaultProps = {
  users: []
}

TransferLead.propTypes = {
  users: PropTypes.array
}

export default TransferLead
