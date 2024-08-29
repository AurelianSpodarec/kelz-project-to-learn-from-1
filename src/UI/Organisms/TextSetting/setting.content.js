import React from "react"
import PropTypes from "prop-types"
import { isNull } from "lodash"
import { RenderHTML, Skeleton } from "@4cplatform/elements/Molecules"
import { TextArea } from "@4cplatform/elements/Forms"

// Components
import { TextEditor } from "../../Forms"
import { Content, LoadingWrapper } from "./setting.styles"

const SettingContent = ({
  content,
  name,
  canEditHTML,
  isEdit,
  isLoading,
  contentLabel,
  canEditTitle,
  settingFormik,
  isCustomContent
}) => (
  <Content isEditor={isEdit && canEditHTML} contentLabel={contentLabel}>
    {isCustomContent && content}
    {!isEdit && !isLoading && !isCustomContent && (
      <RenderHTML
        content={
          isNull(content)
            ? "<p>(No custom values have been provided for this setting.)</p>"
            : content
        }
      />
    )}
    {!isEdit && isLoading && <Skeleton count={3} wrapper={LoadingWrapper} />}
    {isEdit && !canEditHTML && !isCustomContent && (
      <TextArea
        name={canEditTitle ? `${name}.content` : name}
        formik={settingFormik}
        margin="0"
        isDisabled={isLoading}
        label={contentLabel}
      />
    )}
    {isEdit && canEditHTML && (
      <TextEditor
        name={canEditTitle ? `${name}.content` : name}
        formik={settingFormik}
        margin="0"
        isDisabled={isLoading}
        label={contentLabel}
      />
    )}
  </Content>
)

SettingContent.defaultProps = {
  content: "",
  canEditHTML: true,
  isEdit: false,
  isLoading: false,
  contentLabel: "",
  canEditTitle: false,
  isCustomContent: false
}

SettingContent.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  name: PropTypes.string.isRequired,
  canEditHTML: PropTypes.bool,
  isEdit: PropTypes.bool,
  isLoading: PropTypes.bool,
  contentLabel: PropTypes.string,
  canEditTitle: PropTypes.bool,
  settingFormik: PropTypes.object.isRequired,
  isCustomContent: PropTypes.bool
}

export default SettingContent
