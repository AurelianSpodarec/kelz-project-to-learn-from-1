import React from "react"
import { useFormik } from "formik"
import { get, isEmpty } from "lodash"
import { Button, Modal } from "@4cplatform/elements/Molecules"
import { Select } from "@4cplatform/elements/Forms"

// Components
import { AssignButtonsWrapper } from "./assignment.styles"

// Helpers
import { assignDealCodeModel as validationSchema } from "./assignment.helpers"
import { AgencyCodesContext } from "../../agencyCodes.context"

const AssignDealCode = () => {
  const { availableDealCodes, onAssignDealCode, assignDealCodeLoading } =
    React.useContext(AgencyCodesContext)
  const [isOpen, setOpen] = React.useState(false)
  const assignDealCodeFormik = useFormik({
    initialValues: {
      deal_code_slug: ""
    },
    validationSchema,
    onSubmit: body => onAssignDealCode(body)
  })

  const { handleSubmit } = assignDealCodeFormik
  const formik = { ...assignDealCodeFormik, validationSchema }

  return (
    <>
      <Button
        appearance="whiteGhost"
        onClick={() => setOpen(true)}
        name="assign"
        margin="2rem 0 0 0"
        trailingIcon="plus"
      >
        Assign new deal code
      </Button>
      {isOpen && (
        <Modal title="Assign Deal Code" onClose={() => setOpen(false)} name="assign_modal">
          <Select
            label="Deal Code"
            name="deal_code_slug"
            formik={formik}
            margin="0 0 2rem"
            isDisabled={isEmpty(availableDealCodes)}
          >
            <option value="">
              {isEmpty(availableDealCodes) ? "No deal codes available" : "Select deal code"}
            </option>
            {Array.isArray(availableDealCodes) &&
              availableDealCodes.map(code => (
                <option value={get(code, "slug")} key={get(code, "id")}>
                  {get(code, "name", "-")}
                </option>
              ))}
          </Select>
          <AssignButtonsWrapper>
            <Button
              appearance="success"
              onClick={handleSubmit}
              name="assign"
              leadingIcon="check"
              isLoading={assignDealCodeLoading}
              isDisabled={
                !Array.isArray(availableDealCodes) ||
                isEmpty(availableDealCodes) ||
                !get(formik, "values.deal_code_slug")
              }
            >
              Assign
            </Button>
            <Button appearance="errorGhost" onClick={() => setOpen(false)} leadingIcon="close">
              Cancel
            </Button>
          </AssignButtonsWrapper>
        </Modal>
      )}
    </>
  )
}

export default AssignDealCode
