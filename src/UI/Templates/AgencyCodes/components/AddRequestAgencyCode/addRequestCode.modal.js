import React, { useState, useContext } from "react"
import { upperFirst } from "lodash"
import { Modal, Button } from "@4cplatform/elements/Molecules"
import { Toggle } from "@4cplatform/elements/Forms"
import { P } from "@4cplatform/elements/Typography"

// Helpers
import { AgencyCodesContext } from "../../agencyCodes.context"

// Components
import { ButtonsWrapper } from "./addRequestCode.styles"
import AddRequestForm from "./addRequestCode.modal.form"

const AddRequestModal = () => {
  const { setAddRequestModal } = useContext(AgencyCodesContext)

  const initialState = { toggle: null, display: null }
  const [{ toggle, display }, setState] = useState(initialState)

  return (
    <Modal
      title={!display ? "Add / Request code" : `${upperFirst(display)} code`}
      onClose={() => setAddRequestModal(false)}
      name="add_request_agency_code"
    >
      {!display && (
        <>
          <Toggle
            name="display"
            label="I want to"
            options={[
              { order: 1, label: "Add", value: "add" },
              { order: 2, label: "Request", value: "request" }
            ]}
            value={toggle}
            onChange={value => {
              setState({ display, toggle: value })
            }}
          />
          <P>an agency code</P>
          <ButtonsWrapper>
            <Button
              appearance="success"
              name="continue"
              trailingIcon="chevron-right"
              onClick={() => setState({ display: toggle, toggle })}
              isDisabled={!toggle}
            >
              Continue
            </Button>
            <Button
              appearance="error"
              name="cancel"
              onClick={() => setAddRequestModal(false)}
              trailingIcon="cancel"
            >
              Cancel
            </Button>
          </ButtonsWrapper>
        </>
      )}
      {display && <AddRequestForm type={display} resetState={() => setState(initialState)} />}
    </Modal>
  )
}

export default AddRequestModal
