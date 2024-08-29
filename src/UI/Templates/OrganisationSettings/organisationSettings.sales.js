import React, { useContext } from "react"
import { get, omit } from "lodash"
import { useFormik } from "formik"
import { object, boolean } from "yup"
import { H2, H3, P } from "@4cplatform/elements/Typography"
import { Toggle } from "@4cplatform/elements/Forms"
import { Skeleton } from "@4cplatform/elements/Molecules"

// Helpers
import { OrganisationSettingsContext } from "./organisationSettings.context"
import { salesSettingsLabels } from "./organisationsSettings.helpers"

// Components
import { SettingsWrapper } from "./organisationSettings.styles"

const SalesSettings = () => {
  const { salesData, salesLoading, onSalesUpdate, updateSalesLoading } = useContext(
    OrganisationSettingsContext
  )
  const keys = Object.keys(omit(salesData, "id"))
  const isLoading = salesLoading || updateSalesLoading

  const validationSchema = (() => {
    const schema = {}
    keys.forEach(key => (schema[key] = boolean().required("MISSING_REQUIRED_FIELD")))
    return object(schema)
  })()

  const salesSettingsFormik = useFormik({
    enableReinitialize: true,
    initialValues: omit(salesData, "id"),
    validationSchema,
    onSubmit: val => onSalesUpdate(val)
  })

  const formik = { ...salesSettingsFormik, validationSchema }

  return (
    <SettingsWrapper>
      <H2 margin="0 0 4rem">Sales Preferences</H2>
      {!isLoading &&
        keys.map(key => (
          <div key={key}>
            {key === "buy_sales_leads" && (
              <>
                <H3 margin="0 0 1rem">Lead data</H3>
                <P>
                  As a 4C Platform user, you will have the option to purchase sales leads.
                  <br />
                  If this is of potential interest to you, please let us know the following:
                </P>
              </>
            )}
            {key === "critical_illness_cover" && (
              <>
                <H3>Product sold</H3>
                <P>
                  Of the options below, please let us know what types of insurance your organisation
                  sells:
                </P>
              </>
            )}
            <Toggle
              name={key}
              label={get(salesSettingsLabels, key, key)}
              value={formik.values[key]}
              onChange={val => {
                formik.setFieldValue(key, val)
                formik.handleSubmit()
              }}
              isHorizontal
              labelWidth="49rem"
            />
          </div>
        ))}
      {isLoading && <Skeleton wrapper={P} count={15} lineHeight="5rem" />}
    </SettingsWrapper>
  )
}

export default SalesSettings
