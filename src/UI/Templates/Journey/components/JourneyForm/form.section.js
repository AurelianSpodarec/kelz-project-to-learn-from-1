import React, { useContext } from "react"
import PropTypes from "prop-types"
import { get, isEmpty } from "lodash"
import { H3, H4 } from "@4cplatform/elements/Typography"

// Helpers
import { JourneyContext } from "../../journey.context"

// Components
import { FormSection as Section } from "./form.styles"
import SectionComponent from "../SectionComponent"

const FormSection = ({ data: sectionData, isLast }) => {
  const { data: journeyData, formik } = useContext(JourneyContext)
  const title = get(sectionData, "title", "")
  const subtitle = get(sectionData, "subtitle", "")
  const components = get(sectionData, "components", [])

  return (
    <Section isLast={isLast}>
      {!!title && (
        <H3 margin="0 0 2rem" helperText={get(sectionData, "titleHelper", "")}>
          {title}
        </H3>
      )}
      {!!subtitle && (
        <H4
          helperTitle={get(sectionData, "subtitleHelperTitle", "Help")}
          helperText={get(sectionData, "subtitleHelper", "")}
        >
          {subtitle}
        </H4>
      )}
      {components.map((component, i) => {
        const condition = get(component, "condition", {})

        if (!isEmpty(condition)) {
          const type = get(condition, "type", "formik")

          if (type === "formik") {
            const fieldKey = get(condition, "fieldKey")
            const fieldValue = get(condition, "fieldValue")

            if (get(formik, `values.${fieldKey}`) !== fieldValue) {
              return null
            }
          }

          if (type === "data") {
            const path = get(condition, "path")
            const value = get(condition, "value")

            if (!get(journeyData, path) !== value) {
              return null
            }
          }
        }

        return <SectionComponent key={get(component, "key", i)} data={component} />
      })}
    </Section>
  )
}

FormSection.propTypes = {
  data: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired
}

export default FormSection
