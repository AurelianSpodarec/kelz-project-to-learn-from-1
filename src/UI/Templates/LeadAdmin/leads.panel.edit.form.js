import React, { useContext } from "react"
import PropTypes from "prop-types"
import moment from "moment"
import { get } from "lodash"
import { useFormik } from "formik"
import { Input, DatePicker, Select, PhoneNumbers } from "@4cplatform/elements/Forms"
import { Button } from "@4cplatform/elements/Molecules"
import { ConfigContext } from "@4cplatform/elements/Config"

// Helpers
import { renderTitleOptions } from "@4cplatform/elements/Helpers"
import { LeadsContext } from "./leads.context"
import { editLeadModel as validationSchema } from "./leads.helpers"
import { PageContext } from "../../Organisms"

// Components
import { EditFieldRow, EditFieldWrapper, ButtonsWrapper } from "./leads.styles"

const EditLeadForm = ({ selectedLead }) => {
  const { setPanelStatus } = useContext(PageContext)
  const { onUpdateLeadSubmit, updateLoading, config } = useContext(LeadsContext)
  const { LOADING_TITLES, GLOBAL_TITLES } = useContext(ConfigContext)
  const sources = get(config, "source", {})

  // Define fields for Edit Lead Form
  const editLeadFormik = useFormik({
    initialValues: {
      type: get(selectedLead, "type", ""),
      lead_source: get(selectedLead, "lead_source", ""),
      date_of_birth: moment(get(selectedLead, "date_of_birth", ""), "YYYY-MM-DD").format(
        "YYYY-MM-DD"
      ),
      gender_at_birth: get(selectedLead, "gender_at_birth", ""),
      title: get(selectedLead, "title", ""),
      first_name: get(selectedLead, "first_name", ""),
      last_name: get(selectedLead, "last_name", ""),
      email_address: get(selectedLead, "email_address", ""),
      phone_numbers: get(selectedLead, "phone_numbers", [{ type: "", number: "" }])
    },
    validationSchema,
    onSubmit: body => onUpdateLeadSubmit({ body })
  })

  const { handleSubmit } = editLeadFormik
  const formik = { ...editLeadFormik, validationSchema }

  return (
    <div data-testid="leads-edit_leads">
      {/* Type/Source */}
      <EditFieldRow>
        <EditFieldWrapper>
          <Select
            name="type"
            formik={formik}
            margin="0 1rem 0 0"
            label="Type"
            appearance="light"
            isDisabled
          >
            <option value="">Select type</option>
            <option value="PMI">PMI</option>
          </Select>
        </EditFieldWrapper>
        <EditFieldWrapper>
          <Select
            name="lead_source"
            formik={formik}
            margin="0 1rem 0 0"
            label="Lead source"
            appearance="light"
            isDisabled
          >
            <option value="">Select source</option>
            {/* Build options from config */}
            {Object.keys(sources).map(key => (
              <option value={key} key={key}>
                {sources[key]}
              </option>
            ))}
          </Select>
        </EditFieldWrapper>
      </EditFieldRow>

      {/* Gender/DOB */}
      <EditFieldRow>
        <EditFieldWrapper>
          <Select
            name="gender_at_birth"
            formik={formik}
            label="Gender at birth"
            margin="0 1rem 0 0"
            appearance="light"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </EditFieldWrapper>
        <EditFieldWrapper>
          <DatePicker
            name="date_of_birth"
            formik={formik}
            label="Date of birth"
            margin="0"
            appearance="light"
            dateRangeMax={moment().subtract(18, "years").format("DD/MM/YYYY")}
          />
        </EditFieldWrapper>
      </EditFieldRow>

      {/* Title/First Name/Last Name */}
      <EditFieldRow>
        <EditFieldWrapper>
          <Select
            name="title"
            label="Title"
            formik={formik}
            margin="0 1rem 0 0"
            appearance="light"
            isDisabled={LOADING_TITLES}
          >
            {LOADING_TITLES ? (
              <option value="">Loading titles</option>
            ) : (
              <option value="">Select title</option>
            )}
            {renderTitleOptions(GLOBAL_TITLES?.data, formik)}
          </Select>
        </EditFieldWrapper>
        <EditFieldWrapper>
          <Input
            label="First name"
            name="first_name"
            formik={formik}
            margin="0 1rem 0 0"
            appearance="light"
          />
        </EditFieldWrapper>
        <EditFieldWrapper>
          <Input label="Last name" name="last_name" formik={formik} margin="0" appearance="light" />
        </EditFieldWrapper>
      </EditFieldRow>

      {/* Email */}
      <EditFieldRow>
        <EditFieldWrapper width="60rem">
          <Input
            label="Email address"
            name="email_address"
            formik={formik}
            margin="0"
            appearance="light"
          />
        </EditFieldWrapper>
      </EditFieldRow>

      {/* Phone Numbers */}
      <PhoneNumbers
        name="phone_numbers"
        formik={formik}
        appearance="light"
        label="Phone numbers"
        hasErrorMessage
      />

      {/* Submit/Cancel buttons */}
      <ButtonsWrapper>
        <Button
          appearance="success"
          trailingIcon="check"
          onClick={handleSubmit}
          isLoading={updateLoading}
          name="edit_lead_submit"
        >
          Save
        </Button>
        <Button
          appearance="error"
          trailingIcon="close"
          onClick={() => setPanelStatus("closed")}
          name="edit_lead_cancel"
        >
          Cancel
        </Button>
      </ButtonsWrapper>
    </div>
  )
}

EditLeadForm.defaultProps = {
  selectedLead: null
}

EditLeadForm.propTypes = {
  selectedLead: PropTypes.object
}

export default EditLeadForm
