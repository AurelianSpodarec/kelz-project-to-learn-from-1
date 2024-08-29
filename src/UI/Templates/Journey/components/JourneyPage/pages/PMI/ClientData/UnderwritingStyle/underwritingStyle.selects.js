/* eslint-disable no-bitwise */
import React, { useContext, useState, useEffect } from "react"
import { Select } from "@4cplatform/elements/Forms"
import { get } from "lodash"
import { string, object } from "yup"
import { P, SmallText } from "@4cplatform/elements/Typography"
import { ComplianceNote } from "@4cplatform/elements/Molecules"
import { v4 as uuid } from "uuid"
import { JourneyContext } from "../../../../../../journey.context"

const UnderwritingStyleSelects = () => {
  const { data, formik, addToFormikValidationSchema } = useContext(JourneyContext)

  const [recommendedStyleSelectConfig, setRecommendedStyleSelectConfig] = useState({
    value: get(data, "page.data.recommended_style", ""),
    options: null,
    helperText: null,
    isDisabled: false
  })

  const [complianceNoteContent, setComplianceNoteContent] = useState({
    title: null,
    text: null
  })

  const cpCurrentPolicy = get(data, "page.data.cp_current_policy", false)
  const cpUnderwriting = get(data, "page.data.cp_underwriting", "")

  useEffect(() => {
    // setting formik values and validationSchema
    if (
      get(formik, "values.recommended_underwriting", undefined) === undefined ||
      get(formik, "values.recommended_style", undefined) === undefined
    ) {
      // Setting recommended_style to NEW if current policy doesnt exist
      const recommendedStyleValue = cpCurrentPolicy
        ? get(data, "page.data.recommended_style", "")
        : "NEW"
      formik.setFieldValue("recommended_style", recommendedStyleValue)
      formik.setFieldValue(
        "recommended_underwriting",
        get(data, "page.data.recommended_underwriting", "")
      )
      addToFormikValidationSchema(
        object({ recommended_style: string().required("MISSING_REQUIRED_FIELD") }).concat(
          object({ recommended_underwriting: string().required("MISSING_REQUIRED_FIELD") })
        )
      )
    }

    // if user has a current policy
    if (
      cpCurrentPolicy &&
      cpUnderwriting !== "Don't know" &&
      get(data, "payload.has_access_to_agency_codes", false)
    ) {
      setRecommendedStyleSelectConfig({
        ...recommendedStyleSelectConfig,
        value: get(formik, "values.recommended_style", ""),
        isDisabled: false,
        options: (
          <>
            <option key={uuid()} value="NEW">
              New
            </option>
            <option key={uuid()} value="SWITCH">
              Switch
            </option>
          </>
        )
      })

      if (get(formik, "values.recommended_style", "") === "NEW") {
        setComplianceNoteContent({
          title: null,
          text: null
        })
      }

      if (get(formik, "values.recommended_style", "") === "SWITCH") {
        let complianceNoteContentUpdate
        switch (cpUnderwriting) {
          case "CMORI": {
            complianceNoteContentUpdate = {
              title: "Underwriting Changed",
              text: "The underwriting type has been automatically set to Moratorium because you have selected to Switch from a current CMORI policy."
            }
            break
          }
          case "CME": {
            complianceNoteContentUpdate = {
              title: "Underwriting Changed",
              text: "The underwriting type has been automatically set to FMU because you have selected to Switch from a current CME policy."
            }
            break
          }
          case "CPME": {
            complianceNoteContentUpdate = {
              title: "Underwriting Changed",
              text: "The underwriting type has been automatically set to FMU because you have selected to Switch from a current CPME policy."
            }
            break
          }
          case "MHD": {
            complianceNoteContentUpdate = {
              title: "Underwriting Set Automatically",
              text: "The underwriting type has been automatically set to MHD because you have selected to Switch from a current MHD policy."
            }
            break
          }
          case "MORI": {
            complianceNoteContentUpdate = {
              title: "Underwriting Set Automatically",
              text: "The underwriting type has been automatically set to Moratorium because you have selected to Switch from a current Moratorium policy."
            }
            break
          }
          case "FMU": {
            complianceNoteContentUpdate = {
              title: "Underwriting Set Automatically",
              text: "The underwriting type has been automatically set to FMU because you have selected to Switch from a current FMU policy."
            }
            break
          }
          default:
            break
        }
        formik.setFieldValue("recommended_underwriting", cpUnderwriting)
        setComplianceNoteContent(complianceNoteContentUpdate)
      }
    } else {
      // If user doesnt have current policy
      setRecommendedStyleSelectConfig({
        ...recommendedStyleSelectConfig,
        value: "NEW",
        isDisabled: true,
        options: (
          <option key={uuid()} value="NEW">
            New
          </option>
        ),
        helperText:
          "If you are looking to quote for a switch policy you must complete the relevant information regarding your clients existing policy in order for a price to be calculated."
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values])

  return (
    <>
      <Select
        name="recommended_style"
        label="Underwriting Style"
        required
        value={recommendedStyleSelectConfig.value}
        formik={formik}
        onChange={val => {
          if (val === "NEW") {
            formik.setFieldValue("recommended_underwriting", "")
          }
          formik.setFieldValue("recommended_style", val)
        }}
        isDisabled={recommendedStyleSelectConfig.isDisabled}
        helperText={recommendedStyleSelectConfig.helperText}
      >
        <option key={uuid()} value="">
          Please select
        </option>
        {recommendedStyleSelectConfig.options}
      </Select>

      <Select
        name="recommended_underwriting"
        label="Underwriting Type"
        required
        value={get(formik, "values.recommended_underwriting", "")}
        formik={formik}
        onChange={val => formik.setFieldValue("recommended_underwriting", val)}
        isDisabled={
          get(formik, "values.recommended_style", "") === "SWITCH" ||
          get(formik, "values.recommended_style", "") === ""
        }
      >
        <option key={uuid()} value="">
          Please select
        </option>
        {get(formik, "values.recommended_style", "") === "NEW" && (
          <>
            <option key={uuid()} value="MORI">
              Moratorium
            </option>
            <option key={uuid()} value="FMU">
              Full Medical Underwriting
            </option>
          </>
        )}
        {get(formik, "values.recommended_style", "") === "SWITCH" && (
          <>
            <option key={uuid()} value="MORI">
              Moratorium
            </option>
            <option key={uuid()} value="FMU">
              Full Medical Underwriting
            </option>
            <option key={uuid()} value="CMORI">
              Continued Moratorium
            </option>
            <option key={uuid()} value="CME">
              Continued Medical Exclusions
            </option>
            <option key={uuid()} value="CPME">
              Continued Personal Medical Exclusions
            </option>
            <option key={uuid()} value="MHD">
              Medical History Disregarded
            </option>
          </>
        )}
      </Select>

      {complianceNoteContent.text && (
        <ComplianceNote type="info" margin="0 0 3rem">
          <P>{complianceNoteContent.title}</P>
          <SmallText>{complianceNoteContent.text}</SmallText>
        </ComplianceNote>
      )}
    </>
  )
}
export default UnderwritingStyleSelects
