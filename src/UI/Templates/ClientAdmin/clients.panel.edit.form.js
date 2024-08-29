import React, { useContext } from "react"
import moment from "moment"
import { get } from "lodash"
import { useFormik } from "formik"
import { Input, DatePicker, Select, PhoneNumbers, Address } from "@4cplatform/elements/Forms"
import { Button } from "@4cplatform/elements/Molecules"
import { H3 } from "@4cplatform/elements/Typography"
import { ConfigContext } from "@4cplatform/elements/Config"

// Helpers
import { renderTitleOptions } from "@4cplatform/elements/Helpers"
import { ClientsContext } from "./clients.context"
import { editClientModel as validationSchema } from "./clients.helpers"

// Components
import { PageContext } from "../../Organisms"
import { PanelBody } from "../../Molecules/FlyOutPanel"
import ClientsPanelHeader from "./clients.panel.header"
import { EditFieldRow, EditClientFormWrapper, ButtonsWrapper } from "./clients.styles"

const EditClientForm = () => {
  const { viewData, onUpdateClient, updateLoading, clientUpdateError } = useContext(ClientsContext)
  const { setPanelStatus } = useContext(PageContext)
  const { LOADING_TITLES, GLOBAL_TITLES } = useContext(ConfigContext)
  const editClientFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      date_of_birth: moment(get(viewData, "date_of_birth", "")).format("YYYY-MM-DD"),
      gender: get(viewData, "gender_at_birth", "").toLowerCase(),
      title: get(viewData, "title", ""),
      first_name: get(viewData, "first_name", ""),
      last_name: get(viewData, "last_name", ""),
      email_address: get(viewData, "email_address", ""),
      phone_numbers: get(viewData, "phone_numbers", []).map(number => ({
        type: number.type,
        number: number.number
      })),
      address: get(viewData, "address", {
        postcode: "",
        line_one: "",
        line_two: "",
        city: "",
        county: ""
      })
    },
    validationSchema,
    onSubmit: body => onUpdateClient({ body })
  })
  const { handleSubmit } = editClientFormik
  const formik = { ...editClientFormik, validationSchema }

  return (
    <PanelBody>
      <ClientsPanelHeader isEdit />
      <H3 appearance="light">Personal details</H3>
      <EditClientFormWrapper data-testid="clients-edit-client">
        <EditFieldRow>
          <Select
            name="gender"
            width="20rem"
            formik={formik}
            label="Gender"
            margin="0 1rem 0 0"
            appearance="light"
            apiErrors={clientUpdateError}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
          <DatePicker
            name="date_of_birth"
            formik={formik}
            label="Date of birth"
            margin="0"
            appearance="light"
            apiErrors={clientUpdateError}
          />
        </EditFieldRow>

        <EditFieldRow>
          <Select
            name="title"
            label="Title"
            formik={formik}
            margin="0 1rem 0 0"
            width="20rem"
            appearance="light"
            isDisabled={LOADING_TITLES}
            apiErrors={clientUpdateError}
          >
            {LOADING_TITLES ? (
              <option value="">Loading titles</option>
            ) : (
              <option value="">Select title</option>
            )}
            {renderTitleOptions(GLOBAL_TITLES?.data, formik, "gender")}
          </Select>
          <Input
            label="First name"
            name="first_name"
            formik={formik}
            margin="0 1rem 0 0"
            appearance="light"
            width="25rem"
            apiErrors={clientUpdateError}
          />
          <Input
            label="Last name"
            name="last_name"
            formik={formik}
            appearance="light"
            width="25rem"
            apiErrors={clientUpdateError}
          />
        </EditFieldRow>
        <EditFieldRow>
          <Input
            label="Email address"
            name="email_address"
            formik={formik}
            margin="0"
            appearance="light"
            width="45.5rem"
            apiErrors={clientUpdateError}
          />
        </EditFieldRow>
        <PhoneNumbers
          name="phone_numbers"
          formik={formik}
          appearance="light"
          label="Phone numbers"
          hasErrorMessage
          apiErrors={clientUpdateError}
        />
        <Address
          label="Address"
          name="address"
          formik={formik}
          appearance="light"
          apiErrors={clientUpdateError}
        />
        <ButtonsWrapper>
          <Button
            appearance="success"
            trailingIcon="check"
            onClick={handleSubmit}
            isLoading={updateLoading}
            name="edit_client_submit"
          >
            Save
          </Button>
          <Button
            appearance="error"
            trailingIcon="close"
            onClick={() => setPanelStatus("open")}
            name="edit_client_cancel"
          >
            Cancel
          </Button>
        </ButtonsWrapper>
      </EditClientFormWrapper>
    </PanelBody>
  )
}

export default EditClientForm
