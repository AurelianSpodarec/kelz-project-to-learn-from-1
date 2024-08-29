import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import { FileSelect } from "@4cplatform/elements/Forms"
import { H3, P } from "@4cplatform/elements/Typography"
import { ComplianceNote } from "@4cplatform/elements/Molecules"
import { useTranslations } from "@4cplatform/elements/Translations"

// Components
import { BodyWrapper, ListWrapper } from "./import.styles"
import FileList from "../../../../Molecules/FileList"

const Body = ({ type, formik, isLoading, errors }) => {
  const t = useTranslations()
  return (
    <>
      <BodyWrapper>
        {/* "import" type content */}
        {type === "import" && (
          <FileSelect
            name="file"
            formik={formik}
            margin="0"
            isLoading={isLoading}
            accept=".xls,.xlsx,.csv"
          />
        )}
        {/* "error" type content */}
        {type === "error" && (
          <ComplianceNote type="error">
            <P>There are errors with the uploaded file:</P>
            {errors.map(item => (
              <P>{t(item)}</P>
            ))}
          </ComplianceNote>
        )}
      </BodyWrapper>
      {/* FileList */}
      <ListWrapper>
        <H3 margin="0 0 2rem">Selected File</H3>
        <FileList files={get(formik, "values.file", [])} isError={type === "error"} />
      </ListWrapper>
    </>
  )
}

Body.defaultProps = {
  type: "import",
  formik: {},
  isLoading: false,
  errors: []
}

Body.propTypes = {
  type: PropTypes.oneOf(["import", "error"]),
  formik: PropTypes.object,
  isLoading: PropTypes.bool,
  errors: PropTypes.array
}

export default Body
