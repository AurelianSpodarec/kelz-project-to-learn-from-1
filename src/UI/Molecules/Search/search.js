import React, { useState, useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import { get, debounce } from "lodash"
import Input from "@4cplatform/elements/Forms/Input"

// Components
import { SearchWrapper } from "./search.styles"

const Search = ({
  onCancel,
  name,
  handleChange,
  placeholder,
  margin,
  width,
  defaultValue,
  charLimit,
  dependencies,
  ...rest
}) => {
  const [value, setValue] = useState(get(rest, "value", defaultValue))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeDebounced = useMemo(() => debounce(handleChange, 250), [value, ...dependencies])

  // If value is truthy, replace the search icon with a cancel button
  const hasValue = !!value

  useEffect(
    () => () => {
      onChangeDebounced.cancel()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <SearchWrapper margin={margin} width={width} data-testid={`${name}-search-wrapper`}>
      <Input
        margin="0"
        name={name}
        value={value}
        onChange={val => {
          setValue(val)
          // Only search if there are three or more characters
          if (val.length >= charLimit) {
            onChangeDebounced(val)
          }
          // If val is truthy but there are fewer than three characters, serve up the default
          if (val.length < charLimit) {
            handleChange(defaultValue)
          }
        }}
        placeholder={placeholder}
        {...rest}
        trailingIcon={hasValue ? "close" : "magnify"}
        onClick={
          !hasValue
            ? null
            : () => {
                onCancel()
                setValue("")
              }
        }
      />
    </SearchWrapper>
  )
}

Search.defaultProps = {
  placeholder: "Enter search term",
  margin: "0 0 2rem",
  width: "30rem",
  handleChange: () => null,
  onCancel: () => null,
  defaultValue: "",
  charLimit: 3,
  dependencies: []
}

Search.propTypes = {
  onCancel: PropTypes.func,
  name: PropTypes.string,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  margin: PropTypes.string,
  width: PropTypes.string,
  defaultValue: PropTypes.string,
  charLimit: PropTypes.oneOf([1, 2, 3]),
  dependencies: PropTypes.array
}

export default Search
