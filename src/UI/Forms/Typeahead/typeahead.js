/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import PropTypes from "prop-types"
import { debounce, get } from "lodash"
import { nullFunc } from "@4cplatform/elements/Helpers"

// Components
import { Wrapper, StyledInput } from "./typeahead.styles"
import Dropdown from "./typeahead.drop"

const Typeahead = ({
  onChange,
  onSelect,
  name,
  isLoading,
  suggestions,
  formik,
  apiErrors,
  hasErrorMessage,
  error,
  errors,
  hasError: manualHasError,
  margin,
  hasCancel,
  onCancel,
  shouldClearOnSubmit,
  hasSearch,
  labelWidth,
  ...rest
}) => {
  // State
  const [isOpen, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [filteredSuggestiones, setFilteredSuggestiones] = React.useState("")
  const [isMouseOverDropdown, setIsMouseOverDropdown] = React.useState(false)

  // Clear the value on form submission
  const isSubmitting = get(formik, "isSubmitting", false)
  React.useEffect(() => {
    if (shouldClearOnSubmit && isSubmitting) {
      setValue("")
    }
  }, [isSubmitting])

  React.useEffect(() => {
    if (hasSearch && suggestions) {
      const searchResults = suggestions.filter(item =>
        item.label.toUpperCase().includes(value.toUpperCase())
      )
      setFilteredSuggestiones(searchResults)
    }
  }, [value, hasSearch])

  const onChangeDebounced = React.useCallback(debounce(onChange, 500), [])

  // Handle what happens when the user alters the input
  const handleChange = eventValue => {
    // Open the dropdown if the value is truthy
    if (eventValue) {
      setOpen(true)
    }

    setValue(eventValue)
    onChangeDebounced(eventValue)
  }

  // Handle what happens if an item is selected
  const handleSelect = suggestion => {
    setValue(suggestion.label)
    if (formik) formik.setFieldValue(name, suggestion.id)
    setOpen(false)
    onSelect(suggestion)
  }

  // Handle what happens if the cancel button is clicked
  const handleCancel = () => {
    setValue("")
    if (formik) formik.setFieldValue(name, null)
    setOpen(false)
    onCancel()
  }

  return (
    <Wrapper isLoading={isLoading} margin={margin}>
      <StyledInput
        isOpen={isOpen}
        onChange={handleChange}
        value={value}
        name={name}
        autoComplete="off"
        trailingIcon={hasCancel ? "close" : "magnify"}
        margin="0"
        formik={formik}
        onClick={
          !hasCancel
            ? null
            : () => {
                handleCancel()
              }
        }
        onBlur={() => !isMouseOverDropdown && setOpen(false)}
        labelWidth={labelWidth}
        hasErrorMessage={hasErrorMessage}
        error={error}
        errors={errors}
        apiErrors={apiErrors}
        {...rest}
      />
      <Dropdown
        setIsMouseOverDropdown={setIsMouseOverDropdown}
        handleSelect={handleSelect}
        setOpen={setOpen}
        suggestions={hasSearch === true ? filteredSuggestiones : suggestions}
        userInput={value}
        isLoading={isLoading}
        isOpen={isOpen}
        name={name}
        labelWidth={labelWidth}
        margin={labelWidth ? `0 0 0 ${labelWidth}` : ""}
      />
    </Wrapper>
  )
}

Typeahead.defaultProps = {
  onSelect: nullFunc,
  onChange: nullFunc,
  isLoading: false,
  suggestions: [],
  apiErrors: {},
  hasErrorMessage: true,
  error: null,
  errors: {},
  hasError: false,
  margin: "0 0 2rem",
  hasCancel: false,
  onCancel: nullFunc,
  shouldClearOnSubmit: false,
  formik: null,
  hasSearch: false
}

Typeahead.propTypes = {
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  suggestions: PropTypes.array,
  formik: PropTypes.object,
  apiErrors: PropTypes.object,
  hasErrorMessage: PropTypes.bool,
  error: PropTypes.string,
  errors: PropTypes.object,
  hasError: PropTypes.bool,
  margin: PropTypes.string,
  hasCancel: PropTypes.bool,
  onCancel: PropTypes.func,
  shouldClearOnSubmit: PropTypes.bool,
  hasSearch: PropTypes.bool,
  labelWidth: PropTypes.string
}

export default Typeahead
