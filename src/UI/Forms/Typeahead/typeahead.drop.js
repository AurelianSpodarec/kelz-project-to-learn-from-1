import React from "react"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"
import { v4 as uuid } from "uuid"
import { Skeleton } from "@4cplatform/elements/Molecules"
import { H4, P } from "@4cplatform/elements/Typography"

// Components
import { DropWrapper, Item, ItemMainText, ItemHelperText } from "./typeahead.styles"

const Dropdown = ({
  handleSelect,
  suggestions,
  userInput,
  isOpen,
  isLoading,
  name,
  hasError,
  setIsMouseOverDropdown,
  labelWidth,
  margin
}) => {
  // If there isn't any input or there aren't any suggestions, hide the dropdown
  if (((!userInput && isEmpty(suggestions)) || !isOpen) && !isLoading) return null

  return (
    <>
      <DropWrapper
        data-testid={`${name}-typeahead-drop_wrapper`}
        hasError={hasError}
        onMouseOver={() => setIsMouseOverDropdown(true)}
        onMouseOut={() => setIsMouseOverDropdown(false)}
        labelWidth={labelWidth}
        margin={margin}
      >
        {!isLoading &&
          suggestions.map(suggestion => (
            <Item key={uuid()} suggestion={suggestion} onClick={() => handleSelect(suggestion)}>
              {!suggestion.subHeader && suggestion.label}
              {suggestion.subHeader && (
                <ItemMainText>
                  <H4 margin="0.5rem 0 0.5rem">{suggestion.label}</H4>
                  <P margin="0 0 0.5rem">{suggestion.subHeader}</P>
                </ItemMainText>
              )}
              {suggestion.helperText && (
                <ItemHelperText>
                  <P margin="0 0 0 0">{suggestion.helperText}</P>
                </ItemHelperText>
              )}
            </Item>
          ))}
        {isLoading && (
          <Item isLoading>
            <Skeleton />
          </Item>
        )}
      </DropWrapper>
    </>
  )
}

Dropdown.defaultProps = {
  isLoading: false,
  isOpen: false,
  hasError: false,
  setIsMouseOverDropdown: null
}

Dropdown.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  suggestions: PropTypes.array,
  userInput: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  isOpen: PropTypes.bool,
  name: PropTypes.string.isRequired,
  hasError: PropTypes.bool,
  setIsMouseOverDropdown: PropTypes.func,
  labelWidth: PropTypes.string,
  margin: PropTypes.string
}

export default Dropdown
