import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { useFormik } from "formik"
import moment from "moment"
import { Button } from "@4cplatform/elements/Molecules"
import { Toggle, Checkbox, DatePicker, TextArea } from "@4cplatform/elements/Forms"
import { H4 } from "@4cplatform/elements/Typography"

// Helpers
import { DealCodesContext } from "./deals.context"
import { editDealCodeModel as validationSchema } from "./deals.helpers"
import { EditFieldWrapper, EditFieldRow, ButtonsWrapper } from "./deals.styles"
import { PageContext } from "../../Organisms"

const Form = ({ selectedDealCode }) => {
  const { setPanelStatus } = React.useContext(PageContext)
  const { onUpdateDealCodeSubmit, updateLoading } = React.useContext(DealCodesContext)
  const isDeleted = !!get(selectedDealCode, "deleted_at")

  // Define fields for Edit Deal Code form
  const editDealCodeFormik = useFormik({
    initialValues: {
      description: get(selectedDealCode, "description", ""),
      start_date: moment(get(selectedDealCode, "start_date"), "YYYY-MM-DD").format("YYYY-MM-DD"),
      end_date: moment(get(selectedDealCode, "end_date"), "YYYY-MM-DD").format("YYYY-MM-DD"),
      style_new: get(selectedDealCode, "style_new", false),
      style_switch: get(selectedDealCode, "style_switch", false),
      underwriting_fmu: get(selectedDealCode, "underwriting_fmu", false),
      underwriting_mori: get(selectedDealCode, "underwriting_mori", false),
      active: get(selectedDealCode, "active", false)
    },
    validationSchema,
    onSubmit: body => onUpdateDealCodeSubmit({ body })
  })

  const { handleSubmit } = editDealCodeFormik
  const formik = { ...editDealCodeFormik, validationSchema }

  return (
    <div data-testid="deal_codes-edit_deal_codes">
      {/* Status */}
      <EditFieldRow>
        <EditFieldWrapper>
          <Toggle
            name="active"
            label="Status"
            options={[
              {
                order: 1,
                label: "Active",
                value: true
              },
              {
                order: 2,
                label: "Inactive",
                value: false
              }
            ]}
            appearance="light"
            formik={formik}
            margin="0"
            isDisabled={isDeleted}
          />
        </EditFieldWrapper>
      </EditFieldRow>
      {/* Dates */}
      <EditFieldRow>
        <EditFieldWrapper>
          <DatePicker
            label="Start date"
            name="start_date"
            formik={formik}
            appearance="light"
            margin="0 2rem 0 0"
            isDisabled={isDeleted}
          />
        </EditFieldWrapper>
        <EditFieldWrapper>
          <DatePicker
            label="End date"
            name="end_date"
            formik={formik}
            appearance="light"
            margin="0"
            isDisabled={isDeleted}
          />
        </EditFieldWrapper>
      </EditFieldRow>
      {/* Journey Types */}
      <H4 appearance="light" margin="0 0 2rem">
        Journey Types
      </H4>
      <EditFieldRow>
        <EditFieldWrapper>
          <Checkbox
            appearance="light"
            label="New"
            name="style_new"
            formik={formik}
            isDisabled={isDeleted}
            margin="0"
          />
        </EditFieldWrapper>
        <EditFieldWrapper>
          <Checkbox
            appearance="light"
            label="Switch"
            name="style_switch"
            formik={formik}
            isDisabled={isDeleted}
            margin="0"
          />
        </EditFieldWrapper>
      </EditFieldRow>
      {/* Underwriting Types */}
      <H4 appearance="light" margin="0 0 2rem">
        Underwriting Styles
      </H4>
      <EditFieldRow>
        <EditFieldWrapper>
          <Checkbox
            appearance="light"
            label="Moratorium"
            name="underwriting_mori"
            formik={formik}
            isDisabled={isDeleted}
            margin="0"
          />
        </EditFieldWrapper>
        <EditFieldWrapper>
          <Checkbox
            appearance="light"
            label="FMU"
            name="underwriting_fmu"
            formik={formik}
            isDisabled={isDeleted}
            margin="0"
          />
        </EditFieldWrapper>
      </EditFieldRow>
      <TextArea
        label="Description"
        name="description"
        formik={formik}
        margin="0 0 2rem"
        appearance="light"
        rows={5}
      />
      {/* Submit/Cancel buttons */}
      <ButtonsWrapper>
        <Button
          appearance="success"
          trailingIcon="check"
          onClick={handleSubmit}
          isLoading={updateLoading}
          isDisabled={isDeleted}
          name="edit_deal_codes_submit"
        >
          Save
        </Button>
        <Button
          appearance="error"
          trailingIcon="close"
          onClick={() => setPanelStatus("closed")}
          name="edit_deal_codes_cancel"
        >
          Cancel
        </Button>
      </ButtonsWrapper>
    </div>
  )
}

Form.defaultProps = {
  selectedDealCode: null
}

Form.propTypes = {
  selectedDealCode: PropTypes.object
}

export default Form
