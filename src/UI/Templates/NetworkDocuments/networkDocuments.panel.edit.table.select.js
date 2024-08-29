import React from "react"
import PropTypes from "prop-types"
import { Checkbox } from "@4cplatform/elements/Forms"

const SelectOrg = ({ orgID, selected, setSelected, isDisabled }) => {
  const isSelected = selected.includes(orgID)

  return (
    <Checkbox
      value={isSelected}
      onChange={() => {
        if (isSelected) {
          const i = selected.findIndex(item => item === orgID)
          setSelected([...selected.slice(0, i), ...selected.slice(i + 1)])
        } else {
          setSelected([...selected, orgID])
        }
      }}
      margin="0"
      isDisabled={isDisabled}
      name={`${orgID}_select`}
      label=""
    />
  )
}

SelectOrg.defaultProps = {
  isDisabled: false
}

SelectOrg.propTypes = {
  orgID: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool
}

export default SelectOrg
