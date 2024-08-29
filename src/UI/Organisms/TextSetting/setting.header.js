import React from "react"
import PropTypes from "prop-types"
import { Icon } from "@4cplatform/elements/Atoms"
import { H3 } from "@4cplatform/elements/Typography"
import { colours, nullFunc } from "@4cplatform/elements/Helpers"
import { Input } from "@4cplatform/elements/Forms"

// Components
import { Header, ButtonsWrapper, HeaderButton, TitleInputWrapper } from "./setting.styles"

const SettingHeader = ({
  content,
  name,
  title,
  helperText,
  hasDelete,
  onDelete,
  isEdit,
  setEdit,
  isLoading,
  titleLabel,
  canEditTitle,
  settingFormik,
  onEdit,
  onCancel,
  shouldShowDeleteOnEdit
}) => (
  <Header>
    {/* Show Input if the title can be edited */}
    {isEdit && canEditTitle && (
      <TitleInputWrapper>
        <Input formik={settingFormik} name={`${name}.title`} label={titleLabel} />
      </TitleInputWrapper>
    )}
    {/* Show H3 if the title cannot be edited, or if component is not in edit mode */}
    {(!isEdit || !canEditTitle) && (
      <H3 helperText={helperText} helperPosition="left" margin="0" isLoading={isLoading}>
        {title}
      </H3>
    )}
    <ButtonsWrapper hasLabel={canEditTitle && isEdit && !!titleLabel}>
      {/* Normal button display */}
      {!isEdit && (
        <HeaderButton name={`${name}_edit`} onClick={() => setEdit(true)} isDisabled={isLoading}>
          <Icon icon="playlist-edit" colour={colours.white} />
        </HeaderButton>
      )}
      {/* Edit state button display */}
      {isEdit && (
        <>
          <HeaderButton
            appearance="success"
            onClick={() => {
              onEdit ? onEdit() : settingFormik.handleSubmit()
            }}
            isDisabled={isLoading}
            name={`${name}_submit`}
          >
            <Icon icon="check" colour={colours.white} />
          </HeaderButton>
          <HeaderButton
            appearance="error"
            onClick={() => (onCancel ? onCancel() : setEdit(false))}
            isDisabled={isLoading}
            name={`${name}_cancel`}
          >
            <Icon icon="close" colour={colours.white} />
          </HeaderButton>
        </>
      )}
      {/* Delete button display */}
      {(shouldShowDeleteOnEdit || !isEdit) && !!content && hasDelete && (
        <HeaderButton
          appearance="error"
          onClick={onDelete}
          name={`${name}_delete`}
          isDisabled={isLoading}
        >
          <Icon icon="delete" colour={colours.white} />
        </HeaderButton>
      )}
    </ButtonsWrapper>
  </Header>
)

SettingHeader.defaultProps = {
  title: "",
  helperText: "",
  content: "",
  onDelete: nullFunc,
  hasDelete: true,
  isEdit: false,
  setEdit: nullFunc,
  isLoading: false,
  titleLabel: "",
  canEditTitle: false,
  shouldShowDeleteOnEdit: false
}

SettingHeader.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  helperText: PropTypes.string,
  hasDelete: PropTypes.bool,
  onDelete: PropTypes.func,
  isEdit: PropTypes.bool,
  setEdit: PropTypes.func,
  isLoading: PropTypes.bool,
  titleLabel: PropTypes.string,
  canEditTitle: PropTypes.bool,
  settingFormik: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onCancel: PropTypes.func,
  shouldShowDeleteOnEdit: PropTypes.bool
}

export default SettingHeader
