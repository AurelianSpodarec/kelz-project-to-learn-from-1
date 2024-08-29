import React, { useContext } from "react"
import PropTypes from "prop-types"
import { get, isEmpty } from "lodash"

// Helpers
import { JourneyContext } from "../../journey.context"

// Components
import { SectionsWrapper } from "./form.styles"
import FormSection from "./form.section"

const JourneyForm = ({ sections, canShowIsLast }) => {
  const { data: journeyData, formik } = useContext(JourneyContext)

  return (
    <SectionsWrapper>
      {sections.map((section, i) => {
        const condition = get(section, "condition", {})

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

        return (
          <FormSection
            key={get(section, "key", i)}
            data={section}
            isLast={sections.length - 1 === i && canShowIsLast}
          />
        )
      })}
    </SectionsWrapper>
  )
}

JourneyForm.defaultProps = {
  sections: [],
  canShowIsLast: true
}

JourneyForm.propTypes = {
  sections: PropTypes.array,
  canShowIsLast: PropTypes.bool
}

export default JourneyForm
