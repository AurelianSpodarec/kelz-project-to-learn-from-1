import React from "react"
import PropTypes from "prop-types"
import { useFormik } from "formik"
import { nullFunc } from "@4cplatform/elements/Helpers"

// Components
import { Wrapper } from "./setting.styles"
import SettingHeader from "./setting.header"
import SettingContent from "./setting.content"

const TextSetting = ({
  content,
  name,
  title,
  helperText,
  onSubmit: manualOnSubmit,
  hasDelete,
  onDelete,
  canEditHTML,
  isEdit,
  setEdit,
  margin,
  isLoading,
  contentLabel,
  titleLabel,
  canEditTitle,
  onEdit,
  onCancel,
  isCustomContent,
  shouldShowDeleteOnEdit
}) => {
  // Set initialValues based on whether or not the title can be edited
  let initialValues = {}
  if (canEditTitle) {
    initialValues = {
      [name]: {
        content,
        title
      }
    }
  } else {
    initialValues = {
      [name]: content
    }
  }

  // Formik instance
  const settingFormik = useFormik({
    initialValues,
    onSubmit: body => manualOnSubmit(body),
    enableReinitialize: true
  })

  return (
    <Wrapper margin={margin} data-testid={`${name}-text_setting-wrapper`}>
      <SettingHeader
        content={content}
        name={name}
        title={title}
        helperText={helperText}
        hasDelete={hasDelete}
        onDelete={onDelete}
        isEdit={isEdit}
        setEdit={setEdit}
        isLoading={isLoading}
        titleLabel={titleLabel}
        canEditTitle={canEditTitle}
        settingFormik={settingFormik}
        onEdit={onEdit}
        onCancel={onCancel}
        isCustomContent={isCustomContent}
        shouldShowDeleteOnEdit={shouldShowDeleteOnEdit}
      />
      <SettingContent
        content={content}
        name={name}
        canEditHTML={canEditHTML}
        isEdit={isEdit}
        isLoading={isLoading}
        contentLabel={contentLabel}
        canEditTitle={canEditTitle}
        settingFormik={settingFormik}
        isCustomContent={isCustomContent}
      />
    </Wrapper>
  )
}

TextSetting.defaultProps = {
  title: "",
  helperText: "",
  content: "",
  onSubmit: nullFunc,
  canEditHTML: true,
  hasDelete: true,
  onDelete: nullFunc,
  isEdit: false,
  setEdit: nullFunc,
  margin: "0 0 2rem",
  isLoading: false,
  contentLabel: "",
  titleLabel: "",
  canEditTitle: false,
  onCancel: null,
  isCustomContent: false,
  shouldShowDeleteOnEdit: false
}

TextSetting.propTypes = {
  /**
   * The name prop used to control the internal formik elements
   */
  name: PropTypes.string.isRequired,
  /**
   * The title attached to the content container
   */
  title: PropTypes.string,
  /**
   * If truthy, this text is rendered as helperText in a HelperText modal
   */
  helperText: PropTypes.string,
  /**
   * The extant text content of this setting
   */
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /**
   * The function which fires when the submission button is clicked.
   */
  onSubmit: PropTypes.func,
  /**
   * A boolean value which determines whether the editing is done by TextArea or TextEditor
   */
  canEditHTML: PropTypes.bool,
  /**
   * Whether the Delete button is present or not
   */
  hasDelete: PropTypes.bool,
  /**
   * The function which fires when the delete button is clicked.
   */
  onDelete: PropTypes.func,
  /**
   * A boolean which controls whether or not to display the component in the Edit state
   */
  isEdit: PropTypes.bool,
  /**
   * The function which sets the edit state of the component
   */
  setEdit: PropTypes.func,
  /**
   * The margin attached to the wrapper
   */
  margin: PropTypes.string,
  /**
   * The loading state of the component
   */
  isLoading: PropTypes.bool,
  /**
   * The label of the text editor while it is in edit mode
   */
  contentLabel: PropTypes.string,
  /**
   * The label of the input while it is visible
   */
  titleLabel: PropTypes.string,
  /**
   * A boolean representing whether or not the title can be edited in this text setting
   */
  canEditTitle: PropTypes.bool,
  /**
   * A function that can fire when the edit button is clicked when isEdit is true
   */
  onEdit: PropTypes.func,
  /**
   * A function that can fire when the cancel button is clicked instead of running setEdit
   */
  onCancel: PropTypes.func,
  /**
   * A boolean value which determines whether the custom content is provided
   */
  isCustomContent: PropTypes.bool,
  /**
   * A boolean value which determines whether the delete button is showing when editing
   */
  shouldShowDeleteOnEdit: PropTypes.bool
}

export default TextSetting
