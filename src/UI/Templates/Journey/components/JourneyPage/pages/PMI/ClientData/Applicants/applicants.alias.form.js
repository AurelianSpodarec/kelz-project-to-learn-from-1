import React, { useContext } from "react"
import { PropTypes } from "prop-types"
import { get } from "lodash"
import { useFormik } from "formik"
import { Input, Address, Select } from "@4cplatform/elements/Forms"
import { renderTitleOptions } from "@4cplatform/elements/Helpers"
import { Button } from "@4cplatform/elements/Molecules"
import { ConfigContext } from "@4cplatform/elements/Config"

// Helpers
import { addEditAliasModel as validationSchema } from "./applicants.helpers"
import { ApplicantsContext } from "./applicants.context"

const AliasForm = ({ isEdit }) => {
  const { updateAlias, addAlias, alias, createAliasLoading, updateAliasLoading } =
    useContext(ApplicantsContext)
  const { LOADING_TITLES, GLOBAL_TITLES } = useContext(ConfigContext)

  // Formik instance
  const addEditAliasFormik = useFormik({
    initialValues: {
      address: {
        line_one: isEdit ? get(alias, "address.line_one", "") : "",
        line_two: isEdit ? get(alias, "address.line_two", "") : "",
        city: isEdit ? get(alias, "address.city", "") : "",
        county: isEdit ? get(alias, "address.county", "") : "",
        postcode: isEdit ? get(alias, "address.postcode", "") : ""
      },
      alias: {
        title: isEdit ? get(alias, "title", "") : "",
        first_name: isEdit ? get(alias, "first_name", "") : "",
        middle_names: isEdit ? get(alias, "middle_names", "") : "",
        last_name: isEdit ? get(alias, "last_name", "") : ""
      }
    },
    validationSchema,
    onSubmit: body => {
      if (isEdit) {
        updateAlias(body)
      } else {
        addAlias(body)
      }
    }
  })

  const { handleSubmit } = addEditAliasFormik
  const formik = { ...addEditAliasFormik, validationSchema }

  return (
    <>
      <Select name="alias.title" label="Title" formik={formik} isDisabled={LOADING_TITLES}>
        {LOADING_TITLES ? (
          <option value="">Loading titles</option>
        ) : (
          <option value="">Select title</option>
        )}
        {renderTitleOptions(GLOBAL_TITLES?.data, formik)}
      </Select>
      <Input label="First name" name="alias.first_name" formik={formik} />
      <Input label="Middle names" name="alias.middle_names" formik={formik} />
      <Input label="Last name" name="alias.last_name" formik={formik} />
      <Address label="Address" name="address" formik={formik} />
      <Button
        name="submit"
        onClick={handleSubmit}
        isLoading={createAliasLoading || updateAliasLoading}
      >
        Submit
      </Button>
    </>
  )
}

AliasForm.defaultProps = {
  isEdit: false
}

AliasForm.propTypes = {
  isEdit: PropTypes.bool
}

export default AliasForm
