import React from "react"
import PropTypes from "prop-types"
import { get, isEmpty } from "lodash"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { ErrorMessage } from "@4cplatform/elements/Forms"
import { isRequiredField, hasFormikErrorsField } from "@4cplatform/elements/Helpers"

// Components
import { EditorWrapper, Wrapper, LabelWrapper, StyledLabel } from "./editor.styles"

const TextEditor = ({
  width,
  margin,
  name,
  formik,
  label,
  appearance,
  isDisabled,
  hasError: manualHasError,
  isRequired: manualIsRequired,
  error,
  apiErrors,
  hasErrorMessage,
  errors: manualErrors
}) => {
  const handleChange = val => formik.setFieldValue(name, val)
  const data = get(formik, `values[${name}]`)
  const isRequired = isRequiredField(get(formik, "validationSchema", {}), name) || manualIsRequired
  const hasError =
    error || hasFormikErrorsField(formik, name) || get(apiErrors, name, false) || manualHasError
  let errors = {}
  errors[name] = [...get(apiErrors, name, [])]
  // Append error to API ones.
  if (error) {
    errors[name] = [...errors[name], error]
  }
  // If manual errors are passed in, override normal error handling
  if (!isEmpty(manualErrors)) {
    errors = { ...manualErrors }
  }

  return (
    <Wrapper margin={margin}>
      <EditorWrapper width={width} data-testid={`${name}-editor-wrapper`}>
        {!!label && (
          <LabelWrapper data-testid={`${name}-editor-label_wrapper`}>
            <StyledLabel
              htmlFor={name}
              hasError={hasError}
              isDisabled={isDisabled}
              isRequired={isRequired}
              data-testid={`${name}-editor-label`}
              className="editor__label"
              appearance={appearance}
            >
              {label}
              <sup>&#42;</sup>
            </StyledLabel>
          </LabelWrapper>
        )}
        <CKEditor
          editor={ClassicEditor}
          data={data}
          config={{
            toolbar: ["heading", "bold", "italic", "undo", "redo", "numberedList", "bulletedList"],
            isReadOnly: isDisabled
          }}
          onChange={(e, editor) => {
            const val = editor.getData()
            handleChange(val)
          }}
          onBlur={(e, editor) => {
            const val = editor.getData()
            handleChange(val)
          }}
          data-testid={`${name}-editor`}
          disabled={isDisabled}
        />
      </EditorWrapper>
      {hasError && hasErrorMessage && (
        <div data-testid={`${name}-editor-error_wrapper`}>
          <ErrorMessage formik={formik} apiErrors={errors} name={name} />
        </div>
      )}
    </Wrapper>
  )
}

TextEditor.defaultProps = {
  width: "100%",
  margin: "0 0 2rem",
  label: "",
  appearance: "dark",
  isDisabled: false,
  isRequired: false,
  hasError: false,
  error: null,
  apiErrors: {},
  hasErrorMessage: true,
  errors: {}
}

TextEditor.propTypes = {
  /**
   * The width of this component, passed to the wrapper
   */
  width: PropTypes.string,
  /**
   * The margin of this component, passed to the wrapper
   */
  margin: PropTypes.string,
  /**
   * The name, used to handle this component's relationship to the formik instance
   */
  name: PropTypes.string.isRequired,
  /**
   * The formik instance
   */
  formik: PropTypes.object.isRequired,
  /**
   * The label attached to this component
   */
  label: PropTypes.string,
  /**
   * The light or dark appearance of this component
   */
  appearance: PropTypes.oneOf(["light", "dark"]),
  /**
   * A boolean which controls the disabled state of the TextEditor
   */
  isDisabled: PropTypes.bool,
  /**
   * A boolean which allows you to manually mark this as a required field
   */
  isRequired: PropTypes.bool,
  /**
   * A boolean which allows you to force an error
   */
  hasError: PropTypes.bool,
  /**
   * A string which allows you to manually set an error for this component
   */
  error: PropTypes.string,
  /**
   * apiErrors attached to this component
   */
  apiErrors: PropTypes.object,
  /**
   * A boolean which allows you to show or hide the ErrorMessage
   */
  hasErrorMessage: PropTypes.bool,
  /**
   * manually set errors attached to this component
   */
  errors: PropTypes.object
}

export default TextEditor
